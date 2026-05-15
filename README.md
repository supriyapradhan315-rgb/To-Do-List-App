# MERN Stack To-Do List App

A simple, beginner-friendly Full Stack To-Do List application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 📋 Features

- ✅ Create tasks with name and description
- 📝 View all tasks in a clean, organized list
- ✓ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 💾 Store tasks permanently in MongoDB
- 🎨 Responsive and modern UI design
- ⚡ Real-time updates with React Hooks
- 🔄 RESTful API endpoints

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library with Hooks (useState, useEffect)
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Middleware** - CORS, JSON parsing
- **Error handling** - Proper error responses

### Database
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - ODM for MongoDB
- **Schema validation** - Task schema with validation

## 📁 Project Structure

```
To-Do-List App/
│
├── backend/
│   ├── models/
│   │   └── Task.js           # MongoDB schema
│   ├── controllers/
│   │   └── taskController.js # Business logic
│   ├── routes/
│   │   └── taskRoutes.js     # API routes
│   ├── server.js             # Express server
│   ├── db.js                 # MongoDB connection
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment variables
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/       # Reusable React components
    │   │   ├── TaskForm.js
    │   │   ├── TaskList.js
    │   │   ├── TaskCard.js
    │   │   ├── Message.js
    │   │   └── *.css         # Component styles
    │   ├── pages/            # Page components
    │   │   ├── TodoList.js
    │   │   └── TodoList.css
    │   ├── App.js            # Main app component
    │   ├── App.css
    │   ├── index.js          # React entry point
    │   └── index.css
    ├── public/
    │   └── index.html        # HTML template
    ├── package.json          # Frontend dependencies
    ├── .gitignore
    └── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- VS Code (optional, but recommended)

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create MongoDB Atlas database:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster
   - Create a database connection string
   - Copy the connection string

4. **Configure environment variables:**
   - Open `.env` file
   - Replace `MONGODB_URI` with your MongoDB connection string
   - Replace `your_username` and `your_password` with your MongoDB credentials

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   - Server should run on `http://localhost:5000`
   - Test with: `http://localhost:5000/api/health`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   - Frontend should open at `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Tasks
- **Method:** GET
- **URL:** `/tasks`
- **Response:**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "...",
        "taskName": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": false,
        "createdAt": "2024-01-01T10:00:00Z"
      }
    ]
  }
  ```

#### 2. Create a Task
- **Method:** POST
- **URL:** `/tasks`
- **Body:**
  ```json
  {
    "taskName": "Buy groceries",
    "description": "Milk, eggs, bread"
  }
  ```

#### 3. Delete a Task
- **Method:** DELETE
- **URL:** `/tasks/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

#### 4. Update Task (Mark as Complete)
- **Method:** PUT
- **URL:** `/tasks/:id`
- **Body:**
  ```json
  {
    "completed": true
  }
  ```

## 🧪 Testing with Postman

1. **Download Postman** - [Download Link](https://www.postman.com/downloads/)

2. **Create a new collection** and test each endpoint:
   - GET http://localhost:5000/api/tasks
   - POST http://localhost:5000/api/tasks
   - PUT http://localhost:5000/api/tasks/:id
   - DELETE http://localhost:5000/api/tasks/:id

## 🎨 UI Features

- **Gradient Background** - Modern purple gradient
- **Responsive Design** - Mobile-friendly layout
- **Task Status** - Visual differentiation for completed tasks
- **Error Handling** - User-friendly error messages
- **Loading State** - Loading indicator while fetching data
- **Animations** - Smooth transitions and hover effects
- **Emoji Icons** - Fun and intuitive icons

## 📝 Component Documentation

### TaskForm Component
- Accepts task name and description input
- Validates form before submission
- Clears form after successful submission
- Shows error messages for invalid inputs

### TaskList Component
- Separates completed and incomplete tasks
- Displays task count for each section
- Renders TaskCard components

### TaskCard Component
- Displays individual task
- Shows task name, description, and date
- Complete/Undo button
- Delete button
- Different styling for completed tasks

### Message Component
- Shows success/error messages
- Auto-dismisses after 3 seconds
- Animated appearance

## 🐛 Common Issues & Fixes

### MongoDB Connection Error
- **Issue:** Cannot connect to MongoDB
- **Fix:** 
  1. Check your connection string in `.env`
  2. Add your IP to MongoDB Atlas whitelist
  3. Ensure credentials are correct

### CORS Error
- **Issue:** Frontend cannot reach backend
- **Fix:**
  1. Ensure backend is running on port 5000
  2. Check CORS configuration in server.js
  3. Restart both servers

### Port Already in Use
- **Issue:** Port 5000 or 3000 already in use
- **Fix:**
  1. Kill the process using that port
  2. Or change PORT in .env file

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Node.js Best Practices](https://nodejs.org/en/docs)
- [Axios Guide](https://axios-http.com)

## 🎓 Beginner Tips

1. **Code Comments** - Read comments in code for explanations
2. **Start Simple** - Modify CSS first to understand styling
3. **Use Console** - Check browser console for errors
4. **Debug** - Use console.log() to debug issues
5. **Postman** - Test API before testing frontend
6. **Small Changes** - Make one change at a time

## 📄 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo_db
PORT=5000
NODE_ENV=development
```

## 🚢 Deployment

### Backend (Heroku/Railway)
1. Create account on Heroku or Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the build folder
3. Set API URL to your backend

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Review the API endpoint documentation
3. Verify MongoDB connection
4. Check that both servers are running
5. Review code comments for clarification

## 📄 License

This project is open source and available under the ISC License.

---

**Happy Coding! 🚀**

Start with small changes, test frequently, and don't hesitate to debug!
