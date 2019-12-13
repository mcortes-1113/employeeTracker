var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "personnelDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    loadApp();
  });

  function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, table) {
        if (err) throw err;
        console.log('Departments: ')
        table.forEach(record => {
            console.log('Department ID: ' + record.deptID + '   || Department Name: ' + record.deptName)
        })
    })
    return nextDepartmentAction();
  }

  function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, table) {
        if (err) throw err;
        console.log('Employees: ')
        table.forEach(record => {
            console.log('Employee ID: ' + record.empID +
            '   || First Name: ' + record.firstName +
            '   || Last Name: ' + record.lastName +
            '   || Role ID: ' + record.roleID +
            '   || Manager ID: ' + record.managerID
            )
        })
    })
    return nextEmployeeAction();
  }

  function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, table) {
        if (err) throw err;
        console.log('Roles: ')
        table.forEach(record => {
            console.log('Role ID: ' + record.roleID +
            '   || Title: ' + record.title +
            '   || Salary: ' + record.salary +
            '   || Department ID: ' + record.deptID 
            )
        })
    })
    return nextRolesAction();
  }

  function nextDepartmentAction() {
    inquirer
    .prompt([
      {
          type: "list",
          name: "nextAction",
          message: "What would you like to do?",
          choices: ['Add a Department', 'Update a Department', 'Exit Application']
      }])
    .then(function(response) {
      let nextAction = response.nextAction;
      switch (nextAction) {
        case 'Add a Department':
            addDepartment();
            break;
        case 'Update a Department':
            updateDepartment();
            break;
        case 'Exit Application':
            return connection.end();
      }
    });
  }

  function addDepartment() {
    inquirer
    .prompt([
      {
          type: "input",
          message: "Enter the Department Name?",
          name: "dept"
      }])
      .then(function(response) {
        let dept = response.dept;
        connection.query("INSERT INTO departments (deptName) VALUES (?)", [dept], function (err, table) {
        if (err) throw err;
        console.log('Department ' + dept + ' has been added!')
        connection.query("SELECT * FROM departments", function (err, table) {
            if (err) throw err;
            console.log('Departments: ')
            table.forEach(record => {
                console.log('Department ID: ' + record.deptID + '   || Department Name: ' + record.deptName)
            })
        })
            })
      })
      // return connection.end();
    };

  function updateDepartment() {

  }

function nextRolesAction() {
    inquirer
    .prompt([
      {
          type: "list",
          name: "nextAction",
          message: "What would you like to do?",
          choices: ['Add a Role', 'Update a Role', 'Exit Application']
      }])
    .then(function(response) {
      let nextAction = response.nextAction;
      switch (nextAction) {
        case 'Add a Role':
            addRole();
            break;
        case 'Update a Role':
            updateRole();
            break;
        case 'Exit Application':
            return connection.end();
      }
    });
}

function addRole() {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Enter the Role Title?",
          name: "title"
        },
        {
        type: "number",
        message: "Enter the Role Salary?",
        name: "salary"
        },
        {
        type: "number",
        message: "Select a Department ID for this Role:",
        name: "dept"
        },
    ])
      .then(function(response) {       
        connection.query("INSERT INTO roles (title, salary, deptID) VALUES (?, ?, ?)",
                          [response.title, response.salary, response.dept], function (err, result) {
        if (err) throw err;
        console.log('Role ' + response.title + ' has been added!')
        connection.query("SELECT * FROM roles", function (err, table) {
            if (err) throw err;
            console.log('Roles: ')
            table.forEach(record => {
                console.log('Role ID: ' + record.roleID +
                            '   || Role Title: ' + record.title +
                            '   || Role Salary: ' + record.salary +
                            '   || Role Title: ' + record.deptID)
            })
        })
    })
    })
      // return connection.end();
}

function updateRole() {

}

function nextEmployeeAction() {
    inquirer
    .prompt([
      {
          type: "list",
          name: "nextAction",
          message: "What would you like to do?",
          choices: ['Add an Employee', 'Update an Employee', 'Exit Application']
      }])
    .then(function(response) {
      let nextAction = response.nextAction;
      switch (nextAction) {
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee':
            updateEmployee();
            break;
        case 'Exit Application':
            return connection.end();
      }
    });
  }

  function addEmployee() {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Enter the Employee's First Name:",
          name: "first"
        },
        {
        type: "input",
        message: "Enter the employee's Last Name:",
        name: "last"
        },
        {
        type: "number",
        message: "Select a Role ID for this Employee:",
        name: "role"
        },
        {
          type: "number",
          message: "Select a Manager ID for this Employee:",
          name: "manager"
        }
    ])
      .then(function(response) {       
        connection.query("INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES (?, ?, ?, ?)",
                          [response.first, response.last, response.role, response.manager], function (err, result) {
        if (err) throw err;
        console.log('Employee ' + response.first + ' ' + response.last + ' has been added!')
        connection.query("SELECT * FROM employees", function (err, table) {
            if (err) throw err;
            console.log('Employees: ')
            table.forEach(record => {
                console.log('Employee ID: ' + record.roleID +
                            '   || Employee Name: ' + record.firstName + ' ' + record.lastName + 
                            '   || Employee Role ID: ' + record.roleID +
                            '   || Employee Manager ID: ' + record.managerID)
            })
        })
    })
    })
      // return connection.end();
  }

  function updateEmployee() {

  }

  function loadApp() {
    inquirer
    .prompt([
      {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: ['View Employees', 'View Departments', 'View Roles']
      }])
    .then(function(response) {
      let action = response.action;
      switch (action) {
        case 'View Employees':
            viewEmployees();
            break;
        case 'View Departments':
            viewDepartments();
            break;
        case 'View Roles':
            viewRoles();
            break;
      }
    });
}