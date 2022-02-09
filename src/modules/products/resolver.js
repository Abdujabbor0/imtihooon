const model = require('./model.js')
const jwt = require ('jsonwebtoken')
let pi = "http://localhost:2345"
const path = require ('path')
const fs = require ('fs')
module.exports = {
	Query: {
		products: async (_, args) => {
			let products = await model.get(args)
			return products
		}
	},
	Mutation:{
		add_product: async (_, args, context) => {
			try{
				let { admin } = jwt.verify(context.token,"Tommy")
				if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")

				const { createReadStream, filename, mimetype, encoding } = await args.picture
				const stream = createReadStream()
			  	let as = filename.replace(/\s/g,'')
				const fileAddress = path.join(process.cwd(), 'files/images', as)
				const out = fs.createWriteStream(fileAddress)
				stream.pipe(out)
				let mimetype1 = mimetype.split('/')
				if(!(mimetype1[1] == 'png' || mimetype1[1] == 'jpg' ||  mimetype1[1] == 'jpeg')) throw new Error('Vaqat rasm yuklasa boladi!!!')

				args.picture = pi+"/images/"+as
				const [ product ] = await model.add_product(args)
				if(product){
					return {
						status: "Xozircha status yoq!!!",
						message: "Product qoshildi!!!",
						data: product,
					}
				}
				else throw new Error("Product qoshilvotgandan hatolik bor!!")
			} catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		},
		edit_product: async (_,args, context) =>{
			try{
				let { admin } = jwt.verify(context.token,"Tommy")
				if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")

				if(args.picture){
					const { createReadStream, filename, mimetype, encoding } = await args.picture
					const stream = createReadStream()
			  		let as = filename.replace(/\s/g,'')
					const fileAddress = path.join(process.cwd(), 'files/images', as)
					const out = fs.createWriteStream(fileAddress)
					stream.pipe(out)
					let mimetype1 = mimetype.split('/')
					if(!(mimetype1[1] == 'png' || mimetype1[1] == 'jpg' ||  mimetype1[1] == 'jpeg')) throw new Error('Vaqat rasm yuklasa boladi!!!')

					args.picture = pi+"/images/"+as
				}
				const [ product ] = await model.edit_product(args)
				if(product){
					return {
						status: 200,
						message: "Product Ozgartirildi!!!",
						data: product
					}
				}			
			}catch(e){
				return {
					status: "Xozircha status yoq!!!",
					message: e.message
				}
			}
		},
		delete_product: async (_,args,context) =>{
			try{
				let { admin } = jwt.verify(context.token,"Tommy")
				if(!(admin == 'tommy')) throw new Error("Token key invalid!!!")
				const [ product ] = await model.delete_product(args)
				if(product){
					return {
						status: 200,
						message: "Product ochirildi!!!",
						data: product
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