const TryCatch = (passedFunction)=> async (req , resp , next)=>{
    try {
        
        await passedFunction(req , resp , next);

    } catch (error) {
        
        next(error);

    }
}

export {TryCatch};