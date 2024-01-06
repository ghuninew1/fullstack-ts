export default function createError(
    status = 500,
    message = "Internal Server Error"
) {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}
