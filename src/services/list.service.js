/**
 * Service functions for List
 *
 * Each function requires the user id to be passed. This is to ensure that
 * operations can only be performed by a user or on behalf of a user (for eg in integrations)
 * on lists the user owns.
 */
import List from '../models/list.model.js';

async function create_list (data, user) {
    data.user = user;

    return await List.create(data);
}

async function get_list (list_id, user) {
    return await List.findOne({
        where: {
            id: list_id,
            user: user
        }
    });
}

async function update_list_name (name, list_id, user) {
    let list = await get_list(list_id, user);

    if (list === null) {
        return null;
    }

    list.name = name;
    await list.save();

    return list;
}

async function delete_list (list_id, user) {
    let list = await get_list(list_id, user);

    if (list === null) {
        return null;
    }

    await list.destroy();

    return true;
}

async function get_lists (user) {
    let where = { user: user };

    return await List.findAll({ where });
}

export { create_list, get_list, update_list_name, delete_list, get_lists };

