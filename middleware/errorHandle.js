import {StatusCodes} from "http-status-codes";


const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err.message);
    const defaultError= {
        // if err obj coming in has status code or status message property should use that one 
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        
        msg: err.message || "Something went wrong, try again later",
    }
    if(err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(",")



    }


     if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)}field has to be unique`

     }



    res.status(defaultError.statusCode).json({msg: defaultError.msg})

    // res.status(defaultError.statusCode).json({msg: err});


}


export default errorHandleMiddleware