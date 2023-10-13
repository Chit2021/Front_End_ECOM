import Product from "../../types/Product";
import categoriesData from "./categoriesData";

export const productsData: Product[]=[
    {
        id:1,
        title: "Frozen whites",
        price: 39,
        category: categoriesData[1],
        images:[],
        description: "Zapatos Blancos",
        
      },
      {
        id: 2,
        title: "Frozen A",
        price: 2,
        category: categoriesData[2],
        images:[],
        description: "Pantalon  4",
        
      },
      {
        id: 3,
        title: "Frozen",
        price: 29,
        category: categoriesData[3],
        images:[],
        description: "Pantalon",
        
      }
]