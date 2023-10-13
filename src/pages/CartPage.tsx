import React from 'react'
//import {current} from 'immer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, CardMedia } from '@mui/material';
import { IconButton } from '@mui/material';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

import Product from '../types/Product';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector'
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '../redux/reducers/cartReducer';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
    const cart = useAppSelector(state => state.cartReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    
    const totalItems = cart.reduce((prev, current)=> prev + current.quantity,0)
    const totalAmount = cart.reduce((prev, current)=> prev + current.quantity*current.price ,0)

    const handleProceed = () => {
        navigate("/address")
    }

    const onClick_increaseQuantity = (id: number)=> {
        dispatch(increaseQuantity(id))
        // toast(`Quantity of item increased..`);
        alert(`Quantity of item increased..`);
    }

    const onClick_decreaseQuantity = (id: number)=> {
        dispatch(decreaseQuantity(id))
        // toast(`Removed item from cart`, {
        //     icon: "❌",
        // });
        alert(`Quantity of item decreased..`);
    }

    const deleteProduct = (id: number) => {
        dispatch(deleteFromCart(id));
        toast.success(`Empty cart successfully`);
    }

    const handleBack =()=>{
      navigate(`/products-page`);
    }
  

  return (
   
<Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
    {cart && cart.map(item => (
        <Card key={item.id} sx={{ marginBottom: 2 }}>
            <CardMedia
                component="img"
                height="250"
                image={item.images[0]}
                alt={item.title}
                style={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "0.5rem",
                }}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Name of Item: {item.title}</Typography>
                    <Typography variant="h6">{item.price} Euro</Typography>
                    {/* <img src={item.images[0]} alt={item.title} /> */}
                </Box>
                <Box display="flex" alignItems="center" marginTop={2}>
                    <IconButton color="primary" onClick={() => {onClick_decreaseQuantity(item.id)}}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ margin: '0 15px' }}>Quantity: {item.quantity}</Typography>
                    <IconButton color="primary" onClick={() => {onClick_increaseQuantity(item.id) }}>
                        <AddIcon />
                    </IconButton>
                    {/* <ToastContainer /> */}
                    <Typography sx={{ marginLeft: 'auto' }}>
                        Total Price for {item.quantity} item: {item.price * item.quantity} €
                    </Typography>
                    <IconButton edge="end" onClick={() => {deleteProduct(item.id)}}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    ))}
    <Divider sx={{ my: 3 }} />
    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h6">Total Items in Cart: {totalItems}</Typography>
        <Typography variant="h6">Total Amount: {totalAmount} Euro</Typography>
    </Box>
    <Button variant="contained" color="primary" onClick={handleProceed} fullWidth>
        Proceed
    </Button>
    <Button variant="contained" color="primary" fullWidth onClick={handleBack}>
        Back
    </Button>
</Box>
  )
}
