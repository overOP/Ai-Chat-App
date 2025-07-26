import React, { useState, useEffect, useRef } from "react";
import { FaRegCheckCircle, FaCircleNotch } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [aiReady, setAiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (
        window.puter &&
        window.puter.ai &&
        typeof window.puter.ai.chat === "function"
      ) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessages = (msg, isUser) => {
    setMessages((prev) => [
      ...prev,
      {
        content: msg,
        isUser,
        id: Date.now() + Math.random(),
      },
    ]);
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;
    if (!aiReady) {
      addMessages("AI service is still loading. Please wait...", false);
      return;
    }
    addMessages(message, true);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await window.puter.ai.chat(message);
      const reply =
        typeof response === "string"
          ? response
          : response.message?.content || "No response from AI";
      addMessages(reply, false);
    } catch (err) {
      addMessages(`Error: ${err.message || "Something went wrong"}`, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-slate-950 to-emerald-900 flex flex-col items-center justify-center p-4 gap-8">
      <h1 className="text-5xl sm:text-6xl font-light bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-center">
        AI Chat App
      </h1>

      <div
        className={`px-4 py-2 flex items-center gap-2 rounded-full text-sm ${
          aiReady
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
        }`}
      >
        {aiReady ? (
          <>
            <FaRegCheckCircle /> AI service is ready
          </>
        ) : (
          <>
            <FaCircleNotch className="animate-spin" />
            Loading AI service...
          </>
        )}
      </div>

      <div className="w-full max-w-3xl bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border border-gray-600 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4">
        <div className="h-80 overflow-auto border-r border-gray-600 mb-4 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-2xl">
          {messages.length === 0 && (
            <p className="flex items-center justify-center gap-2 text-gray-400 mt-20 text-center">
              <MdWavingHand className="animate-bounce text-amber-200 text-2xl" /> Start
              the conversation by typing a message below..
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 m-2 rounded-2xl max-w-xs sm:max-w-sm break-words ${
                msg.isUser
                  ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white ml-auto text-right"
                  : "bg-gradient-to-r from-emerald-600 to-indigo-600 text-white"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="p-3 m-2 rounded-2xl max-w-xs bg-gradient-to-r from-emerald-600 to-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={aiReady ? "Type a message..." : "Please wait..."}
            disabled={!aiReady || isLoading}
            className="flex-1 px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:shadow-xl transition duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={!aiReady || isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 text-white hover:opacity-80 font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Thinking...
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
