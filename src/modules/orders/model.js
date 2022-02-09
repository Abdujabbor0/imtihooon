const { fetch, fetchAll } = require('../../utils/postgres.js')
const products = require('../products/index.js')

const GET = `
	insert into Orders (products, total_price, is_paid,user_id) values
	(Array[+$2], $3, $4,$1)
	returning *

	`
const UPDATE = `
	update Orders set products = array_append(products, $1), total_price =$3,
	is_paid = (
		case
			when $4 in (true) then $4 else Orders.is_paid
		end
	)
	where user_id = $2
	returning *
`
	
const TEKSHIRISH = `
	select 
		*
	from Orders
	WHERE Orders.user_id = $1
`

const SEE_ORDER = `
	select * from Orders
	where
	case
		when $1 in (true, false) then is_paid = $1
		else true
	end and 
	case
		when $2 > 0 then user_id = $2
		else true
	end
`


const addorder = (user_id, product_id, price, is_paid) => fetchAll(GET,  user_id, product_id, price, is_paid)
const update = (product_id, user_id , price, is_paid) => fetchAll(UPDATE, product_id, user_id ,price,is_paid)
const tekshirish = (user_id) => fetchAll(TEKSHIRISH, user_id)
const see_order = ({is_paid, user_id}) => fetchAll(SEE_ORDER, is_paid, user_id)



module.exports = {
	addorder,
	tekshirish,
	update,
	see_order
}