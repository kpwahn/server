module.exports = {
    select_email : 'SELECT * FROM user_table WHERE email = ?;',
    insert_email: 'INSERT INTO user_table (email, password) VALUES (?, ?);',
    get_quizes: "SELECT * FROM quiz_table;",
    get_questions: "SELECT question FROM multiple_choice_question_table WHERE quiz_id = ( SELECT id FROM quiz_table where name = ? );",
    select_question: "SELECT * FROM multiple_choice_question_table WHERE question = ?;",
    select_question_by_id: "SELECT * FROM multiple_choice_question_table WHERE quiz_id = ?;",
    select_question_by_question_and_id: "SELECT * FROM multiple_choice_question_table WHERE quiz_id = ? AND question = ?;",
    select_quiz: "SELECT * FROM quiz_table WHERE name = ?;",
    select_quiz_query_weridness:  "SELECT * FROM quiz_table WHERE name =",
    insert_quiz: "INSERT into quiz_table (name, book) VALUES (?, ?);",
    insert_answer: "INSERT into multiple_choice_answer_table(answer) VALUES (?);",
    select_answer: "SELECT * FROM multiple_choice_answer_table where answer = ?;",
    insert_question: "INSERT into multiple_choice_question_table(question, quiz_id) VALUES (?,?);",
    insert_question_answer: "INSERT into multiple_choice_question_answer_table(question_id, answer_id, correct_answer) VALUES (?,?,?);"
}
