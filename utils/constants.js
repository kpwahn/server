module.exports = {
    port: 3000,
    secret: 'secret',
    jwt_expires_in: '10d',
    error_messages: {
        encrypt: "Could not encrypt password",
        db_connect: "Could not establish connection to the database",
        db_query: "Could not query the database",
        duplicate: "Email address already exists",
        invalid_email_or_password: "Invalid email or password",
        no_route_found: 'No route found',
        no_token: 'No token provided',
        token_auth_failed: 'Failed to authenticate token',
        method_not_allowed: 'The method specified is not allowed for the resource'

    },
    success_messages: {
        new_user: "New user successfully created",
        authenticated: "Authenticated"
    },
    expected_bodies: {
        create_new_user: ['email', 'password']
    }
}
