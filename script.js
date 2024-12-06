const entityData = {
    employees: {
        name: "Employees Table",
        description: `
            The Employees table stores all employee information such as name, gender, date of birth, 
            contact information, department, position, salary, and employment status.
        `,
        code: `
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    hire_date DATE,
    department VARCHAR(100),
    position VARCHAR(100),
    salary DECIMAL(10, 2),
    status ENUM('active', 'inactive') DEFAULT 'active'
);
        `
    },
    payroll: {
        name: "Payroll Table",
        description: `
            The Payroll table tracks payment details for employees, including basic salary, bonuses, 
            deductions, and the calculated net salary.
        `,
        code: `
CREATE TABLE payroll (
    payroll_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    pay_date DATE,
    basic_salary DECIMAL(10, 2),
    bonus DECIMAL(10, 2),
    deductions DECIMAL(10, 2),
    gross_salary DECIMAL(10, 2),
    net_salary DECIMAL(10, 2),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
        `
    },
    deductions: {
        name: "Deductions Table",
        description: `
            The Deductions table records specific deductions made for each employee, such as tax, 
            insurance, or other fees.
        `,
        code: `
CREATE TABLE deductions (
    deduction_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    deduction_type VARCHAR(100),
    amount DECIMAL(10, 2),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
        `
    },
    attendance: {
        name: "Attendance Table",
        description: `
            The Attendance table tracks daily employee attendance, including statuses such as present, 
            absent, sick, or on vacation.
        `,
        code: `
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    date DATE,
    status ENUM('present', 'absent', 'sick', 'vacation'),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
        `
    },
    leaves: {
        name: "Leaves Table",
        description: `
            The Leaves table manages employee leave requests, including types of leave, start and end dates, 
            and approval status.
        `,
        code: `
CREATE TABLE leaves (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    status ENUM('approved', 'pending', 'rejected'),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
        `
    }
};

function showEntity(entity) {
    const entityInfo = document.getElementById("entity-info");
    const dbCode = document.getElementById("db-code");

    if (entityData[entity]) {
        const { name, description, code } = entityData[entity];
        entityInfo.innerHTML = `
            <h2>${name}</h2>
            <p>${description}</p>
            <button onclick="showCode('${entity}')">Show DB Code</button>
        `;
        dbCode.innerHTML = ""; // Clear the code display initially
    }
}

function showCode(entity) {
    const dbCode = document.getElementById("db-code");

    if (entityData[entity]) {
        dbCode.innerHTML = `
            <h2>${entityData[entity].name} Code</h2>
            <pre>${entityData[entity].code}</pre>
        `;
    }
}
