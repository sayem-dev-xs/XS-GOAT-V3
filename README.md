# 🐐 GoatBot - Full Messenger Chat System

![GoatBot Demo](https://i.ibb.co/YT4sC31C/image0.jpg)  

GoatBot is a **complete chat system** for Messenger with MongoDB integration, Simsimi fallback, and teach/remove commands. Built with **Node.js, Express, and MongoDB**.

---

## Features

- ✅ Chat with GoatBot
- ✅ Using to easy
- ✅ Your owner risk
- ✅ MongoDB backend for persistent storage
- ✅ Fallback to Simsimi API if question not found
- ✅ Normalized input to avoid duplicates
- ✅ Easy to deploy

---

## Installation

```bash
# Clone repo
git clone https://github.com/yourusername/goatbot.git
cd goatbot

# Install dependencies
npm install

# Add .env
echo "PORT=3000" >> .env
echo "MONGO_URI=your_mongodb_connection_url_here" >> .env

# Start server
npm start
# or for dev with auto reload
npm run dev
