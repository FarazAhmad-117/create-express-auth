# **Auth System Starter with Passport.js, JWT, Role-Based Access, and Social Logins**

Welcome to the **Auth System Starter**—an open-source, feature-rich authentication boilerplate built with **Node.js**, **Express.js**, and **MongoDB**. This project supports multiple authentication methods (including manual signup/login with JWT and social logins using Passport.js), role-based access control, email verification, and more.

This repository is a perfect starting point for developers looking to implement authentication in their applications quickly. Feel free to contribute, fine-tune, and customize as per your needs!

---

## **Features**

- 🌐 **Authentication Options**:
  - Manual login/signup with JWT.
  - Social logins with Google, Facebook, GitHub, and Apple ID.
- 🛡 **Role-Based Access Control (RBAC)**:
  - Create and manage custom roles.
  - Assign multiple roles to users.
- 📧 **Email Verification**:
  - Secure email verification using NodeMailer.
- 🔐 **Secure Password Storage**:
  - Hashing with `bcrypt`.
- 🛠 **Modular Project Structure**:
  - Controllers for business logic, helpers for utilities.
- 📖 **Swagger Documentation**:
  - API routes fully documented for easy integration.
- 🚀 **Scalable and Open Source**:
  - Designed for extensibility and contributions from the community.

---

## **Project Structure**

Here’s an organized project structure to help you navigate the codebase:

```
📂 auth-system-starter
├── 📁 config
│   └── db.js                   # MongoDB connection setup
│   └── passport.js             # Passport strategies configuration
├── 📁 controllers
│   └── authController.js       # Handles authentication logic
│   └── userController.js       # Manages user-related actions
├── 📁 helpers
│   └── sendEmail.js            # Email utility for sending emails
├── 📁 middlewares
│   └── authMiddleware.js       # Middleware for role-based access and JWT validation
├── 📁 models
│   └── User.js                 # Mongoose schema for User
│   └── Role.js                 # Mongoose schema for Role
├── 📁 routes
│   └── authRoutes.js           # Routes for authentication and authorization
│   └── userRoutes.js           # Routes for user management
├── 📁 utils
│   └── swagger.js              # Swagger setup for API documentation
├── .env.example                        # Environment variables
├── README.md                   # Project documentation
├── package.json                # Project dependencies and scripts
└── index.js                   # Entry point of the application
```

---

## **Getting Started**

Follow these steps to get this project up and running:

### 1. **Clone the Repository**

```bash
git clone https://github.com/FarazAhmad-117/auth-system-starter.git
cd auth-system-starter
```

### 2. **Install Dependencies**

Install using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. **Set Environment Variables**

Create a `.env` file in the project root and add the following:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret
CLIENT_URL=http://localhost:3000 # Replace with your frontend URL
```

### 4. **Start the Server**

```bash
npm start
# or
yarn start
# or
pnpm start
```

The server will start on `http://localhost:5000`.

---

## **Swagger API Documentation**

The API documentation is available at:

```
http://localhost:5000/api-docs
```

Swagger is pre-configured to provide an interactive interface for testing and understanding the API endpoints.

---

## **Contributing**

We welcome contributions to improve this project! Here’s how you can help:

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## **Publishing as an NPM, PNPM, or Yarn Package**

To make this project available to the public as a package:

### 1. **Prepare for Publishing**

- Ensure `package.json` has the relevant metadata:
  ```json
  {
    "name": "auth-system-starter",
    "version": "1.0.0",
    "description": "A starter project for authentication with Passport.js, JWT, and role-based access control.",
    "main": "server.js",
    "keywords": ["authentication", "passport.js", "jwt", "nodejs", "express"],
    "author": "Faraz Ahmad <farazahmad31048@gmail.com>",
    "license": "MIT"
  }
  ```

### 2. **Login to NPM**

```bash
npm login
```

### 3. **Publish the Package**

```bash
npm publish
```

For PNPM and Yarn, follow their respective guidelines for publishing. The process is similar to NPM.

---

## **License**

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.

---

## **Community**

- 🌟 Star this repository to show your support.
- 💬 Join discussions and share your ideas or issues.
- 🛠 Contribute to make it even better.

Let’s build amazing applications together! 🚀
