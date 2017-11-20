let router = require('express').Router();

router.use('/', require('./get/book/books.js'));
router.use('/', require('./get/book/book.js'));
router.use('/', require('./get/quiz/quizzes.js'));
router.use('/', require('./get/quiz/quiz.js'));
router.use('/', require('./get/question/questions.js'));
router.use('/', require('./get/question/question.js'));

router.use('/create-user', require('./create_user'));
router.use('/authenticate', require('./authenticate.js'));
router.use('/create-quiz', require('./create_quiz.js'));
router.use('/question', require('./question.js'));
router.use('/create-answer', require('./create_answer.js'));
router.use('/create-question', require('./create_question.js'));

module.exports = router;
