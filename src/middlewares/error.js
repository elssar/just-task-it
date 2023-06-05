function error_handler (err, req, res, next) {
    res.status(err.status_code || 500);

    return res.json({
        status: err.name || 'UnexpectedError'
    });
}

export { error_handler };

