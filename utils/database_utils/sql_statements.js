module.exports = {
    select_email : 'SELECT * FROM user_table WHERE email = ?;',
    insert_email: 'INSERT INTO user_table (email, password) VALUES (?, ?);',
    get_quizes: "SELECT * FROM quiz_table;",
    get_questions: "SELECT question FROM multiple_choice_question_table WHERE quiz_id = ( SELECT id FROM quiz_table where name = ? );",
    select_quiz: "SELECT * FROM quiz_table WHERE name = ?",
    insert_quiz: "INSERT into quiz_table (name, book) VALUES (?, ?);"
}
