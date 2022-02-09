const model = require('./model.js')
const jwt = require ('jsonwebtoken')
const { Mutation } = require('../user/resolver.js')
module.exports = {
	Query: {
		categories: async (_, args) => {
			let categories = await model.get(args)
			return categories
		}
	},
	Mutation:{
		add_category: async (_, args, context) => {
			try{
				let { admin } = jwt.verify(context.token,"Tommy")
				if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")
				const [ category ] = await model.add_category(args)
				if(category){
					return {
						status: "Xozircha status yoq!!!",
						message: "Categoriya qoshildi!!!",
						data: category,
					}
				}
				else throw new Error("Categoriya qoshilvotgandan hatolik bor!!")
			} catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		},
		edit_category: async (_,args, context) =>{
			try{
				let { admin } = jwt.verify(context.token,"Tommy")
				if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")
				const [ category ] = await model.edit_category(args)
				if(category){
					return {
						status: 200,
						message: "Categoriya Ozgartirildi!!!",
						data: category
					}
				}			
			}catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		},
		delete_category: async (_,args,context) =>{
			try{
				let { admin } = jwt.verify(context.token,"Tommy")
				if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")
				const [ category ] = await model.delete_category(args)
				if(category){
					return {
						status: 200,
						message: "Categoriya ochirildi!!!",
						data: category
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
}