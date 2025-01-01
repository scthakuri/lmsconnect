const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const generateUsernameFromEmail = (email) => {
    return email.split('@')[0];
};

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) return res.status(400).json({ message: 'Employee already exists.' });

        const username = generateUsernameFromEmail(email);
        if (!username) {
            return res.status(400).json({ message: 'Invalid username generated from email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = new Employee({ email, password: hashedPassword, name });
        await employee.save();

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ email });
        if (!employee) return res.status(400).json({ message: 'Employee not found.' });

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.' });
    }
};

module.exports = { register, login };
