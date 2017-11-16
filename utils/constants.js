module.exports = {
    port: 3000,
    secret: 'secret',
    jwt_expires_in: '10d',
    error_messages: {
        encrypt: "Could not encrypt password",
        db_connect: "Could not establish connection to the database",
        db_query: "Could not query the database",
        duplicate_email: "Email address already exists",
        duplicate_quiz: "Quiz name already exists",
        duplicate_answer: "Answer already exists",
        invalid_email_or_password: "Invalid email or password",
        no_route_found: 'No route found',
        no_token: 'No token provided',
        token_auth_failed: 'Failed to authenticate token',
        method_not_allowed: 'The method specified is not allowed for the resource',
        question_not_found: "Question not found"
    },
    success_messages: {
        new_user: "New user created",
        authenticated: "Authenticated",
        new_quiz: "New quiz created",
        new_answer: "Answer added to question"
    },
    expected_bodies: {
        create_user: ['email', 'password'],
        create_quiz: ['name', 'book'],
        create_answer: ['answer', 'question', 'correct']
    },
    expected_query_params: {
      question: ['name']
    }
}
