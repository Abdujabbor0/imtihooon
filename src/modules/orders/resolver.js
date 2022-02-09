const model = require('./model.js')
const jwt = require ('jsonwebtoken')

module.exports = {
	Query: {
		see_order: async (_, args,context) => {
			let { admin } = jwt.verify(context.token,"Tommy")
			let { id } = jwt.verify(context.token,"Tommy")
			if(!(admin == 'tommy' || id == args.user_id)) throw new Error("Token key invalid!!!")
			
			if(admin){
				args.user_id = undefined
				let order = await model.see_order(args)
				return order
			}
			if(id){
				let order = await model.see_order(args)
				return order
			}
			
		},
		total_money: async(_,args,context) => {

			let { admin } = jwt.verify(context.token,"Tommy")
			let order = await model.see_order(args)

			if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")
			console.log(order)
			let money = 0 
			for(let x in order){
				money += +order[x].total_price
			}
			return {
				status: 200,
				data: {Total_Money: money + '' + '.000'}
			}

			
		}
	},
	
	Mutation: {
		add_order: async (_, args, context) => {
			try{
			if(!context.token) throw new Error("Token key invalid!!!")
			let { id } = jwt.verify(context.token,"Tommy")
			
			args.user_id = id
			
			let user_id = args.user_id
			const [tekshirish] = await model.tekshirish(user_id)
			console.log(tekshirish)
			let product_id = +args.product_id
			let is_paid = args.is_paid
			let price = args.price 
			let order
			if(tekshirish == undefined){
				order = await model.addorder(user_id, product_id, price, is_paid)
				return {
					status: 200,
					message: "Order qoshildi!!!",
					data: order
				}
			}
			if(tekshirish.is_paid == false){
				let total_price = +price + (+tekshirish.total_price)
				total_price = total_price + '' + '.000'
				order = await model.update(product_id, user_id,total_price,is_paid)
				console.log(order)
				return {
					status: 200,
					message: "Order qoshildi!!!",
					data: order
				}
			}
			if(tekshirish.is_paid == true){
				order = await model.addorder(user_id, product_id, price, is_paid)
				return {
					status: 200,
					message: "Order qoshildi!!!",
					data: order
				}
			}
			} catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		}	
	}
}
// const le = parseFloat("2.299.000".replace(/,/g, ','))
// console.log(le)