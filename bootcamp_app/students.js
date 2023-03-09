const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();

const cohortName = process.argv[2];
const number = process.argv[3];

pool.query(`
  SELECT students.id, students.name, $2 AS cohort_name
  FROM students
  JOIN cohorts
  ON students.cohort_id = cohorts.id
  LIMIT $1;`, [number, cohortName])
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack)
  );