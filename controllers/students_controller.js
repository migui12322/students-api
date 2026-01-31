const db = require("../database/database");

/* GET /api/students */
exports.get_all_students = (req, res) => {
  const { major, semester, is_active } = req.query;

  let query = "SELECT * FROM students WHERE 1=1";
  const params = [];

  if (major) {
    query += " AND major = ?";
    params.push(major);
  }

  if (semester) {
    query += " AND semester = ?";
    params.push(semester);
  }

  if (is_active !== undefined) {
    query += " AND is_active = ?";
    params.push(is_active === "true" ? 1 : 0);
  }

  db.all(query, params, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(rows);
  });
};

/* GET /api/students/:id */
exports.get_student_by_id = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (error, row) => {
      if (!row) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(row);
    }
  );
};

/* POST /api/students */
exports.create_student = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    major,
    semester,
    gpa,
    enrollment_date
  } = req.body;

  /* 1️⃣ Required fields */
  if (!first_name || !last_name || !email || !major || !enrollment_date) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  /* 2️⃣ Valid email */
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format"
    });
  }

  /* 3️⃣ GPA between 0.0 and 4.0 */
  if (gpa !== undefined && (gpa < 0 || gpa > 4)) {
    return res.status(400).json({
      error: "GPA must be between 0.0 and 4.0"
    });
  }

  /* 4️⃣ Semester between 1 and 12 */
  if (semester !== undefined && (!Number.isInteger(semester) || semester < 1 || semester > 12)) {
    return res.status(400).json({
      error: "Semester must be between 1 and 12"
    });
  }

  const query = `
    INSERT INTO students 
    (first_name, last_name, email, major, semester, gpa, enrollment_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [first_name, last_name, email, major, semester, gpa, enrollment_date],
    function (error) {
      /* 5️⃣ Duplicate email */
      if (error && error.message.includes("UNIQUE")) {
        return res.status(409).json({
          error: "Email already exists"
        });
      }

      if (error) {
        return res.status(500).json({
          error: error.message
        });
      }

      res.status(201).json({
        id: this.lastID,
        first_name,
        last_name,
        email,
        major,
        semester,
        gpa,
        enrollment_date,
        is_active: 1
      });
    }
  );
};

/* PUT /api/students/:id */
exports.update_student = (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    major,
    semester,
    gpa,
    enrollment_date,
    is_active
  } = req.body;

  const query = `
    UPDATE students SET
      first_name = ?,
      last_name = ?,
      email = ?,
      major = ?,
      semester = ?,
      gpa = ?,
      enrollment_date = ?,
      is_active = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [
      first_name,
      last_name,
      email,
      major,
      semester,
      gpa,
      enrollment_date,
      is_active,
      id
    ],
    function (error) {
      if (this.changes === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student updated successfully" });
    }
  );
};

/* PATCH /api/students/:id */
exports.partial_update_student = (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const set_clause = fields.map(field => `${field} = ?`).join(", ");
  const query = `UPDATE students SET ${set_clause} WHERE id = ?`;

  db.run(query, [...values, id], function () {
    if (this.changes === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated partially" });
  });
};

/* DELETE /api/students/:id (soft delete) */
exports.delete_student = (req, res) => {
  const { id } = req.params;

  db.run(
    "UPDATE students SET is_active = 0 WHERE id = ?",
    [id],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deactivated successfully" });
    }
  );
};