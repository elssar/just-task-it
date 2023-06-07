/**
 * service functions for Todo
 *
 * Each function requires the `user_id` to be passed to ensure that operations performed by the user,
 * or on behalf of the user (for eg in integrations), can only apply to todos owned by the user.
 */
import { Op } from 'Sequelize';

import Todo from '../models/todo.model.js';

async function create_todo (data, user) {
    data.user = user;

    return await Todo.create(data);
}

async function get_todo (todo_id, user) {
    return await Todo.findOne({
        where: {
            id: todo_id,
            user: user
        }
    });
}

async function update_todo (data, todo_id, user) {
    let todo = await get_todo(todo_id, user);

    if (todo === null) {
        return null;
    }

    todo.set(data);
    await todo.save();

    return todo;
}

async function get_todos (user, get_all = false) {
    let where = { user: user };

    if (get_all !== true) {
        where.done_at = {
            [Op.not]: null
        }
    }

    return await Todo.findAll({ where });
}

async function todo_action (action, todo_id, user) {
    let todo = await get_todo(todo_id, user);

    if (todo === null) {
        return null;
    }

    if (action === 'done' && todo.done_at === null) {
        todo.done_at = new Date();
    }
    else if (action === 'reopen') {
        todo.done_at = null;
    }

    await todo.save();

    return todo;
}

/**
 * Add a todo to a list.
 *
 * While this function ensures the users ownership of a todo,
 * it does not verify the list ownership. That must be done
 * by the calling function.
 */
async function add_todo_to_list(todo_id, list_id, user) {
    let todo = await get_todo(todo_id, user);

    if (todo === null) {
        return null;
    }

    todo.list = list_id;
    await list.save();

    return todo;
}

async function remove_todo_from_list(list_id, user) {
    let todo = await get_todo(todo_id, user);

    if (todo === null) {
        return null;
    }

    todo.list = null;
    await list.save();

    return todo;
}

async function get_todos_for_list(list_id, user) {
    let todos = Todo.findAll({
        where: {
            list: list_id,
            user: user
        }
    });

    return todos;
}

/**
 * Adds multiple todos to a list
 *
 * This function will ensure that only todos owned by the user
 * can be added to the list, but does not verify the users ownership of the list. That
 * must be done by the calling function.
 */
async function add_todos_to_list(todo_ids, list_id, user) {
    await Todo.update({ list: list_id }, {
        where: {
            user: user,
            id: todo_ids
        }
    });
}

/**
 * Removes todos from list, or moves todos to the implicit global list.
 *
 * DANGER!
 * By default, will set all the list to null for all todos of a user if no
 * clauses are passed. This must be used with caution.
 *
 * If a list_id is passed, then only updates todos that belong to that list.
 * If an array of todo_ids is passed, then only updates those todos.
 */
async function remove_todos_from_list(user, clauses) {
    let where = { user };

    if (clauses.list_id) {
        where.list = clauses.list_id;
    }

    if (clauses.todo_ids) {
        where.id = clauses.todo_ids;
    }

    await Todo.update({ list: null }, { where });
}

export { create_todo, get_todo, update_todo, get_todos, todo_action };
export { add_todo_to_list, remove_todo_from_list, get_todos_for_list, remove_todos_from_list, add_todos_to_list };

