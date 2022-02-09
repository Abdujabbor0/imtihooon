const { fetch, fetchAll } = require('../../utils/postgres.js')

const USERS = `
	SELECT
		user_id,
		user_name,
		email,
		contact
	FROM users
	WHERE
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END
	ORDER BY user_id
	offset $2 limit $3
`
const GET = `
	insert into users (user_name, email, password, contact) values
	($1, $2,crypt($3, gen_salt('bf')), $4 )
	returning *
`

const LOGIN = `
	SELECT 
		user_id,
		user_name,
		email,
		contact,
		role
	FROM users where user_name = $1 and password = crypt($2, password)
`
const users = ({pagination: {page, limit}, user_id}) => fetchAll(USERS, user_id, (page - 1) * limit, limit)

const login = ({user_name, password}) => fetchAll(LOGIN, user_name, password)

;const register = ({user_name, email, password, contact}) => fetch(GET,
	user_name, email, password,contact)

// const register = ({userid, link, size, mimetype}) => fetch(img,
// 	link,
// 	userid,
// 	size,
// 	mimetype
// )



module.exports = {
	users,
	login,
	register
}