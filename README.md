# 🎬 IMDB Clone

A full-stack **IMDB Clone** built with **React + TypeScript** on the frontend and **Go (Gin)** on the backend.
It allows users to browse, search, and review movies with theme support (light/dark), authentication, and responsive UI.

---

## 🚀 Tech Stack

### **Frontend**

* ⚛️ [React](https://react.dev/) with **TypeScript**
* 🎨 [TailwindCSS v3](https://tailwindcss.com/) for styling
* 🌙 Dark/Light Theme Toggle
* 🔗 [React Router](https://reactrouter.com/) for navigation
* 📦 [Axios](https://axios-http.com/) for API requests

### **Backend**

* 🐹 [Go](https://go.dev/) with [Gin](https://gin-gonic.com/) framework
* 🛡️ Middleware: CORS, Authentication
* 🗄️ Database: MongoDB
* 🔑 JWT Authentication

---

## 📸 Features

* 🔐 **Authentication**: Login, Signup with JWT-based auth
* 🎥 **Movies**: Browse, search, and view details
* 📝 **Reviews**: Users can add reviews and ratings
* 📊 **Ranking**: Movies have ranking badges (Top Rated, Trending, etc.)
* 🎨 **Theme Switcher**: Light/Dark mode with persistence
* 📱 **Responsive UI**: Works seamlessly on desktop & mobile

---

## ⚡ Project Structure

```
IMDB_Clone/
│
├── client/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Global Values
│   │   ├── hooks/        # Custom hooks (useTheme, useAuth, etc.)
│   │   ├── types/        # TypeScript types/interfaces
│   │   └── App.tsx
│   └── tailwind.config.js
│
└── server/               # Golang backend
    ├── main.go
    ├── routes/           # API routes
    ├── controllers/      # Business logic
    ├── models/           # Database models
    ├── middleware/       # Auth, CORS, Logging
    └── config/           # DB and env config
```

---

## 🛠️ Installation & Setup

### **1. Clone the repo**

```bash
git clone https://github.com/your-username/IMDB_Clone.git
cd IMDB_Clone
```

### **2. Frontend Setup (React + TS)**

```bash
cd client
npm install
npm run dev
```

Runs the frontend at 👉 `http://localhost:5173`

---

### **3. Backend Setup (Go + Gin)**

```bash
cd server
go mod tidy
go run main.go
```

Runs the backend at 👉 `http://localhost:8080`

---

## ⚙️ Environment Variables

### **Backend (.env)**

```env
PORT=8080
DB_URI=mongodb://localhost:27017/imdb_clone
JWT_SECRET=your_secret_key
ALLOWED_ORIGINS=http://localhost:5173
```

### **Frontend (.env)**

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🔥 API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/login`             | User login        |
| POST   | `/signup`            | User signup       |
| GET    | `/movies`            | Get all movies    |
| GET    | `/movies/:id`        | Get movie details |
| POST   | `/movies/:id/review` | Add review        |

---

## 📱 Mobile Testing

If you want to test on your phone:

* Make sure your phone and PC are on the **same WiFi network**
* Find your PC’s local IP (`ipconfig` or `ifconfig`)
* Run backend with:

  ```go
  ALLOWED_ORIGINS=http://<your-ip>:5173 go run main.go
  ```
* Run frontend with:

  ```bash
  VITE_API_BASE_URL=http://<your-ip>:8080 npm run dev
  ```
* Open in mobile browser 👉 `http://<your-ip>:5173`

---

<!-- ## 📌 Roadmap

* [ ] Add **search by genre, actor, director**
* [ ] Implement **user profiles**
* [ ] Add **like/dislike** system for reviews
* [ ] Deploy backend (Railway/Render) and frontend (Vercel/Netlify)

---

## 🤝 Contributing

Contributions are welcome! Fork the repo and submit a PR 🚀

---

## 📜 License

This project is licensed under the **MIT License**. -->
