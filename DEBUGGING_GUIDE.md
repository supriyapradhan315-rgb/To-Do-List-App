# Debugging & Troubleshooting Guide

## 🔍 Common Issues & Solutions

### Backend Issues

#### 1. "Cannot find module 'express'" or other modules
**Problem:** Missing dependencies

**Solution:**
```bash
cd backend
npm install
```

**Why:** Package dependencies are stored in package.json, not in the repository.

---

#### 2. "Port 5000 already in use"
**Problem:** Another process is using port 5000

**Solution (Windows PowerShell):**
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill the process (replace PID with actual process ID)
Stop-Process -Id 12345 -Force

# Or change port in .env
PORT=5001
```

**Solution (Mac/Linux):**
```bash
lsof -ti:5000 | xargs kill -9
```

---

#### 3. "MongoDB Connection Error"
**Problem:** Cannot connect to MongoDB Atlas

**Checklist:**
```
☐ .env file exists with MONGODB_URI
☐ Connection string is correct
☐ Added your IP to MongoDB Atlas whitelist
☐ Username and password are correct
☐ Database exists on MongoDB Atlas
☐ Internet connection is active
```

**Fix:**
1. Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Click "Network Access"
3. Click "ADD IP ADDRESS"
4. Select "Allow Access from Anywhere" (or add your IP)
5. Copy connection string and update .env

**Example Connection String:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/todo_db?retryWrites=true&w=majority
```

---

#### 4. "Cannot POST /api/tasks"
**Problem:** Backend routes not set up correctly

**Checklist:**
```
☐ server.js has: app.use('/api/tasks', taskRoutes)
☐ taskRoutes.js is in routes/ folder
☐ taskController.js is in controllers/ folder
☐ Backend is running (npm run dev)
☐ Backend is on port 5000
```

---

#### 5. "Syntax Error in server.js"
**Problem:** Code syntax error

**Solution:**
1. Open `backend/server.js`
2. Look at the error line number
3. Check for missing quotes, brackets, or commas
4. Save and restart server

---

### Frontend Issues

#### 1. "npm: command not found"
**Problem:** Node.js not installed

**Solution:**
1. Download Node.js from https://nodejs.org
2. Install it
3. Restart terminal/VS Code
4. Verify: `node --version` and `npm --version`

---

#### 2. "Cannot GET /"
**Problem:** React dev server not running

**Solution:**
```bash
cd frontend
npm install
npm start
```

**Verify:**
- Terminal shows "webpack compiled successfully"
- Browser shows app on http://localhost:3000

---

#### 3. "Proxy error: Could not proxy request"
**Problem:** Backend not running

**Solution:**
1. Open new terminal
2. Navigate to backend folder
3. Run `npm run dev`
4. Check that it says "Server is running on port 5000"

**Debugging:**
- In another terminal, test: `curl http://localhost:5000/api/health`
- Should return JSON with success message

---

#### 4. "Tasks not showing in UI"
**Problem:** Frontend not getting data from backend

**Steps to debug:**

1. **Check browser console (F12):**
   - Are there error messages?
   - Check Network tab for failed requests

2. **Check API endpoint:**
   - Open http://localhost:5000/api/tasks in browser
   - Should show: `{"success":true,"count":0,"data":[]}`

3. **Check frontend code:**
   - Is fetchTasks() being called in useEffect?
   - Does API_URL match backend address?

4. **Check backend logs:**
   - Does terminal show incoming requests?
   - Are there any error messages?

---

#### 5. "Cannot add tasks"
**Problem:** POST request failing

**Debugging:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to add a task
4. Click the POST request
5. Check Response tab for error message

**Common causes:**
- Task name is empty
- Backend validation failed
- MongoDB connection issue

---

### Database Issues

#### 1. "Cannot create task - server error"
**Problem:** Database operation failed

**Check:**
1. Is MongoDB running? (Connection string working)
2. Is database name correct?
3. Are credentials correct?
4. Check backend console for error details

---

#### 2. "Connection timeout"
**Problem:** MongoDB Atlas too slow or unreachable

**Solutions:**
1. Check internet connection
2. Check MongoDB Atlas status
3. Verify IP is whitelisted
4. Wait a few minutes and try again

---

### CORS Issues

#### 1. "Access to XMLHttpRequest blocked by CORS"
**Problem:** Frontend and backend not configured for cross-origin

**Solution (Already configured, but verify):**

In `backend/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
```

If still seeing error:
1. Restart both servers
2. Clear browser cache (Ctrl+Shift+Del)
3. Try in incognito window

---

## 🧪 Testing Checklist

### Backend Testing
```
✓ npm install works
✓ npm run dev starts without errors
✓ http://localhost:5000/api/health returns JSON
✓ http://localhost:5000/api/tasks returns {"success":true,"count":0,"data":[]}
```

### Frontend Testing
```
✓ npm install works
✓ npm start opens browser to localhost:3000
✓ Page loads without console errors
✓ Can see "My To-Do List" title
```

### Integration Testing
```
✓ Can add a task
✓ Task appears in list immediately
✓ Can mark task as complete
✓ Task moves to "Completed" section
✓ Can delete a task
✓ Task disappears from list
✓ Success message shows
```

---

## 🐞 Debugging Techniques

### 1. Console Logging
```javascript
// Add logs to understand flow
console.log('Adding task:', taskData);
console.log('Response:', response);
console.log('Tasks:', tasks);
```

### 2. Browser DevTools
- **F12** - Open developer tools
- **Console tab** - Check for JavaScript errors
- **Network tab** - See HTTP requests/responses
- **Elements tab** - Inspect HTML structure
- **Debugger tab** - Set breakpoints

### 3. Postman Testing
- Test backend API directly
- See exact responses
- Test without frontend complexity

### 4. Check File Permissions
```bash
# Make sure files are readable
ls -la backend/
ls -la frontend/
```

---

## 📋 Diagnostic Commands

### Check Node/npm Installation
```bash
node --version
npm --version
```

### Test Backend Endpoint
```bash
# GET all tasks
curl http://localhost:5000/api/tasks

# POST new task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"taskName":"Test","description":"Testing"}'
```

### Check Ports in Use
```bash
# Windows PowerShell
Get-NetTCPConnection | Where-Object {$_.State -eq "Listen"} | Select-Object LocalPort

# Mac/Linux
netstat -tuln | grep LISTEN
```

---

## 🚨 Error Messages Explained

| Error | Meaning | Fix |
|-------|---------|-----|
| `ECONNREFUSED` | Cannot connect to server | Start backend server |
| `404 Not Found` | Route doesn't exist | Check endpoint URL |
| `500 Internal Server Error` | Backend error | Check server logs |
| `Cannot find module` | Missing npm package | Run npm install |
| `Port already in use` | Process using port | Kill process or change port |
| `Connection timeout` | Database too slow | Check MongoDB Atlas |

---

## 📞 Getting Help

### Step 1: Identify the Issue
- Is it frontend or backend?
- When did it start happening?
- What did I change?

### Step 2: Check Logs
- **Browser console** (F12)
- **Terminal output**
- **.env file** (connections, ports)

### Step 3: Test Components
- Test backend alone (Postman)
- Test frontend alone (without backend)
- Test database (connection string)

### Step 4: Review Code
- Are all imports correct?
- Are all files in right folders?
- Are port numbers correct?

### Step 5: Restart Everything
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 💡 Pro Tips

1. **Always check the console**
   - Browser: F12 → Console tab
   - Terminal: Look at output messages

2. **Test incrementally**
   - Add one task
   - Mark it complete
   - Delete it
   - Each step separately

3. **Keep terminal visible**
   - See error messages immediately
   - Don't scroll up, messages go away

4. **Read error messages carefully**
   - They usually tell you the problem
   - Line numbers help locate issues

5. **Restart servers after changes**
   - Stop: Ctrl+C
   - Start: npm run dev or npm start

6. **Clear cache if confused**
   - Browser cache: Ctrl+Shift+Del
   - npm cache: npm cache clean --force
   - Use incognito window to test

---

## 🔗 Useful Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Axios Guide](https://axios-http.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy Debugging! 🐛🔍**

Remember: Errors are your friends! They tell you what's wrong. Read them carefully! 💪
