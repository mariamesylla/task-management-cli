#!/usr/bin/env node

import addTask from './commands/add.js'
import deleteTask from './commands/delete.js'
import readTask from './commands/read.js'
import updateTask from './commands/update.js'

import { Command } from 'commander'
const program = new Command()

program
.name('todo')
.description('Your terminal task manager!')
.version('1.0.0')

program
.command('add')
.description('Create a new todo.')
.action(addTask)

program
.command('read')
.description('Reads all the todos.')
.action(readTask)

program
.command('update')
.description('Updates a todo.')
.action(updateTask)

program
.command('delete')
.description('Deletes a todo.')
.action(deleteTask)

program.parse()