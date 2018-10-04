// want to move routes from index.js to here

const express = require('express'); // require express
const router = express.Router(); // create an instance of express Router
const fs = require('fs');
const employees = ['Elie', 'Meg', 'Matt'];

// replace app with router

router.get('', (req, res) => {
  return res.json(employees);
});

router.post('', (req, res) => {
  // take whatever data comes in
  // after body-parser will allow you to use
  // req.body
  // add it to the emplyees array
  // respond with json with the array
  console.log('req body -->', req.body);
  employees.push(req.body.name);
  return res.json(employees);
});
// morgan
// add another route to update an employee's name - PATCH /:name
router.patch('/:name', (req, res) => {
  // find the name Elie -> // using req.params.name
  let target = employees.indexOf(req.params.name);
  // change the value at the index to be req.body.name
  employees[target] = req.body.name;
  // rewrite using devlarative loop
  const newEmployees = employees.map(person => {
    if (person === req.params.name) {
      person = req.body.name;
    }
  });
  // req.body gets you the info from form
  // http PATCH localhost:3000/employees/Elie name=Michael --> ['name']
  // respond with the array of employees
  return res.json(employees);
});
// add another route to remove an employee - DELETE /employees/:name
router.delete('/:name', (req, res) => {
  // respond with the array of employees
  let target = employees.indexOf(req.params.name);
  employees.splice(target, 1);
  // with loop but will only remove from original
  // will need to reassign if want to remove for this session
  const destroyEmp = employees.filter(person => {
    if (person !== req.params.name);
  });
  return res.json(employees);
});

// export out the router!!!
module.exports = router;
