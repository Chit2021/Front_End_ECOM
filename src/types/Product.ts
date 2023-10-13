// interface Product{
//     id:string
//     title:string
//     price:number
//     description:string
// }
// export default Product


import Category from "./Category"

interface Product{
    id:number
    //id:string
    title:string
    price:number
    description:string
    images:string[]
    category:Category
}
export default Product