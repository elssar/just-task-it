import Router from 'express';

import * as TodoService from '../services/todo.service.js';
import { get_list } from '../services/list.service.js';

import authenticate from '../middlewares/authenticate.js';

import { BadRequest, UnexpectedError, NotFound } from '../errors.js';

const todo_router = Router();

todo_router.use(authenticate);

// @todo validate request data
todo_router.post('/', async (req, res, next) => {
    let { list: list_id, ...todo_data } = req.body;

    try {
        let list;

        if (list_id) {
            list = await get_list(list_id, req.user_id);
        }

        // There was a list passed in the request data, but it either
        // - does not exist
        // - does not belong to the user
        // So return an error
        if (list_id && list === null) {
            throw new BadRequest;
        }

        if (list && list.id) {
            todo_data.list = list.id;
        }

        let todo = await TodoService.create_todo(todo_data, req.user_id);

        return res.json(todo);
    }
    catch (err) {
        return next(err);
    }
});

todo_router.get('/', async (req, res, next) => {
    let all = req.query.all === 'true';

    try {
        let todos = await TodoService.get_todos(req.user_id, all);

        return res.json(todos);
    }
    catch (err) {
        return next(err);
    }
});

todo_router.get('/:todo_id', async (req, res, next) => {
    try {
        let todo = await TodoService.get_todo(req.params.todo_id, req.user_id);

        if (todo === null) {
            throw new NotFound;
        }

        return res.json(todo);
    }
    catch (err) {
        return next(err);
    }
});

// @todo validate request
todo_router.put('/:todo_id', async (req, res, next) => {
    let { title, due_by } = req.body;

    if (!title && !due_by) {
        return next(new BadRequest()); 
    }

    try {
        let todo = await TodoService.get_todo(req.params.todo_id, req.user_id);

        if (todo === null) {
            throw new NotFound;
        }

        if (title) {
            todo.title = title
        }
        else if (due_by) {
            todo.due_by = due_by;
        }

        await todo.save();

        return res.json(todo);
    }
    catch (err) {
        return next(err);
    }
});

todo_router.delete('/:todo_id', async (req, res, next) => {
    try {
        let todo = await TodoService.get_todo(req.params.todo_id, req.user_id);

        if (todo === null) {
            throw new NotFound;
        }

        await todo.destroy();

        return res.json({
            status: 'Ok'
        });
    }
    catch (err) {
        return next(err);
    }
});

todo_router.put('/:todo_id/:action', async (req, res, next) => {
    const VALID_ACTIONS = ['done', 'reopen'];

    let action = req.params.action;

    if (!VALID_ACTIONS.includes(action)) {
        return next(new BadRequest());
    }

    try {
        let todo = await TodoService.todo_action(action, req.params.todo_id, req.user_id);

        if (todo === null) {
            throw new NotFound;
        }

        return res.json(todo);
    }
    catch (err) {
        return next(err);
    }
});

export default todo_router;

