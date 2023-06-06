const handleMongooseError = (erroe, data, next) => { 
    error.status = 400;
    next()
}

module.exports= handleMongooseError;