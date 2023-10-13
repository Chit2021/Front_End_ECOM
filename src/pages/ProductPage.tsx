import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import useAppDispatch from '../hooks/useAppDispatch';

import Product from '../types/Product';
import { getOneProduct } from '../redux/reducers/productsReducer';

const ProductPage = () => {
  const [ product , setProduct ] = useState<Product>();
  const dispatch = useAppDispatch();
  const params = useParams();
  const productId = Number(params.id);
  const navigate = useNavigate();

  const handleBack =()=>{
    navigate(`/products-page`);
  }

   useEffect(() => {
    const fetchData = dispatch(getOneProduct(productId))
    fetchData.then((data: any) => {
      setProduct(data.payload)
    })
  }, [dispatch, productId, product])

  // const handleAddToCartClick = () => {
  //   const debounceDelay = 500;
  //   dispatch(
  //     addToCart({
  //       id: product?.id,
  //       title: product?.title,
  //       price: product?.price,
  //       quantity: 1,
  //     })
  //   );
  //   setTimeout(() => debounceDelay);
  // };
 
  const cardStyle = {
    maxWidth: 500,
    height: "100%",
    // display: 'flex', 
    flexDirection: 'column', 
    align: 'center' 
  };

  return (
    <Card sx={cardStyle} >
      <CardMedia
        sx={{ height: 150 }}
        image={product?.images[0]}
        title="images"
      />
      <CardContent sx={{ height: 300}}>
        <Typography gutterBottom variant="h5" component="div">
          {product?.title}
        </Typography>
        <Typography gutterBottom  component="div">
        {product?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: €{product?.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ height: 10 }}>
         <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
      </CardActions>
    </Card>
  );
}


export default ProductPage
