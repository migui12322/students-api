console.log("INIT DB SCRIPT STARTED");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db_path = path.join(__dirname, "students.db");

const db = new sqlite3.Database(db_path, (error) => {
  if (error) {
    console.error("Error connecting to SQLite database:", error.message);
    return;
  }
  console.log("Connected to SQLite database");
});

db.serialize(() => {

  // Create students table
  const create_table_query = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      major TEXT NOT NULL,
      semester INTEGER NOT NULL,
      gpa REAL,
      enrollment_date TEXT NOT NULL,
      is_active INTEGER DEFAULT 1
    )
  `;

  db.run(create_table_query, (error) => {
    if (error) {
      console.error("Error creating students table:", error.message);
      return;
    }
    console.log("Students table created or already exists");
  });

  // Insert sample students
  const insert_students_query = `
    INSERT OR IGNORE INTO students
    (first_name, last_name, email, major, semester, gpa, enrollment_date, is_active)
    VALUES
    ('John', 'Doe', 'john.doe@university.edu', 'Computer Science', 5, 3.8, '2022-08-15', 1),
    ('Maria', 'Lopez', 'maria.lopez@university.edu', 'Mathematics', 4, 3.6, '2023-01-10', 1),
    ('Carlos', 'Ramirez', 'carlos.ramirez@university.edu', 'Engineering', 6, 3.9, '2021-09-01', 1),
    ('Ana', 'Torres', 'ana.torres@university.edu', 'Psychology', 3, 3.5, '2023-02-20', 1),
    ('Luis', 'Fernandez', 'luis.fernandez@university.edu', 'Business Administration', 2, 3.2, '2024-01-15', 1),
    ('Sofia', 'Martinez', 'sofia.martinez@university.edu', 'Law', 7, 3.7, '2020-09-10', 1),
    ('Pedro', 'Gomez', 'pedro.gomez@university.edu', 'Computer Science', 1, 3.1, '2024-03-01', 1),
    ('Valentina', 'Rios', 'valentina.rios@university.edu', 'Architecture', 8, 3.9, '2019-08-20', 1),
    ('Diego', 'Mendoza', 'diego.mendoza@university.edu', 'Engineering', 3, 3.4, '2023-02-10', 1),
    ('Laura', 'Castillo', 'laura.castillo@university.edu', 'Economics', 5, 3.6, '2022-08-30', 1)
  `;

  db.run(insert_students_query, (error) => {
    if (error) {
      console.error("Error inserting students:", error.message);
      return;
    }
    console.log("Sample students inserted successfully");
  });

});

// Close database
db.close((error) => {
  if (error) {
    console.error("Error closing database:", error.message);
    return;
  }
  console.log("Database connection closed");
});
