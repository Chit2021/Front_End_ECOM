import CartItem from "../../types/CartItem";

import categoriesData from "./categoriesData";

export const cartData: CartItem[]=[
    {
        id:1,
        title: "Frozen whites",
        price: 39,
        category: categoriesData[1],
        images:[],
        description: "Zapatos Blancos",
        quantity:1
        
      },
      {
        id: 2,
        title: "Frozen A",
        price: 2,
        category: categoriesData[2],
        images:[],
        description: "Pantalon  4",
       quantity:2
      }
      // {
      //   id: 3,
      //   title: "Frozen",
      //   price: 29,
      //   category: categoriesData[3],
      //   images:[],
      //   description: "Pantalon",
      //  quantity:1
      // }
]