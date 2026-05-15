# MERN Stack Architecture & Data Flow

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React.js)                      │
│                    Port: 3000                               │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   App.js                            │  │
│  │                 (Main App)                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │               TodoList (Page)                        │  │
│  │         (State Management, API Calls)               │  │
│  └────────────────────────┬─────────────────────────────┘  │
│         ┌─────────────────┼─────────────────┐              │
│         │                 │                 │              │
│         ▼                 ▼                 ▼              │
│    ┌─────────┐    ┌─────────────┐    ┌──────────┐         │
│    │TaskForm │    │ TaskList    │    │ Message  │         │
│    │(Input)  │    │(Display)    │    │(Alerts)  │         │
│    └─────────┘    └──────┬──────┘    └──────────┘         │
│                          │                                 │
│                          ▼                                 │
│                    ┌───────────────┐                       │
│                    │  TaskCard     │                       │
│                    │(Individual)   │                       │
│                    └───────────────┘                       │
│                                                            │
│              Axios (HTTP Client)                           │
└──────────────────────────┬─────────────────────────────────┘
                           │
              HTTP Requests / JSON Responses
                           │
┌──────────────────────────▼─────────────────────────────────┐
│                 Backend (Express.js)                        │
│                    Port: 5000                              │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │                  server.js                         │   │
│  │          (Express Server + Middleware)            │   │
│  │               CORS, JSON Parser                    │   │
│  └────────────────────────┬─────────────────────────┘    │
│                           │                               │
│  ┌────────────────────────▼─────────────────────────┐    │
│  │              taskRoutes.js                       │    │
│  │         (GET, POST, PUT, DELETE)                │    │
│  └────────────────────────┬─────────────────────────┘    │
│                           │                               │
│  ┌────────────────────────▼─────────────────────────┐    │
│  │          taskController.js                       │    │
│  │     (Business Logic & Validation)               │    │
│  │  - getAllTasks()                                │    │
│  │  - createTask()                                 │    │
│  │  - updateTask()                                 │    │
│  │  - deleteTask()                                 │    │
│  └────────────────────────┬─────────────────────────┘    │
│                           │                               │
│  ┌────────────────────────▼─────────────────────────┐    │
│  │            Task Model                           │    │
│  │      (Mongoose Schema)                          │    │
│  │  - taskName (String)                            │    │
│  │  - description (String)                         │    │
│  │  - completed (Boolean)                          │    │
│  │  - createdAt (Date)                             │    │
│  └────────────────────────┬─────────────────────────┘    │
│                           │                               │
└───────────────────────────┼───────────────────────────────┘
                            │
                  MongoDB Driver (Mongoose)
                            │
┌───────────────────────────▼───────────────────────────────┐
│              MongoDB Atlas (Database)                      │
│                   Cloud Storage                           │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Database: todo_db                       │    │
│  │         Collection: tasks                       │    │
│  │                                                  │    │
│  │  Task Documents:                               │    │
│  │  {_id, taskName, description, completed,...}   │    │
│  └──────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow - Add Task Example

```
User Types Task
        │
        ▼
┌──────────────────┐
│  TaskForm.js     │
│  Submit Handler  │
└────────┬─────────┘
         │
         ▼
onAddTask() called in TodoList.js
         │
         ▼
axios.post('/api/tasks', {taskName, description})
         │
         ▼
┌──────────────────────────────┐
│  Backend: POST /api/tasks    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ taskController.createTask()  │
│ - Validate input             │
│ - Create Task object         │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Task.save() to MongoDB       │
└────────┬─────────────────────┘
         │
         ▼
MongoDB stores document
         │
         ▼
Response sent to frontend
         │
         ▼
┌──────────────────────────────┐
│ Update State in TodoList     │
│ setTasks([...tasks])         │
└────────┬─────────────────────┘
         │
         ▼
TaskList re-renders with new task
         │
         ▼
User sees new task on screen!
```

---

## 📊 Component Hierarchy

```
App
└── TodoList (Main Page)
    ├── TaskForm (Input Component)
    ├── Message (Alert Component)
    └── TaskList (Display Component)
        └── TaskCard (Repeated for each task)
```

---

## 🔌 API Endpoints Called from Frontend

```javascript
// src/pages/TodoList.js

// 1. Fetch all tasks on mount
GET /api/tasks → fetchTasks()

// 2. Add new task
POST /api/tasks → handleAddTask()

// 3. Mark task as complete
PUT /api/tasks/:id → handleCompleteTask()

// 4. Delete task
DELETE /api/tasks/:id → handleDeleteTask()
```

---

## 📦 State Management (React Hooks)

```javascript
// In TodoList.js
const [tasks, setTasks] = useState([]);           // All tasks
const [message, setMessage] = useState(null);     // Message text
const [messageType, setMessageType] = useState(''); // 'success' or 'error'
const [loading, setLoading] = useState(true);     // Loading state
```

---

## 🗄️ MongoDB Document Structure

```json
{
  "_id": ObjectId("..."),
  "taskName": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": ISODate("2024-01-01T10:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T10:00:00.000Z"),
  "__v": 0
}
```

---

## 🔄 Event Flow Diagram

```
User Action
    │
    ├─── Form Submit ──────────► TaskForm.js
    │                                │
    │                                ▼
    │                          TodoList.js
    │                          (handleAddTask)
    │                                │
    │                                ▼
    │                          Axios POST
    │                                │
    │────────────────────────────────┼─────────────────────────────
    │                                │
    │                                ▼
    │                        Express Server
    │                        (taskController)
    │                                │
    │                                ▼
    │                        Validate Data
    │                                │
    │                                ▼
    │                        Save to MongoDB
    │                                │
    │                                ▼
    │                        Response JSON
    │                                │
    │────────────────────────────────┼─────────────────────────────
    │                                │
    │                                ▼
    │                          Frontend
    │                       Update setTasks
    │                                │
    └─────────────► Re-render Components ◄─────────────┘
                         │
                         ▼
                    User sees update!
```

---

## 🧬 Component Communication

```
Parent: TodoList
│
├─► Props Down: onAddTask
│   Child: TaskForm
│
├─► Props Down: onDeleteTask, onCompleteTask
│   Child: TaskList
│   │
│   └─► Props Down: task, onDelete, onComplete
│       Child: TaskCard
│
└─► Props Down: text, type
    Child: Message
```

---

## 🚀 Request/Response Cycle

```
Frontend (React)              Backend (Express)           Database (MongoDB)
────────────────              ─────────────────           ──────────────────

User adds task
    │
    ├─ Create task object
    │
    ├─ axios.post()
    │
    ▼ ─────────────────────────►  Receive request
                                    │
                                    ├─ Parse JSON
                                    ├─ Validate
                                    ├─ Create Model
                                    │
                                    ▼ ────────────────► Save to Collection
                                                           │
                                                           ▼
                                                      Return saved doc
                                    │
                                    ◄─────────────────────
                                    │
                                    ├─ Create response
                                    │
    ◄─────────────────────────── Send JSON
    │
    ├─ Parse response
    ├─ Update state
    ├─ Re-render
    │
    ▼ User sees new task
```

---

## 💾 Data Persistence

1. **User creates task** → React component
2. **Sends to backend** → Express server
3. **Saves to database** → MongoDB
4. **Returns to frontend** → React updates
5. **Displays to user** → Component renders

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Modular components
- ✅ Easy to test
- ✅ Scalable
- ✅ Beginner-friendly
