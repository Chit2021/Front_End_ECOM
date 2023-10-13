import { AppState } from "../store"

const getFilteredProduct = (state:AppState, search?:string)=>{
    return  state.productReducer.products.filter(p=>p.title.toLowerCase().includes(search?.toLowerCase() || ''))
}
export default getFilteredProduct