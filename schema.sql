CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,   
    name VARCHAR(100) NOT NULL,          
    msv VARCHAR(20) NOT NULL,            
    birth DATE NOT NULL,                 
    class VARCHAR(50) NOT NULL         
);
INSERT INTO users (name, msv, birth, class)
VALUES 
    ('Nguyen Van A', 'MSV001', '2000-01-15', 'K15A'),
    ('Tran Thi B', 'MSV002', '1999-05-20', 'K15B');

