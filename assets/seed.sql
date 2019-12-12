USE personnelDB;;

INSERT INTO departments (deptName)
VALUES ('Shipping'), ('Receiving');

INSERT INTO roles (title, salary)
VALUES ('Supervisor', 40000),
        ('Manager', 60000);

INSERT INTO employees (firstName, lastName)
VALUES ('Mario', 'Cortes'),
        ('John', 'Wick');