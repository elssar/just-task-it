import Router from 'express';

const health_router = Router();

health_router.get('/basic', (req, res) => {
    res.json({
        "status": "OK"
    });
});

export default health_router;

