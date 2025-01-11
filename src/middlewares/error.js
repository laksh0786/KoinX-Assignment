const errorMiddleware = (err , req , resp , next)=>{

    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;

    // console.log(err);

    return resp.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}


export {errorMiddleware};