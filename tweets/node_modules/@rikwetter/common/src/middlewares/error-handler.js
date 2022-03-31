export const errorHandler = (err, req, res, next) => {

    const formattedErrors = err.reasons.map(error => {
        return { message: error.msg, field: error.param };
    })

    if (formattedErrors[0].field) {
        return res.status(400).send({
            errors: formattedErrors
        });
    }

    console.error(err)
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
}