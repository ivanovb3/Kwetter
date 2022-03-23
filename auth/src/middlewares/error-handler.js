export const errorHandler = (err,req,res,next) => {

    console.log('Something went wrong', err);

    const formattedErrors = err.reasons.map(error => {
        return { message: error.msg, field: error.param };
    })

    res.status(400).send({
        errors: formattedErrors
    });
}