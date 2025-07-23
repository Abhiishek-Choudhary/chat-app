# 💬 Real-Time Chat App

This is a **real-time chat application** built during my third year of college using the **MERN stack** and **Socket.IO**.  
It allows users to register, log in, and chat instantly with other users in real-time.

---

## 🔗 Live Demo

👉 [View Live App](https://chat-app-ten-alpha-25.vercel.app/)

> ⚠️ **Note:** If the live link doesn't work, please visit the GitHub repo below.  
> If it still doesn't work there, it's likely because the **MongoDB Atlas cluster is paused** (free tier limitation). Just unpause or connect your own MongoDB cluster to try it locally.

---

## 🧠 Tech Stack

### Frontend
- ⚛️ React.js
- 🔄 Socket.IO Client
- 🌐 Axios for API requests
- 🧼 CSS / Tailwind / Styled Components (whichever applies)

### Backend
- 🟢 Node.js
- 🛠️ Express.js
- 🗃️ MongoDB Atlas
- 🔐 JWT for Authentication
- 🔌 Socket.IO (WebSockets)

---

## ✨ Features

- 🔐 User Authentication (Register / Login)
- 📩 Real-time bi-directional messaging
- 🧑‍🤝‍🧑 Online user status
- 🕓 Timestamps & message history
- 🧼 Clean UI with responsive design
- 🔐 Secure backend with protected routes and token validation

---

## 📸 Screenshots

![Login Page](./screenshots/login.png)
![Chat Interface](./screenshots/chat.png)

> 📁 _You can add these screenshots in a `screenshots/` folder_

---

## 🧪 Try It Locally

### 1. Clone both client and server
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
### 2. Install Dependencies
cd server
npm install

### 3. Run the backend
bash
npm run dev

### 4. Install client dependencies
bash
cd ../client
npm install

### 5. Run the frontend
bash
npm run dev
Visit http://localhost:5173

📂 Folder Structure (Simplified)
chat-app/
├── client/         # React frontend
│   ├── src/
│   └── public/
├── server/         # Node/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── socket/

🧑‍💻 GitHub Repositories
🔗 https://github.com/Abhiishek-Choudhary/chat-app/client
🔗 https://github.com/Abhiishek-Choudhary/chat-app/server
🔗 https://github.com/Abhiishek-Choudhary/chat-app/socket

❗ Note
⚠️ MongoDB Cluster Paused:
Since this was hosted using a free-tier MongoDB Atlas cluster, it may go into paused state due to inactivity.
If you face any issues:

1. Clone the repo.

2. Replace the Mongo URI with your own in the .env file.

3. Run locally (instructions above).

📬 Contact
📧 Email: akc64016@gmail.com

🐙 GitHub: @Abhiishek-Choudhary

🔗 LinkedIn: https://www.linkedin.com/in/abhishek-chaudhary-2b276324b/


---

Let me know if you want this tailored with:
- Your actual **Chat App**
- Real **(https://chat-app-ten-alpha-25.vercel.app/)** to live app / GitHub repos
- These additional libraries are used **Tailwind, MUI, plain CSS**.
- It doesn't supports group chats or DMs

I’ll refine it further!



