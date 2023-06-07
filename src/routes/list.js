import Router from 'express';

import * as ListService from '../services/list.service.js';
import { add_todos_to_list, remove_todos_from_list, get_todos_for_list } from '../services/todo.service.js';

import authenticate from '../middlewares/authenticate.js';

import { UnexpectedError, NotFound } from '../errors.js';

const list_router = Router();

list_router.use(authenticate);

list_router.post('/', async (req, res, next) => {
    let { todos, ...list_data } = req.body;

    // @todo validate request data

    try {
        let list = await ListService.create_list(list_data, req.user_id);

        if (!todos) {
            return res.json(list);
        }

        await add_todos_to_list(todos, list.id, req.user_id);

        return res.json(list);
    }
    catch (err) {
        return next(err);
    }
});

list_router.get('/', async (req, res, next) => {
    try {
        let lists = await ListService.get_lists(req.user_id);

        return res.json(lists);
    }
    catch (err) {
        return next(err);
    }
});

list_router.get('/:list_id', async (req, res, next) => {
    try {
        let list = await ListService.get_list(req.params.list_id, req.user_id);

        if (list === null) {
            throw new NotFound;
        }

        if (req.query.populate !== 'true') {
            return res.json(list);
        }

        let todos = await get_todos_for_list(list.id, req.user_id);
        let data = list.toJSON();

        data.todos = todos;

        return res.json(data);
    }
    catch (err) {
        return next(err);
    }
});

// @todo: add input validation
list_router.put('/:list_id', async (req, res, next) => {
    try {
        let name  = req.body.name;
        let list = await ListService.update_list_name(name, req.params.list_id, req.user_id);

        if (list === null) {
            throw NotFound;
        }

        return res.json(list);
    }
    catch (err) {
        return next(err);
    }
});

list_router.delete('/:list_id', async (req, res, next) => {
    try {
        let list = await ListService.get_list(req.params.list_id, req.user_id);

        if (list === null) {
            throw NotFound;
        }

        await remove_todos_from_list(req.user_id, { list_id: list.id });
        await list.destroy();

        return res.json({
            status: 'Ok'
        });
    }
    catch (err) {
        return next(err);
    }
});

export default list_router;
