module.exports = {
   select_email : 'SELECT * FROM user_table WHERE email = ?;',
    insert_email: 'INSERT INTO user_table (email, password) VALUES (?, ?);'
}

