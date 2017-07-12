module.exports = {
    port: 3000,
    secret: 'secret',
    jwt_expires_in: '10m',
    error_messages: {
        encrypt: "Could not encrypt password",
        db_connect: "Could not establish connection to the database",
        db_query: "Could not query the database",
        duplicate: "Email address already exists",
        invalid_email_or_password: "Invalid email or password"
    },
    success_messages: {
        new_user: "New user successfully created",
        authenticated: "Authenticated"
    }
}
