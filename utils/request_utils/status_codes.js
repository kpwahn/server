module.exports = {
    ok: 200,
    bad_request: 400, //The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
    conflict: 409, //The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request.
    internal_server_error: 500, //The server encountered an unexpected condition which prevented it from fulfilling the request.
}