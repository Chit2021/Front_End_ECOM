
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../redux/store'
//import { addOne } from '../redux/reducers/usersReducer'
import ecom from "../images/ecom.jpg"
// import Br1 from "../images/b1.png";
// import Br2 from "../images/b1.png";

import HeroSection from '../components/HeroSection'
import CategoryCard from '../components/CategoryCard'
import useAppSelector from '../hooks/useAppSelector'
import { Box, Button, Grid, Typography } from '@mui/material'
import StyledImage from '../styles/StyledImage'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand';


const HomePage = () => {
 const products = useSelector((state:AppState)=> state.productReducer)
 const users = useSelector((state:AppState)=> state.usersReducer)
 const dispatch = useDispatch()

 const categories = useAppSelector(state => state.categoriesReducer.categories)
 const onAddNewUser=()=>{
  // dispatch(addOne({
  //   id:'aaaa',
  //   name:'chi',
  // }))
 }
 console.log("users:", users)
 console.log('Print products from homepage',products)
//  const brands = [
//   Br1,
//   Br2
// ];

  return (
    <div>
    <HeroSection/>
    {/* <CategoryCard/> */}
    {/* <Box> */}
        {/* <Typography variant="h4">Shop by category</Typography>
        <Grid container spacing={4}>
          {categories && 
            categories.map(c => c.image === "https://placeimg.com/640/480/any" ? null : <CategoryCard category={c} key={c.id}/>)
          }
        </Grid> */}
      {/* </Box> */}
     {/* <CategoryCard/> */}
    
      {/* <button onClick={onAddNewUser}>Add New User</button> */}
      
      <Box sx={{
        pt: '2em',
        pb: '2em',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: "1em",
        backgroundColor: '#AFDAFC',
        borderRadius: '0.3em'
      }}>

        <Box sx={{
          maxWidth: "40%",
        }}>
          <Typography
            variant="h5"
            color='primary'
            gutterBottom
          >
            Still not our client?
          </Typography>
          <Typography
            align="left"
            gutterBottom
          >
            Register now to get 20% off your frst order and explore the ocean of our promotions!
          </Typography>
          <Button
            variant="contained"
            aria-label="register"
            size="medium"
            component={Link} to={`/register`}
          >
            I'm in!
          </Button>
        </Box>

        {/* <StyledImage link={ecom}/> */}
      </Box>
      {/* <Box padding={"4rem 2rem"}>
        <Typography variant="h4" padding={"2rem 0rem"}>
          Shop By Brand
        </Typography>
        <Grid container spacing={3} columns={12}>
          {brands.map((brand, index) => {
            return <Brand key={index} brand={brand} index={index} />;
          })}
        </Grid>
      </Box> */}

    </div>

    
  )
}
export default HomePage