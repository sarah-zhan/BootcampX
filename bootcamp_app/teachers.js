const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect(() => {
  console.log('connected');
});

const cohort_name = process.argv[2];
pool.query(`SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests
ON teachers.id = assistance_requests.teacher_id
JOIN students
ON students.id = assistance_requests.student_id
JOIN cohorts
ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;`, [cohort_name])
  .then((res) => {
    for (const row of res.rows) {
      console.log(row.cohort, row.teacher);
    }
  })
  .catch((err) => {
    console.log(err);
  });

