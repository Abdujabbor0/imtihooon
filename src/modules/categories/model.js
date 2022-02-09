const { fetch, fetchAll } = require('../../utils/postgres.js')

const GET = `
	SELECT
		*
	FROM Categories
`

const ADD = ` insert into Categories (categor_name) values($1) returning * `

const EDIT = ` update Categories set 
	categor_name =(
		case 
			when length($1)>0 then $1 else Categories.categor_name
		end
	)
	where categor_id = $2
	returning *
` 

const DELETE = `delete from Categories where categor_id = $1 returning *`


const get = () => fetchAll(GET)
const add_category = ({ categor_name }) => fetchAll(ADD, categor_name)
const edit_category = ({ categor_id, categor_name }) => fetchAll(EDIT, categor_name, categor_id)
const delete_category = ({ categor_id}) => fetchAll(DELETE, categor_id)


module.exports = {
	get,
	add_category,
	edit_category,
	delete_category
}