const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        promise.resolve(requestHandler(req,res,next))
        .catch((Error) => next(Error))
        }
}
export {asyncHandler}