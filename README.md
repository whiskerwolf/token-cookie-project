
It includes everything you need — setup instructions, endpoints, screenshots section placeholders, authentication flow explanation, and test credentials.
I’ve left out the Render/Railway deployment link (you’ll fill that in later).

---

````markdown
# 🧠 Token & Cookie Authentication — Task Management System

A complete Node.js project demonstrating **JWT Token Authentication** and **Secure Cookie Management** using Express.js.  
This system simulates a simple **Task Management Application** where users can register, log in, manage their tasks, and where **admin users** have special privileges.

---

## 📖 Project Description

This project showcases how to:
- Securely authenticate users using **JWT tokens** stored in **HTTP-only cookies**.
- Protect routes using authentication middleware.
- Restrict access using **role-based authorization** (Admin vs User).
- Manage user-specific tasks with in-memory storage (no database needed).
- Demonstrate full login → access → logout flow with token validation.

---

## ⚙️ Setup Instructions

### 🧩 1. Clone the project

```bash
git clone <your-repo-link>
cd token-cookie-project
````

### 🧩 2. Install dependencies

```bash
npm install
```

### 🧩 3. Create a `.env` file

```bash
JWT_SECRET=supersecretkey
PORT=5000
```

### 🧩 4. Run the server

```bash
node server.js
```

Or, if you added a dev script:

```bash
npm run dev
```

✅ Server runs at:
`http://localhost:5000`

---

## 👥 Pre-Seeded Test Users

| Role        | Email            | Password      |
| ----------- | ---------------- | ------------- |
| 🧑‍💼 Admin | `admin@test.com` | `password123` |
| 👤 User     | `user@test.com`  | `password123` |

---

## 🌐 API Endpoints Table

### 🔐 **Authentication Routes**

| Method | Endpoint    | Description                                 |
| ------ | ----------- | ------------------------------------------- |
| `POST` | `/register` | Register a new user (password hashed)       |
| `POST` | `/login`    | Log in user and set JWT in secure cookie    |
| `POST` | `/logout`   | Log out and clear the authentication cookie |

---

### 👤 **User Routes (Protected)**

| Method | Endpoint   | Description                                         |
| ------ | ---------- | --------------------------------------------------- |
| `GET`  | `/profile` | Get logged-in user’s profile (requires valid token) |

---

### ✅ **Task Routes (User-Specific, Protected)**

| Method   | Endpoint     | Description                           |
| -------- | ------------ | ------------------------------------- |
| `GET`    | `/tasks`     | Get all tasks of the logged-in user   |
| `POST`   | `/tasks`     | Add a new task for the logged-in user |
| `DELETE` | `/tasks/:id` | Delete a user’s own task              |

---

### 👑 **Admin Routes (Protected + Role-Based)**

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| `GET`  | `/admin/users` | View all registered users (Admin only) |
| `GET`  | `/admin/tasks` | View all tasks (Admin only)            |

---

## 🔐 Authentication Flow Diagram

```plaintext
[User Registers/Login] 
          ↓
[Server verifies credentials & creates JWT]
          ↓
[JWT stored inside HTTP-only Cookie]
          ↓
[Client makes requests → Cookie auto-sent with every request]
          ↓
[Auth Middleware extracts & verifies JWT from Cookie]
          ↓
✅ Access granted if valid token
❌ 401/403 if token missing or invalid
```

---

## 🧱 Middleware Logic

### 🔸 `authMiddleware`

* Extracts token from cookies.
* Verifies JWT using `jsonwebtoken`.
* Attaches decoded user data (`id`, `role`) to `req.user`.

### 🔸 `adminOnly`

* Checks if `req.user.role` is `"admin"`.
* Returns 403 if not authorized.

---

## 🧾 Screenshots (for Submission)

Add your screenshots below to document each step of the authentication flow:

| Step | Screenshot               | Description                      |
| ---- | ------------------------ | -------------------------------- |
| 1    | ✅ `/register`            | User registration success        |
| 2    | ✅ `/login`               | JWT cookie created after login   |
| 3    | ✅ `/profile`             | Access profile via cookie        |
| 4    | ✅ `/tasks`               | Get logged-in user’s tasks       |
| 5    | ✅ `/tasks` (POST)        | Add a new task                   |
| 6    | ✅ `/tasks/:id` (DELETE)  | Delete a task                    |
| 7    | ✅ `/admin/users` (Admin) | Admin-only access success        |
| 8    | 🚫 `/admin/users` (User) | Forbidden access for normal user |
| 9    | 🚪 `/logout`             | Cookie cleared successfully      |
| 10   | 🧾 `/profile` (No login) | 401 Unauthorized – token missing |

---

## 🧠 Key Learning Points

* JWT token generation and validation
* Secure cookie storage using `httpOnly`
* Authentication middleware to protect routes
* Role-based access control (Admin/User)
* In-memory data management (no DB required)
* Clean logout by clearing cookies

---

## 🧑‍💻 Technologies Used

* **Node.js** – Backend runtime
* **Express.js** – Server framework
* **jsonwebtoken** – For JWT creation & validation
* **bcryptjs** – For password hashing
* **cookie-parser** – For reading cookies from requests
* **dotenv** – For environment configuration

---

## 📦 Folder Structure

```
token-cookie-project/
│
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── /screenshots           # Folder for screenshots
└── README.md              # Project documentation
```

---

## 📜 Sample Responses

### 🧍 Register

```json
{
  "message": "User registered successfully",
  "newUser": {
    "id": 3,
    "email": "newuser@test.com",
    "role": "user"
  }
}
```

### 🔑 Login

```json
{
  "message": "Login successful",
  "user": {
    "id": 2,
    "email": "user@test.com",
    "role": "user"
  }
}
```

### 👤 Profile

```json
{
  "user": {
    "id": 2,
    "email": "user@test.com",
    "firstName": "User",
    "role": "user"
  }
}
```

---

## 🧩 How to Test

1. Register a new user.
2. Login — check Cookies tab for the token.
3. Access `/profile` → should work.
4. Logout → token disappears from Cookies.
5. Try `/profile` again → should fail (`No token provided`).

---

## 🌍 Deployment Link

*(Add your Render or Railway link here)*
Example:


---

## 🏁 Conclusion

This project demonstrates a complete **end-to-end authentication system** using JWT tokens stored in secure cookies.
It proves understanding of **login, session maintenance, logout, and role-based authorization** — key skills for secure backend development.

---

### 👨‍💻 Author

**Rithwik Nalla**
Project: *Token & Cookie Authentication — Task Management API*

```

---

Would you like me to add a **small authentication flow diagram image (visual)** version instead of the ASCII one — so it looks professional in your README (GitHub renders it nicely)?
```
