import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { productsData } from '../data/productsData'
import CreateProductInput from '../../types/CreateProductInput'
import categoriesData from '../data/categoriesData'
import Product from '../../types/Product'

export const handlers = [
   
    rest.delete("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
        console.log("catch the request")
        return res(
            ctx.json(true)
        )
        // const { id } = req.params
        // if (productsData.find(p => p.id == Number(id))) {
        //     return res(
        //         ctx.json(true)
        //     )
        // } else {
        //     return res(
        //         ctx.json(false)
        //     )
        // }
    }),

    // rest.post("https://api.escuelajs.co/api/v1/products",async(req,res,ctx)=>{
    //     const input:CreateProductInput = await req.json()  
    //     console.log(input) 
    //     const category = categoriesData.find(c => c.id === input.categoryId)
    //     if (category) {
    //         const newProduct: Product = {
    //             id: productsData.length + 1,
    //             images: input.images,
    //             title: input.title,
    //             description: input.description,
    //             category,
    //             price: input.price
    //         }
    //         return res(ctx.json(newProduct))
    //     } else {
    //         console.log('product cannot be created')
    //         ctx.status(400)
    //         ctx.json({
    //             message: [
    //                 "price must be a positive number",
    //                 "images must contain at least 1 elements",
    //                 "each value in images must be a URL address",
    //                 "images must be an array"
    //             ],
    //             error: "Bad Request",
    //             statusCode: 400
    //         })
    //     }

    // return res(ctx.json(true))
    // }),

    rest.put("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
        const update = await req.json()
        const { id } = req.params
        console.log('catch put(update) request...', update, id)
    })
]

const server = setupServer(...handlers)

export default server