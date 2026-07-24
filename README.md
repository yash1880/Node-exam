![Project Screenshot](<img width="1110" height="787" alt="Screenshot 2026-07-24 202451" src="https://github.com/user-attachments/assets/44af3b03-b24b-4d24-9d15-e02d73dc5ab8" />)
![Project Screenshot](<img width="1042" height="777" alt="Screenshot 2026-07-24 202510" src="https://github.com/user-attachments/assets/3b830b41-dc5f-4ccf-a59d-b4f6d5399299" />)
![Project Screenshot](<img width="1917" height="910" alt="Screenshot 2026-07-24 202158" src="https://github.com/user-attachments/assets/bf6adbdc-eac5-45d2-bb62-2289eb8ba4e4" />)
![Project Screenshot](<img width="1905" height="911" alt="Screenshot 2026-07-24 202524" src="https://github.com/user-attachments/assets/5a601789-5d16-4ab6-a8c0-4808131c81cd" />
)
![Project Screenshot](<img width="1481" height="907" alt="Screenshot 2026-07-24 202548" src="https://github.com/user-attachments/assets/afcc2c7a-1bfd-4217-963c-3923d3c325f7" />
)
![Project Screenshot](<img width="1801" height="910" alt="Screenshot 2026-07-24 202626" src="https://github.com/user-attachments/assets/ea7baf6e-3d9c-4d31-909f-d4573d2351c9" />
)

# Recipe Kitchen 🍽️

A full-stack recipe sharing web application where users can create, browse, edit, and delete recipes. Built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating engine.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Test Accounts](#-test-accounts)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [Usage Guide](#-usage-guide)
- [Authentication & Authorization](#-authentication--authorization)
- [Database Models](#-database-models)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 📖 Overview

Recipe Kitchen is a web platform where food enthusiasts can:

- Create an account and log in securely
- Share their favorite recipes with images, ingredients, and step-by-step instructions
- Browse recipes shared by other users
- Edit or delete their own recipes
- View detailed recipe pages with full ingredient lists and instructions

The application uses **JWT (JSON Web Tokens)** for authentication and **bcryptjs** for password hashing.

---

## 👤 Test Accounts

| Email | Password | Role |
|---|---|---|
| yashbulchandani34@gmail.com | 123456789 | user |
| yashbulchandani4@gmail.com | 123456789 | user |

You can also **register a new account** from the register page.

---

## ✨ Features

### User Features
- ✅ User registration with username, email, and password
- ✅ Secure login and logout with JWT-based authentication
- ✅ Create new recipes with title, image, description, ingredients, instructions, and category
- ✅ View all recipes posted by all users
- ✅ View your own recipes in a separate "My Recipes" page
- ✅ Edit your own recipes (owner only)
- ✅ Delete your own recipes (owner only)
- ✅ View detailed recipe page with full information
- ✅ Add comments on recipes
- ✅ Responsive design works on mobile, tablet, and desktop

### Security Features
- 🔒 Passwords hashed with bcryptjs before storing
- 🔒 JWT tokens stored in HTTP-only cookies
- 🔒 Role-based access control (user/admin)
- 🔒 Owners-only protection for edit/delete operations

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Web Framework** | Express.js |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Template Engine** | EJS |
| **Frontend** | Bootstrap 5, HTML5, CSS3 |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Hashing** | bcryptjs |
| **Cookie Parsing** | cookie-parser |
| **Environment** | dotenv |

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/recipe-kitchen.git

# 2. Navigate to project directory
cd recipe-kitchen

# 3. Install all dependencies
npm install

# 4. Create a .env file in the root directory (see below)

# 5. Start the application
npm start

# 6. Open your browser
http://localhost:3000
```

### Development Mode (with auto-restart)

```bash
npm run dev
```

This uses **nodemon** to automatically restart the server when file changes are detected.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recipe-kitchen
JWT_SECRET=your_super_secret_key_here
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port number for the server | 3000 |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/recipe-kitchen` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `secretkey` (fallback) |

---

## 📁 Project Structure

```
recipe-kitchen/
│
├── app.js                          # Application entry point
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── .env                            # Environment variables (not tracked in git)
├── README.md                       # This file
│
├── config/
│   └── db.js                       # MongoDB connection
│
├── controllers/
│   ├── authController.js           # Register, login, logout logic
│   ├── recipeController.js         # Recipe CRUD logic
│   └── commentController.js        # Comment logic
│
├── middleware/
│   └── auth.js                     # JWT authentication middleware
│
├── models/
│   ├── userModel.js                # User schema
│   ├── recipeModel.js              # Recipe schema
│   └── commentModel.js             # Comment schema
│
├── routes/
│   ├── mainRoutes.js               # Home page route (/)
│   ├── authRoutes.js               # Register, login, logout routes
│   ├── recipeRoutes.js             # Recipe routes
│   └── commentRoutes.js            # Comment routes
│
├── views/
│   ├── home.ejs                    # Landing page
│   ├── login.ejs                   # Login page
│   ├── register.ejs                # Register page
│   ├── navbar.ejs                  # Navigation bar (partial)
│   ├── recipeList.ejs              # All recipes page
│   ├── myRecipes.ejs               # My recipes page
│   ├── recipeItem.ejs              # Recipe card (partial)
│   ├── recipeDetail.ejs            # Recipe detail page
│   └── recipeForm.ejs              # Add/Edit recipe form
│
└── public/
    └── css/
        └── styles.css              # Custom CSS styles
```

---

## 🛣️ Routes

### Web Routes (all routes)

| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Home page / Landing page | ❌ |
| GET | `/register` | Show registration form | ❌ |
| POST | `/register` | Register a new user account | ❌ |
| GET | `/login` | Show login form | ❌ |
| POST | `/login` | Login with email and password | ❌ |
| GET | `/logout` | Logout and clear session | ✅ |
| GET | `/recipes` | View all recipes (grid of cards) | ✅ |
| GET | `/myRecipes` | View recipes created by you | ✅ |
| GET | `/recipe/add` | Show form to create a new recipe | ✅ |
| POST | `/recipe/add` | Save a new recipe to database | ✅ |
| GET | `/recipe/:id` | View full details of a single recipe | ✅ |
| GET | `/recipe/edit/:id` | Show form to edit a recipe (owner only) | ✅ |
| POST | `/recipe/edit/:id` | Update recipe in database (owner only) | ✅ |
| GET | `/recipe/delete/:id` | Delete a recipe from database (owner only) | ✅ |
| POST | `/comment/add/:id` | Add a comment on a recipe | ✅ |

---

## 🖥️ Usage Guide

### 1. Register an Account
- Go to **http://localhost:3000/register**
- Enter a **username**, **email**, and **password** (minimum 6 characters)
- Click **Register** — you will be automatically logged in after registration

### 2. Login
- Go to **http://localhost:3000/login**
- Enter your **email** and **password**
- Click **Login**

### 3. Browse All Recipes
- Click on **All Recipes** in the navigation bar at the top
- All recipes from all users are displayed as cards in a grid layout
- Each card shows: image, title, category badge, author, description preview
- **Edit** and **Delete** buttons appear on every card (but only owner can actually use them)

### 4. View Your Own Recipes
- Click on **My Recipes** in the navigation bar
- Only recipes created by you are shown here

### 5. Create a New Recipe
- Click the **+ New Recipe** button in the navigation bar
- Fill in the form:
  - **Recipe title** (required)
  - **Image URL** (optional — paste a direct image link)
  - **Description** (required — short overview of the dish)
  - **Ingredients** (required — comma separated, e.g. `flour, sugar, eggs, milk`)
  - **Instructions** (required — comma separated steps, e.g. `Mix dry ingredients, Add wet ingredients, Bake at 350°F`)
  - **Category** (optional — e.g. `Dessert`, `Main Course`, `Appetizer`)
- Click **Save Recipe**

### 6. View Recipe Details
- Click on a recipe card image/title OR click the **View →** button
- The detail page shows:
  - Full size image
  - Title, category, and author
  - Description
  - Ingredients list (as bullet points)
  - Instructions (as numbered steps)
  - Edit/Delete buttons (if you are the owner)

### 7. Edit a Recipe
- Click the **Edit** button on your own recipe card or detail page
- Update the fields in the form
- Click **Update Recipe**
- *Note: You cannot edit recipes created by other users (Access Denied)*

### 8. Delete a Recipe
- Click the **Delete** button on your own recipe card or detail page
- A confirmation dialog will appear: **"Delete this recipe?"**
- Click **OK** to confirm deletion
- *Note: You cannot delete recipes created by other users (Access Denied)*

---

## 🔑 Authentication & Authorization

### How Authentication Works

1. User logs in with email and password
2. Server verifies the password against the hashed password in the database using bcryptjs
3. Server creates a **JWT token** containing the user's ID
4. The token is stored in an **HTTP-only cookie** named `jwt`
5. On every subsequent request, the `auth` middleware:
   - Reads the `jwt` cookie
   - Verifies the token signature using the secret key
   - Looks up the user in the database by ID
   - Attaches the full user object to `req.user`

### Ownership System

| Scenario | Behavior |
|---|---|
| You click Edit on your own recipe | ✅ Edit form opens |
| You click Edit on someone else's recipe | ❌ Shows "Access denied" |
| You click Delete on your own recipe | ✅ Recipe deleted (after confirmation) |
| You click Delete on someone else's recipe | ❌ Shows "Access denied" |
| Admin clicks Edit/Delete on any recipe | ✅ Allowed (admin has full access) |

### User Roles

| Role | Permissions |
|---|---|
| `user` (default) | Can create recipes, edit/delete only own recipes |
| `admin` | Can edit/delete any recipe in the system |

---

## 🗄️ Database Models

### User Model (`userModel.js`)

| Field | Type | Constraints |
|---|---|---|
| `username` | String | Required, unique, trimmed |
| `email` | String | Required, unique, trimmed, lowercase |
| `password` | String | Required, minimum 6 characters (hashed) |
| `role` | String | Enum: `user` or `admin`, default: `user` |
| `recipes` | [ObjectId] | References to Recipe documents |
| `comments` | [ObjectId] | References to Comment documents |

### Recipe Model (`recipeModel.js`)

| Field | Type | Constraints |
|---|---|---|
| `title` | String | Required, trimmed |
| `description` | String | Required |
| `imageUrl` | String | Default: empty string |
| `ingredients` | [String] | Required |
| `instructions` | [String] | Required |
| `category` | String | Default: `General` |
| `createdBy` | ObjectId | Reference to User |
| `comments` | [ObjectId] | References to Comment documents |

### Comment Model (`commentModel.js`)

| Field | Type | Constraints |
|---|---|---|
| `text` | String | Required |
| `userId` | ObjectId | Reference to User |
| `recipeId` | ObjectId | Reference to Recipe |

---

## ❗ Troubleshooting

### Server won't start
- Make sure **MongoDB is running** — start it with `mongod` or check your Atlas connection string
- Check the `.env` file exists and has correct values
- Run `npm install` to ensure all dependencies are installed

### "MongoDB connected successfully" not showing
- MongoDB is not running or the connection string is wrong
- For local MongoDB: run `mongod` in a separate terminal
- For MongoDB Atlas: make sure the connection string in `.env` is correct and your IP is whitelisted

### Edit/Delete buttons not showing
- Make sure you are logged in (navbar should show "Sign Out" and your username)
- Refresh the page after logging in
- The buttons are visible on all cards but will give **Access Denied** if you try to edit/delete someone else's recipe

### "Access denied" when clicking Edit or Delete
- You can only edit/delete recipes that **you created**
- If you want to modify someone else's recipe, you need an **admin** account
- Contact the admin to change your role or have them make the changes

### Port 3000 already in use
- Change the `PORT` in `.env` to another number (e.g., `PORT=3001`)
- Or kill the existing Node.js process

### Registration fails
- **Password too short**: Must be at least 6 characters
- **Email already taken**: Each email can only be used once
- **Username already taken**: Each username must be unique

### Login fails
- Check that you are entering the correct email and password
- Make sure you have registered an account first
- Passwords are case-sensitive

### Recipe not found (404)
- The recipe may have been deleted
- The ID in the URL may be incorrect

---

## 📄 License

This project is for educational purposes.

---

*Made by **Yash Bulchandani** 🚀*
