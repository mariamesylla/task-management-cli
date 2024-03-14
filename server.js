import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import Todos from './schema/todoSchema.js';
import { connectDB, disconnectDB } from './db.js';
import { getTaskCode, deleteTask } from './commands/delete.js';
import readTask from './commands/read.js';
import updateTask from './commands/update.js';
import deleteTask from './commands/delete.js';
import addTask from './commands/add.js';
import { Command } from 'commander';
const program = new Command();

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.post('/add', async (req, res) => {
    try {
        const { name, detail } = req.body;
        const response = await Todos.create({ name, detail });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/read', async (req, res) => {
    try {
        const todos = await Todos.find({});
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/update', async (req, res) => {
    try {
        const { code, name, detail, status } = req.body;
        const response = await Todos.findOne
        ({ code });
        if (!response) {
            res.status(404).json({ message: 'Todo not found' });
        } else {
            response.name = name || response.name;
            response.detail = detail || response.detail;
            response.status = status || response.status;
            await response.save();
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   );  

app.delete('/delete', async (req, res) => {
    try {
        const { code } = req.body;
        const response = await Todos.deleteOne({ code });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'Todo not found' });
        } else {
            res.json({ message: 'Todo deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(chalk.blueBright(`Server is running on port ${PORT}`));
});

// Disconnect from the database
disconnectDB();
