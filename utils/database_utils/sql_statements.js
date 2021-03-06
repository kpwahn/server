module.exports = {
  get_books: "select * from book_table;",
  get_book: "select * from book_table where id = ?;",
  get_book_by_name: "select * from book_table where name = ?;",
  insert_book: "insert into book_table values (UUID(), ?);",

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
  insert_email: 'INSERT INTO user_table (id, email, password) VALUES (UUID(), ?, ?);'
}
