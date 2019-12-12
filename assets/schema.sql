DROP DATABASE IF EXISTS personnelDB;

CREATE DATABASE personnelDB;

USE personnelDB;

CREATE TABLE departments (
    deptID INT AUTO_INCREMENT,
    deptName VARCHAR(25),
    PRIMARY KEY(deptID)
);

CREATE TABLE roles (
    roleID INT AUTO_INCREMENT,
    title VARCHAR(50),
    salary DECIMAL(10,2),
    deptID VARCHAR(25),
    PRIMARY KEY(roleID)
)

CREATE TABLE employees (
    empID INT AUTO_INCREMENT,
    firstName VARCHAR(25),
    lastName VARCHAR(25),
    roleID VARCHAR(25),
    managerID INT,
    PRIMARY KEY(empID)
)

-- CREATE TABLE managers (
--     managerID INT AUTO_INCREMENT,
--     deptID VARCHAR(25),
--     firstName VARCHAR(25),
--     lastName VARCHAR(25),
--     PRIMARY KEY(managerID)
-- )