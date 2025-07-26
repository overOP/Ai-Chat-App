# 🧠 AI Chat App

A sleek, responsive AI-powered chat interface built with **React**, **Tailwind CSS**, and an external AI service provided via `window.puter.ai.chat`.

![AI Chat App Screenshot](./screenshot.png)

## 🚀 Features

- ⚡ **Live AI integration** using `window.puter.ai.chat`
- 💬 **Dynamic message feed** with typing indicator
- 🖌️ **Beautiful UI** powered by Tailwind CSS with gradient themes
- 📱 **Fully responsive** — works great on mobile and desktop
- ⏳ **AI readiness check** before sending messages
- 🎨 Subtle animations and accessibility-friendly input behaviors

---

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-chat-app.git
   cd ai-chat-app
Install dependencies

npm install
Start the development server


npm run dev
🧩 Make sure the global window.puter.ai.chat API is available in your environment.

🧩 How It Works
The app continuously polls for the existence of window.puter.ai.chat, a function expected to return AI responses. Once available, users can send messages and receive live replies.

js
const response = await window.puter.ai.chat(userMessage);
📁 File Structure
php
Copy
Edit
src/
├── App.jsx        # Main chat interface
├── index.js       # Entry point
├── styles.css     # Tailwind base styles (if any)
public/
├── index.html
├── screenshot.png # (optional) for preview
📸 UI Preview

✨ Future Enhancements
🔊 Voice input

📎 File uploads

🌙 Light/Dark mode toggle

📜 Message history persistence

🧑‍💻 Author
Made with ❤️ by Pradeep Chaudhary 

📄 License
MIT 


---

### ✅ Tips:

- **Place a screenshot** of the app in the root directory as `screenshot.png` to enable image previews.
- Update `https://github.com/your-username/ai-chat-app.git` and author info with your actual GitHub repo and name.
- Add a `LICENSE` file (MIT recommended unless otherwise needed).

Would you like me to generate a `LICENSE` or help you deploy it (e.g., Vercel or Netlify)?
