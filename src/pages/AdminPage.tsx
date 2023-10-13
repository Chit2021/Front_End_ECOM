import { useEffect, useState } from 'react'

import { addOne, deleteProductAsync, fetchAllProductAsync, /*removeProduct*/sortByPrice, updateProductAsync } from '../redux/reducers/productsReducer'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import getFiltered from '../redux/selectors/getFiltered'

import Product from '../types/Product'
import { Link, useNavigate } from 'react-router-dom'
import { CreateProduct } from './CreateProduct'
import Typography from '@mui/material/Typography'
//import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button'
import { Box, CardContent, CardMedia, Divider, TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Card } from '@mui/material'
import UserList from '../components/UserList'

 const AdminPage = () => {
    const [search, setSearch] = useState<string | undefined>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const filteredProducts = useAppSelector((state) => getFiltered(state, search))
    const cart = useAppSelector(state => state.cartReducer)  //to count number of item in cart

    useEffect(() => {
        dispatch(fetchAllProductAsync({ offset: 0, limit: 50}))
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
  
    const deleteProduct = (id:number)=> {
        dispatch(deleteProductAsync(id))
    }

    // const updateProduct = (id:number,update:) => {
    //     dispatch(updateProductAsync(id))
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
        alert("Dummy Product added")
        // dispatch(addOneProduct)
     }
     const handleUpdate = (id: number) => {
        // navigate(`/products/${id}`);
        // dispatch(updateProductAsync(id))
        navigate("/updateProduct");
      }

      const handleUserList = () =>{
        navigate("/userlist")
      }

     const handleAddNew = ()=>{
        navigate("/createProduct")
     }
     return (
    //     <div>
    //     <CreateProduct/>
    //     <Button onClick={onAddNew}>Add new product</Button>
    //     <Button onClick={onSortAsc}>Sort ASC</Button>
        
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
    //             <Typography> {p.description}</Typography> 
               
    //             <Button>Update</Button>
    //             <Button>Delete</Button>
    //             {/* <button>Delete Product</button> */}
    //         </div>
    //     ))}
    //  </div>

    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: 2 }}>
    
    <Grid container spacing={2} alignItems="center" marginBottom={2}>
        <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" onClick={onAddNew}>
                Add new dummy product
            </Button>
        </Grid>
        <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" onClick={handleAddNew}>
                Add new product
            </Button>
        </Grid>
        <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={onSortAsc}>
                Sort By Price Asc
            </Button>
        </Grid>
        <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={onSortDsc}>
                Sort By Price Desc
            </Button>
        </Grid>
        
        <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={handleUserList}>
                Users List
            </Button>
        </Grid>
        <Grid item xs={12} md={4}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for product by title"
                value={search}
                onChange={(e:any) => setSearch(e.target.value)}
            />
        </Grid>
    </Grid>

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
                            Price: {p.price} Euro
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => handleUpdate(p.id)}>
                                    Update
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => {deleteProduct(p.id)}}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
              
        ))}
    </Grid>
</Box>        
)}

export default AdminPage