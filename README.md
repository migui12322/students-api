# Students API

RESTful API for managing students using **Node.js**, **Express**, and **SQLite**.

---

## Installation Instructions

### Requirements

* Node.js v18 or higher
* npm

### Steps

1. Clone the repository:

```bash
git clone https://github.com/migui12322/students-api.git
cd students-api
```

2. Install dependencies:

```bash
npm install
```

3. Initialize the database with test data:

```bash
node init-db.js
```

This will create the SQLite database (`students.db`) and insert 10 sample student records.

---

## How to Run the Project

Start the server with:

```bash
node app.js
```

If everything is correct, you should see:

```
Connected to SQLite database
Server running on http://localhost:3000
```

---

## API Endpoints Usage Examples

### Create a Student

**POST** `/api/students`

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@university.edu",
  "major": "Computer Science",
  "semester": 5,
  "gpa": 3.8,
  "enrollment_date": "2022-08-15"
}
```

### Get All Students

**GET** `/api/students`

Optional query parameters:

* `major`
* `semester`
* `is_active`

Example:

```
GET /api/students?major=Computer Science
```

### Get Student by ID

**GET** `/api/students/:id`

Example:

```
GET /api/students/1
```

### Update a Student (Full Update)

**PUT** `/api/students/:id`

### Partial Update

**PATCH** `/api/students/:id`

```json
{
  "gpa": 3.9,
  "semester": 6
}
```

### Delete Student (Soft Delete)

**DELETE** `/api/students/:id`

This operation deactivates the student instead of removing the record.

---

## Use of Artificial Intelligence

Artificial Intelligence tools were used to:

* Assist in designing the REST API structure
* Generate example code for controllers and routes
* Improve validation logic and error handling
* Draft and refine technical documentation

All AI-generated content was reviewed, adapted, and tested by the developer to ensure correctness and learning purposes.

---

## Coding Standards Used

* RESTful API design principles
* MVC-like project structure (routes, controllers, database)
* Meaningful variable and function names
* Consistent use of HTTP status codes
* Parameterized SQL queries to prevent SQL injection
* Clear separation of concerns

---

## Technologies Used

* Node.js
* Express.js
* SQLite
* npm

---

## Author

Luis Teran Migui12322
Andres Carrillo
