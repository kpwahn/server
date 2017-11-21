module.exports = {
    port: 3000,
    secret: 'secret',
    jwt_expires_in: '10d',
    error_messages: {
        encrypt: "Could not encrypt password",
        db_connect: "Could not establish connection to the database",
        db_query: "Could not query the database",
        duplicate_email: "Email address already exists",
        duplicate_book: "Book name already exists",
        duplicate_quiz: "Quiz name already exists",
        duplicate_answer: "Answer already exists",
        duplicate_question: "Question already exists",
        invalid_email_or_password: "Invalid email or password",
        no_route_found: 'No route found',
        no_token: 'No token provided',
        token_auth_failed: 'Failed to authenticate token',
        method_not_allowed: 'The method specified is not allowed for the resource',
        question_not_found: "Question not found",
        book_not_found: "Book not found",
        quiz_not_found: "No quiz found"
    },
    success_messages: {
        new_user: "New user created",
        authenticated: "Authenticated",
        new_quiz: "New quiz created",
        new_answer: "Answer added to question",
        new_question: "Question added to quiz",
        new_book: "Book added"
    },
    expected_bodies: {
        create_user: ['email', 'password'],
        create_book: ['name'],
        create_quiz: ['name', 'book'],
        create_answer: ['answer', 'question_id', 'correct'],
        create_question: ['question', 'quiz_id']
    },
    expected_query_params: {
      question: ['quiz_name']
    }
}
