import Router from 'express';

import HealthCheck from '../models/healthcheck.model.js';

const health_router = Router();

/**
 * A simple up check
 */
health_router.get('/basic', (req, res) => {
    res.json({
        status: "OK"
    });
});

/**
 * Performs CRUD operations on the healthceck check table
 * and returns with a 500 response if any of the operations fail
 * or do not work as expected
 *
 * This is a simple sanity check on the database to ensure that it
 * is working and the application can conect to it and perform operations
 * on it.
 */
health_router.get('/advanced', async (req, res) => {
    let hc = await HealthCheck.create({ status: "created" });

    if (hc.status !== "created") {
        return res.status(500).json({
            status: "NOT OK"
        });
    }

    hc.set({ status: "updated" });
    await hc.save();

    let updated_hc = await HealthCheck.findByPk(hc.id);

    if (updated_hc === null) {
        return res.status(500).json({
            status: "NOT OK"
        });
    }

    if (updated_hc.status !== "updated") {
        return res.status(500).json({
            status: "NOT OK"
        });
    }

    await HealthCheck.destroy({
        where: {
            id: hc.id
        }
    });

    let deleted_hc = await HealthCheck.findByPk(hc.id);

    if (deleted_hc !== null) {
        return res.status(500).json({
            status: "NOT OK"
        })
    }

    return res.json({
        status: "OK"
    });
});

export default health_router;

