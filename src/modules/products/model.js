const { fetch, fetchAll } = require('../../utils/postgres.js')

const GET = `
	SELECT
		*
	FROM Products
	WHERE
	CASE 
		WHEN LENGTH($1) > 0 THEN (
			product_name ILIKE CONCAT('%', $1 , '%') 
		) ELSE TRUE
	END 
	ORDER BY product_id
	offset $2 limit $3
`




const ADD = `insert into Products (
	product_name, 
	categor_id, 
	price, 
	short_desc, 
	long_desc, 
	picture
) values
($1, $2, $3, $4, $5, $6) returning *`

const EDIT = ` update Products u set
	product_name = (
		case
			when length($2) > 0 then $2 else u.product_name
		end
	),
	categor_id = (
		case
			when $3 > 0 then $3 else u.categor_id
		end
	),
	price = (
		case
			when length($4) > 0 then $4 else u.price
		end
	),
	short_desc = (
		case
			when length($5) > 0 then $5 else u.short_desc
		end
	),
	long_desc = (
		case
			when length($6) > 0 then $6 else u.long_desc
		end
	),
	picture = (
		case
			when length($7) > 0 then $7 else u.picture
		end
	)
where product_id = $1
returning *
`
	
const DELETE = `delete from Products where product_id = $1 returning *`
const add_product = ({ 
	product_name, 
	categor_id, 
	price, 
	short_desc, 
	long_desc, 
	picture 
}) => fetchAll(
	ADD, 
	product_name, 
	categor_id, 
	price, 
	short_desc, 
	long_desc, 
	picture)


const edit_product = ({ 
	product_id,
	product_name,
	categor_id,
	price,
	short_desc,
	long_desc,
	picture,
 }) => fetchAll(
	EDIT, 
	product_id,
	product_name,
	categor_id,
	price,
	short_desc,
	long_desc,
	picture,
)



const delete_product = ({ product_id}) => fetchAll(DELETE, product_id)
	
	
	const get = ({pagination: {page, limit}, search}) => fetchAll(GET,  search, (page - 1) * limit, limit)
module.exports = {
	get,
	add_product,
	edit_product,
	delete_product
}