# QUICK START GUIDE

## 🚀 5-Minute Setup

### 1️⃣ Backend Setup (Terminal 1)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Update .env with your MongoDB connection string
# Then start the server
npm run dev
```

✅ Backend ready at: http://localhost:5000

### 2️⃣ Frontend Setup (Terminal 2)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend ready at: http://localhost:3000

### 3️⃣ MongoDB Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster
4. Get connection string
5. Add to backend/.env file

## 📝 Using the App

1. **Add a Task:**
   - Enter task name (required)
   - Enter description (optional)
   - Click "Add Task"

2. **Complete a Task:**
   - Click the ✓ button on a task
   - Task will show as completed

3. **Delete a Task:**
   - Click the 🗑️ button on a task
   - Task will be removed

4. **View Tasks:**
   - Active tasks show in first section
   - Completed tasks show in second section

## 🧪 Test with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new request
3. Test endpoints:

   ```
   GET http://localhost:5000/api/tasks
   POST http://localhost:5000/api/tasks
   PUT http://localhost:5000/api/tasks/{id}
   DELETE http://localhost:5000/api/tasks/{id}
   ```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in that folder |
| Port 5000 already in use | Change PORT in backend/.env |
| MongoDB connection error | Check connection string in .env |
| CORS error | Ensure backend is running |
| No tasks showing | Check browser console for errors |

## 📂 Key Files to Edit

- **Backend Database:** `backend/models/Task.js`
- **Backend Routes:** `backend/routes/taskRoutes.js`
- **Frontend UI:** `frontend/src/components/*.js`
- **Frontend Styles:** `frontend/src/components/*.css`

## 💡 Next Steps

1. ✅ Run the app and test all features
2. 📚 Read through the code comments
3. 🎨 Customize the CSS styling
4. 🚀 Deploy to production
5. 📖 Learn more advanced features

---

Need help? Check the main README.md file for detailed documentation!
