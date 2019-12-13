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
    return connection.end();
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
    return connection.end();
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
    return connection.end();
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
    //   if (response.action === 'Post an Item') {
    //     viewUserAuctions();}
    //     else {
    //         selectItemToBid();
    //     }
    //   }
