let router = require('express').Router();

router.use('/', require('./get/book/books.js'));
router.use('/', require('./get/book/book.js'));
router.use('/', require('./get/quiz/quizzes.js'));
router.use('/', require('./get/quiz/quiz.js'));
router.use('/', require('./get/question/questions.js'));
router.use('/', require('./get/question/question.js'));
router.use('/', require('./get/answer/answers.js'));

router.use('/', require('./authenticate.js'));
router.use('/', require('./create_user'));
router.use('/', require('./create_quiz.js'));
// router.use('/create-answer', require('./create_answer.js'));
// router.use('/create-question', require('./create_question.js'));

module.exports = router;