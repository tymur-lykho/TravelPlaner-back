# ✈️ TravelPlaner — Backend

A RESTful backend API for the **TravelPlaner** application — a service that helps users plan, organize, and manage their trips. Built with **Node.js** and powered by **Google OAuth** for authentication.

---

## 🚀 Tech Stack

- **Runtime:** Node.js (JavaScript)
- **Authentication:** Google OAuth 2.0
- **Code Quality:** ESLint, Prettier

---

## 📁 Project Structure

```
TravelPlaner-back/
├── src/                  # Application source code
│   ├── controllers/      # Route controllers
│   ├── routes/           # API route definitions
│   ├── models/           # Data models
│   ├── middlewares/      # Express middlewares
│   └── services/         # Business logic
├── google-oauth.json     # Google OAuth credentials config
├── .env.example          # Environment variable template
├── .prettierrc           # Prettier configuration
├── eslint.config.mjs     # ESLint configuration
├── .editorconfig         # Editor configuration
└── package.json          # Project dependencies and scripts
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn
- A Google Cloud project with OAuth 2.0 credentials

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/tymur-lykho/TravelPlaner-back.git
cd TravelPlaner-back
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

4. **Configure Google OAuth**

Place your Google OAuth 2.0 credentials in `google-oauth.json` (or configure them via environment variables as described in `.env.example`).

5. **Run the development server**

```bash
npm run dev
```

The API will be available at `http://localhost:3000` (or the port defined in your `.env`).

---

## 📜 Available Scripts

| Script         | Description                                            |
| -------------- | ------------------------------------------------------ |
| `npm run dev`  | Start the server in development mode (with hot reload) |
| `npm start`    | Start the server in production mode                    |
| `npm run lint` | Run ESLint to check code quality                       |

---

## 🔐 Environment Variables

Refer to `.env.example` for all required variables. Key configuration includes:

| Variable               | Description                        |
| ---------------------- | ---------------------------------- |
| `PORT`                 | Port the server listens on         |
| `DATABASE_URL`         | Connection string for the database |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID             |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret         |

---

# 📡 API Routes Reference

## 🔐 Auth — `/api/auth`

| Method | Endpoint              | Auth Required | Description                                     |
| ------ | --------------------- | :-----------: | ----------------------------------------------- |
| `POST` | `/auth/register`      |      ❌       | Register a new user account                     |
| `POST` | `/auth/login`         |      ❌       | Log in with email and password                  |
| `POST` | `/auth/refresh`       |      ❌       | Refresh the user session using a refresh token  |
| `POST` | `/auth/logout`        |      ✅       | Log out and invalidate the current session      |
| `GET`  | `/auth/get-oauth-url` |      ❌       | Get Google OAuth authorization URL              |
| `POST` | `/auth/confirm-oauth` |      ❌       | Confirm Google OAuth login and create a session |

---

## 📍 Points — `/api/points`

| Method   | Endpoint      | Auth Required | Description                                      |
| -------- | ------------- | :-----------: | ------------------------------------------------ |
| `GET`    | `/points`     |      ❌       | Get all travel points                            |
| `GET`    | `/points/my`  |      ✅       | Get all points created by the authenticated user |
| `POST`   | `/points`     |      ✅       | Create a new travel point                        |
| `PATCH`  | `/points/:id` |      ✅       | Update an existing point by ID                   |
| `DELETE` | `/points/:id` |      ✅       | Delete a point by ID                             |

---

## ⭐ Favorites — `/api/favorites`

| Method   | Endpoint         | Auth Required | Description                               |
| -------- | ---------------- | :-----------: | ----------------------------------------- |
| `GET`    | `/favorites`     |      ✅       | Get the user's favorite points            |
| `POST`   | `/favorites/:id` |      ✅       | Add a point to favorites by point ID      |
| `DELETE` | `/favorites/:id` |      ✅       | Remove a point from favorites by point ID |

---

## 🗺️ Routes — `/api/route`

| Method | Endpoint | Auth Required | Description                             |
| ------ | -------- | :-----------: | --------------------------------------- |
| `POST` | `/route` |      ✅       | Create a new route from a set of points |

---

## 🖼️ Photos — `/api/photos` & `/api/points/:id/photos`

| Method   | Endpoint             | Auth Required | Description                                         |
| -------- | -------------------- | :-----------: | --------------------------------------------------- |
| `GET`    | `/photos`            |      ❌       | Get all photos                                      |
| `POST`   | `/photos`            |      ✅       | Upload photos (up to 10 files, multipart/form-data) |
| `DELETE` | `/photos`            |      ✅       | Delete photos by target                             |
| `POST`   | `/points/:id/photos` |      ✅       | Upload photos linked to a specific point            |
| `GET`    | `/points/:id/photos` |      ❌       | Get all photos for a specific point                 |
| `DELETE` | `/points/:id/photos` |      ✅       | Delete photos for a specific point                  |

---

## 👤 Users — `/api/users`

| Method  | Endpoint           | Auth Required | Description                                       |
| ------- | ------------------ | :-----------: | ------------------------------------------------- |
| `GET`   | `/users`           |      ❌       | Get a list of all users                           |
| `GET`   | `/users/me`        |      ✅       | Get the currently authenticated user's profile    |
| `PATCH` | `/users/me`        |      ✅       | Update the currently authenticated user's profile |
| `PATCH` | `/users/me/avatar` |      ✅       | Update the user's avatar (multipart/form-data)    |
| `GET`   | `/users/:id`       |      ❌       | Get a specific user's profile by ID               |

> ⚠️ Actual endpoints may differ — refer to the source code in `src/routes/` for the full and up-to-date API reference.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code passes linting (`npm run lint`) before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related

- [TravelPlaner Frontend](#) _(link to the frontend repo if available)_
