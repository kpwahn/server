module.exports = {
  get_books: "select * from book_table;",
  get_book: "select * from book_table where id = ?;",
  get_book_by_name: "select * from book_table where name = ?;",

  get_quizzes: "select * FROM quiz_table where book_id = ?;",
  get_quiz: "select * from quiz_table where id = ?;",
  get_quiz_by_name_and_book_id: "select * from quiz_table where name = ? and book_id = ?;",
  insert_quiz: "insert into quiz_table VALUES (UUID(), ?, ?);",

  get_questions: "select * from question_table where quiz_id = ?",
  get_question: "select * from question_table where id = ?;",
  get_quesiton_by_question_and_quiz_id: "select * from question_table where question = ? and quiz_id = ?;",
  insert_question: "insert into question_table values(UUID(), ?, ?);",

  get_answer: "select * from answer_table where id = ?;",
  get_answer_ids: "select * from answer_table where question_id = ?;",
  get_answer_by_question_id_and_answer: "select * from answer_table where question_id = ? and answer = ?;",
  insert_answer: "insert into answer_table values (UUID(), ?, ?, ?);",

  get_email : 'SELECT * FROM user_table WHERE email = ?;',
  insert_email: 'INSERT INTO user_table (id, email, password) VALUES (UUID(), ?, ?);',








  select_question: "SELECT * FROM multiple_choice_question_table WHERE question = ?;",
  select_question_by_id: "SELECT * FROM multiple_choice_question_table WHERE quiz_id = ?;",
  select_quiz_query_weridness:  "SELECT * FROM quiz_table WHERE name =",
  select_answer: "SELECT * FROM multiple_choice_answer_table where answer = ?;",
  insert_question_answer: "INSERT into multiple_choice_question_answer_table(question_id, answer_id, correct_answer) VALUES (?,?,?);"
}
