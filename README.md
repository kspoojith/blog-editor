# Blog Editor App

A full-stack blog editor application built with React, Chakra UI, and Node.js/Express backend, featuring user authentication, blog creation/editing, and published/draft management.

---

## Features

### Public (Unauthenticated Users)
- View all **published blogs** on the home page.
- Click on a blog to view detailed content along with author information.
- See blog metadata such as author username, tags, and last updated timestamp.

### Authenticated Users
- Login and register to access private blog management.
- View **My Blogs** page listing both **published** and **draft** blogs authored by the logged-in user.
- Create new blog posts with title, content (rich text or markdown), and tags.
- Edit existing blogs (drafts or published).
- Publish drafts to make them publicly visible.
- User profile management (username, avatar, etc.).

---

## Tech Stack

- **Frontend:** React, React Router, Chakra UI, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JWT-based auth with secure token storage
- **Styling:** Chakra UI component library for responsive UI
- **API:** RESTful endpoints for blogs and users

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/blog-editor.git
   cd blog-editor
   
2. Install dependencies:

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

3. Create a .env file in the server directory with the following variables:
MONGODB_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=5000

4. Start development servers:
# Run backend
cd server
npm run dev

# In another terminal, run frontend
cd ../client
npm start

API Endpoints Overview
Blogs
GET /api/blogs — Fetch all published blogs

GET /api/blogs/:id — Fetch blog details by ID

POST /api/blogs — Create a new blog (auth required)

PUT /api/blogs/:id — Update blog by ID (auth required)

Users
POST /api/auth/register — Register new user

POST /api/auth/login — Login user


