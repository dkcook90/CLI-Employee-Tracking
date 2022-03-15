INSERT INTO department (id, name)
	VALUES(1, "Design"),
	(2, "Engineering"),
	(3, "Data"),
	(4, "Legal");
    
INSERT INTO role (id, title, salary, department_id)
	VALUES(1, "Design Manager", 110000, 1),
    (2, "Designer", 80000, 1),
    (3, "Engineering Manager", 120000, 2),
    (4, "Engineer", 90000, 2),
    (5, "Data Manager", 130000, 3),
    (6, "Data Analyst", 100000, 3),
    (7, "Legal Manager", 140000, 4),
    (8, "Paralegal", 110000, 4);
    
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
	VALUES(1, "Joe", "Dort", 1, null),
    (2, "Mike", "Hiller", 3, null),
    (3, "Sara", "Frost", 5, null),
    (4, "Jill", "Ryke", 7, null),
    (5, "Steve", "Jobs", 2, 1),
    (6, "April", "Seventh", 4, 3),
    (7, "Ken", "Singer", 6, 5),
    (8, "Judy", "Judge", 8, 7);
    
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;  