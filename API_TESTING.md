# API Testing Guide

## Using Postman

### 1. GET all tasks
```
Method: GET
URL: http://localhost:5000/api/tasks
```

**Expected Response:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

---

### 2. CREATE a new task
```
Method: POST
URL: http://localhost:5000/api/tasks
Content-Type: application/json
```

**Request Body:**
```json
{
  "taskName": "Buy groceries",
  "description": "Milk, eggs, bread, butter"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "taskName": "Buy groceries",
    "description": "Milk, eggs, bread, butter",
    "completed": false,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

---

### 3. UPDATE task (mark as complete)
```
Method: PUT
URL: http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
Content-Type: application/json
```

**Request Body:**
```json
{
  "completed": true
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "taskName": "Buy groceries",
    "description": "Milk, eggs, bread, butter",
    "completed": true,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:01:00.000Z"
  }
}
```

---

### 4. DELETE a task
```
Method: DELETE
URL: http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "taskName": "Buy groceries",
    "description": "Milk, eggs, bread, butter",
    "completed": false,
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
}
```

---

### 5. ERROR RESPONSES

**Missing required field:**
```
Method: POST
URL: http://localhost:5000/api/tasks
Body: { "description": "Only description" }
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Task name is required"
}
```

**Task not found:**
```
Method: DELETE
URL: http://localhost:5000/api/tasks/invalid_id
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## Tips for Postman

1. **Save Requests:** Create a collection and save these requests
2. **Use Variables:** Create variables for `base_url` and `task_id`
3. **Test Headers:** Make sure `Content-Type: application/json` is set
4. **Check Status:** Look for 200/201 for success, 400/404/500 for errors
5. **Export Collection:** Share collection with team

## cURL Commands (Alternative)

### GET all tasks
```bash
curl -X GET http://localhost:5000/api/tasks
```

### CREATE a task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"taskName":"Buy groceries","description":"Milk and eggs"}'
```

### UPDATE a task
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### DELETE a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

---

Happy Testing! 🚀
