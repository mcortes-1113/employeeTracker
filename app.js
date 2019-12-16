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
        loadApp();
    }) 
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
            })
        loadApp();
      })
    };

  function updateDepartment() {

    connection.query("SELECT * FROM departments", function (err, table) {
      if (err) throw err;
      console.log('Departments: ')
      table.forEach(record => {
          console.log('Department ID: ' + record.deptID + '   || Department Name: ' + record.deptName)
      })
      inquirer
      .prompt([
        {
            type: "number",
            name: "deptID",
            message: "Select the ID for the Department that you want to rename:"
        },
        {
            type: "input",
            name: "newName",
            message: "Enter the department's new name:"
        }])
      .then(function(response) {
        let id = response.deptID;
        let newValue = response.newName;
        connection.query("UPDATE departments SET deptName = ? WHERE deptID = ?", [newValue, id], function (err, table) {
          if (err) throw err;
          console.log('Department has been renamed to: ' + newValue)
          loadApp()
      });
  })
  })
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
      loadApp();
  })
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
        loadApp();
    })
    })
}

function updateRole() {
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
    inquirer
    .prompt([
      {
          type: "number",
          name: "roleID",
          message: "Select the ID for the Role that you want to update:"
      },
      {
          type: "input",
          name: "newTitle",
          message: "Enter the role's new title:"
      },
      {
        type: "number",
        name: "newSalary",
        message: "Enter the role's new salary:"
      },
      {
      type: "number",
      name: "newDeptID",
      message: "Enter the role's new Department ID:"
      }
    ])
    .then(function(res) {
      connection.query("UPDATE roles SET title = ?, salary = ?, deptID = ? WHERE roleID = ?", [res.newTitle, res.newSalary, res.newDeptID, res.roleID], function (err, table) {
        if (err) throw err;
        console.log('Role has been updated!')
        loadApp()
    });
})
})
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
      loadApp();
  })
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
        loadApp();
    })
    })
  }

  function updateEmployee() {

  }

  function exitApp() {
    console.log('Good Bye')
    connection.end();
  }

  function loadApp() {
    inquirer
    .prompt([
      {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: ['View Employees',
                   'View Departments',
                   'View Roles',
                   'Add an Employee',
                   'Add a Department',
                   'Add a Role',
                   'Update an employee',
                   'Rename a Department',
                   'Update a Role',
                   'View Budget by Department',
                   'Exit App']
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
        case 'Add an Employee':
            addEmployee();
            break;        
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Update an employee':
            updateEmployee();
            break;
        case 'Rename a Department':
            updateDepartment();
            break;
        case 'Update a Role':
            updateRole();
            break;
        case 'View Budget by Department':
            viewBudget();
            break;
        case 'Exit App':
            exitApp();
            break;
    }
    });
}