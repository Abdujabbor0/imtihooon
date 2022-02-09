const model = require('./model.js')
const jwt = require ('jsonwebtoken')
const path = require ('path')
const fs = require ('fs')
// let ip = __dirname
module.exports = {
	Query: {
		users: async (_, args) => {
			return await model.users(args)
		}
	},
	Mutation: {
		Login: async (_, args, context) => {
			try{
				const [user] = await model.login(args)
				let token 
				if(user== undefined) throw new Error("User topilmadi!!!")
				if(user.role){
					token = jwt.sign({ admin: 'tommy' }, "Tommy")
				}else{
					token = jwt.sign({ id : user.user_id }, "Tommy")
				}
				if(user){
					return {
						status: 200,
						message: "User topilid!!!",
						data: user,
						token
					}
				}
				else throw new Error("There is no such user!!")
			} catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		},
		Register: async (_,args) =>{
			try{
				const user = await model.register(args)
				if(user){
					return {
						status: 200,
						message: "User qoshildi!!!",
						data: user,
						token: jwt.sign({ id : user.user_id }, "Tommy")
					}
				}			
			}catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		},
}

	// User: {
	// 	imagelink: async parent =>{
	// 		let userid = parent.userid
	// 		let x = await model.link({userid})
	// 		if(x) {
	// 			return ip + x.link
	// 		}
	// 		else {
	// 			return null
	// 		}
		// }
	// }
}
