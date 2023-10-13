import { useEffect, useState } from 'react'

import { addOne, fetchAllProductAsync, /*removeProduct*/sortByPrice } from '../redux/reducers/productsReducer'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import getFiltered from '../redux/selectors/getFiltered'
//import CartItem from '../types/CartItem'
import { addToCart } from '../redux/reducers/cartReducer'
import Product from '../types/Product'

//import { CreateProduct } from './CreateProduct'

//import Typography from '@mui/material/Typography'
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { usePagination } from '../hooks/usePagination'
import Pagination from '../components/Pagination'

 const ProductsPage = () => {
    const [search, setSearch] = useState<string | undefined>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();


    const filteredProducts = useAppSelector((state) => getFiltered(state, search))

    const { products, error } = useAppSelector(
      (state) => state.productReducer
    );
    const { currentPage, pageLimit, currentProducts, setPage } = usePagination(
      products,
      20
    );
    
    useEffect(() => {
        dispatch(fetchAllProductAsync({ offset: 0, limit: 50 }))
    }, [])

    useEffect(() => {
        if (search) {
          
        }
    }, [search])

    const onSortAsc = () => {
        dispatch(sortByPrice('asc'))
    }

    const onSortDsc= () => {
      dispatch(sortByPrice('desc'))
  }


    const onAddToCart = (payload : Product)=> {
        dispatch(addToCart(payload))
    }

    const handleDetail = (id: number) => {
        navigate(`/products/${id}`);
      }

    // const deleteProduct = (payload : Product)=> {
    //     dispatch(removeProduct())
    // }

    const onAddNew = () => {
        dispatch(addOne({
            id:6,
            price: 50,
            title: 'Sneakers',
            description: 'Soft',
            images:[],
            category:{
                id: 1,
                name: "str",
                image: "string"
            }
        }))
     }
     return (
    //     <div>
    //     <CreateProduct/>
    //      <button onClick={onAddNew}>Add new product</button>
    //     <button onClick={onSortAsc}>Sort ASC</button>
    //      <input 
    //      type="text" 
    //      placeholder='Search for product by title' 
    //      value={search} 
    //      onChange={(e) => setSearch(e.target.value)} 
    //      />
    //      {filteredProducts.map(p => (
    //         <div key={p.id}>
    //             <Typography>{p.title}</Typography> 
    //             <Typography> {p.price}</Typography> 
               
    //             <button onClick={()=> onAddToCart(p)}>Add to Cart</button>
    //             {/* <button>Delete Product</button> */}
    //         </div>
    //     ))}
    //  </div>//original
       <Grid>
       <Button onClick={onSortAsc}>Sort Low-to-High Price</Button>
       <Button onClick={onSortDsc}>Sort High-to-Low Price</Button>
       
          <Grid container spacing={3}>
             {filteredProducts.map(p => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="250"
                      image={p.images[0]}
                      alt={p.title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: "0.5rem",
                      }}
                    />
                      <CardContent>
                          <Typography variant="h4" component="div">
                            {p.title}
                          </Typography>
                          <Typography component="div">
                            {p.description}
                          </Typography>
                          <Typography variant="h6" color="textSecondary">
                            Price: €{p.price}
                          </Typography>
                          <Button variant="contained" color="primary" onClick={() => handleDetail(p.id)}>View Details</Button>
                          <Button variant="contained" color="primary" onClick={()=> onAddToCart(p)}>Add to Cart</Button>
                       </CardContent>
                   </Card>
               </Grid>
              
           ))}
       </Grid>
       <Pagination
          count={pageLimit}
          currentPage={currentPage}
          setPage={setPage}
        />
      </Grid>           
     )
 }

export default ProductsPage