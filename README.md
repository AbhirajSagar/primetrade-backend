# PrimeTrade Backend API

A RESTful Node.js backend API for managing tasks and user authentication. 
Built with Express.js, Mongoose, JWT Authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Tasks](#tasks)
- [Data Models](#data-models)
- [Authentication](#authentication-1)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)

## Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Task Management**: Create, read, update, and delete tasks
- **Role-Based Access**: Support for `user` and `admin` roles
- **MongoDB Integration**: Persistent data storage with MongoDB and Mongoose ORM
- **Password Security**: Bcrypt hashing for secure password storage
- **API Versioning**: v1 API version with support for future versions, sample v2 folder in repo

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Hashing**: Bcrypt
- **Environment Variables**: dotenv

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd primetrade-backend
```

2. Install dependencies
```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret_key_here
```

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

## Running the Server

Start the development server:

```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/v1
```

### Authentication

#### Register User
Creates a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Parameters**:
- `name` (string, required): User's full name
- `email` (string, required): User's email address (must be unique)
- `password` (string, required): Password (minimum 6 characters)
- `role` (string, required): User role - either `"user"` or `"admin"`

**Response** (200 OK):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "easkdjhgzbaws_zoieaw3...",
  "message": "User Created Successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Missing or invalid fields (email already exists, invalid role, password too short)

---

#### Login User
Authenticates a user and returns a JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Parameters**:
- `email` (string, required): User's email address
- `password` (string, required): User's password (minimum 6 characters)

**Response** (200 OK):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login Successful"
}
```

**Error Responses**:
- `400 Bad Request`: Missing email or password
- `401 Unauthorized`: Invalid credentials

---

### Tasks

> **Note**: All task endpoints require authentication. Include the JWT token in the `Authorization` header as a Bearer token.

**Authorization Header**:
```
Authorization: Bearer <your_jwt_token>
```

#### List All Tasks
Retrieves all tasks. Admins see all tasks; regular users see only their own tasks.

**Endpoint**: `GET /tasks`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "tasks": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the API development",
      "status": "in-progress",
      "user": "507f1f77bcf86cd799439010",
      "createdAt": "2024-02-16T10:30:00Z",
      "updatedAt": "2024-02-16T10:30:00Z"
    }
  ]
}
```

---

#### Get Task by ID
Retrieves a specific task by its ID.

**Endpoint**: `GET /tasks/:id`

**Parameters**:
- `id` (string, required, path): Task ID (MongoDB ObjectId)

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "task": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the API development",
    "status": "in-progress",
    "user": "507f1f77bcf86cd799439010",
    "createdAt": "2024-02-16T10:30:00Z",
    "updatedAt": "2024-02-16T10:30:00Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Task ID is required
- `404 Not Found`: Task not found

---

#### Create Task
Creates a new task for the authenticated user.

**Endpoint**: `POST /tasks/create`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "title": "Complete project",
  "description": "Finish the API development"
}
```

**Parameters**:
- `title` (string, required): Task title
- `description` (string, required): Task description

**Response** (200 OK):
```json
{
  "task": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the API development",
    "status": "pending",
    "user": "507f1f77bcf86cd799439010",
    "createdAt": "2024-02-16T10:30:00Z",
    "updatedAt": "2024-02-16T10:30:00Z"
  },
  "message": "Task created successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Title or description is missing

---

#### Update Task
Updates an existing task. Accepts partial updates.

**Endpoint**: `PUT /tasks/:id`

**Parameters**:
- `id` (string, required, path): Task ID (MongoDB ObjectId)

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body** (all optional, but at least one field required):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Parameters**:
- `title` (string, optional): Updated task title
- `description` (string, optional): Updated task description
- `status` (string, optional): Task status - `"pending"`, `"in-progress"`, or `"completed"`

**Response** (200 OK):
```json
{
  "task": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "user": "507f1f77bcf86cd799439010",
    "createdAt": "2024-02-16T10:30:00Z",
    "updatedAt": "2024-02-16T11:00:00Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Task ID is required or no fields provided to update
- `404 Not Found`: Task not found

---

#### Delete Task
Deletes a task by its ID.

**Endpoint**: `DELETE /tasks/:id`

**Parameters**:
- `id` (string, required, path): Task ID (MongoDB ObjectId)

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Deleted task",
    "description": "This task was deleted",
    "status": "pending",
    "user": "507f1f77bcf86cd799439010"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Task ID is required
- `404 Not Found`: Task not found

---

### Protected Routes

All `/v1/tasks` endpoints require valid authentication. The `/v1/auth` endpoints are public.

---

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid input or missing required fields
- **401 Unauthorized**: Missing or invalid authentication token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

**Error Response Format**:
```json
{
  "message": "Error description"
}
```

---

## Project Structure

```
primetrade-backend/
├── index.js                          # Application entry point
├── package.json                      # Project dependencies
├── README.md                         # This file
├── controllers/
│   ├── AuthController.js             # Authentication logic
│   └── TaskController.js             # Task CRUD operations
├── dto/
│   ├── AuthResponses.js              # Authentication response models
│   └── TaskResponses.js              # Task response models
├── lib/
│   ├── Hashing.js                    # Password hashing utilities
│   └── MongooseConnection.js         # MongoDB connection setup
├── middleware/
│   └── AuthMiddleware.js             # JWT token validation
├── models/
│   ├── User.js                       # User Mongoose schema
│   └── Task.js                       # Task Mongoose schema
├── routes/
│   └── v1/
│       ├── AuthRoutes.js             # Authentication endpoints
│       ├── TaskRoutes.js             # Task endpoints
│       └── V1Routes.js               # V1 route aggregator
└── services/
    ├── TaskService.js                # Task business logic
    └── UserService.js                # User business logic
```

---