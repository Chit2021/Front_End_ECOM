// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select
// } from '@mui/material'
// import React from 'react'

// import useAppSelector from '../hooks/useAppSelector';
// import { AppState } from '../redux/store';

// interface CategoriesFormControlProps {
//   selectValue: number | string;
//   onItemChange: (params?: any) => void;
// }

// const CategoryCard = ({selectValue, onItemChange}: CategoriesFormControlProps) => {

//   const {categories, loading, error} = useAppSelector((state: AppState) => state.categoriesReducer);

//   return (
//     <FormControl fullWidth>
//       <InputLabel id="form-select-category-label">Categories</InputLabel>
//       <Select
//         labelId="form-select-category-label"
//         id="form-select-category"
//         value={selectValue}
//         label="Categories"
//         onChange={onItemChange}
//         disabled={!!loading && !!error}
//       >
//         {categories.map((category) =>
//           (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
//         )}
//       </Select>
//     </FormControl>
//   )
// }

// export default CategoryCard


import { Link as RouterLink } from 'react-router-dom'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material"

import Category from "../types/Category"

type Props = {
  category : Category
}

const CategoryCard = ( { category } : Props ) => {

  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea component={RouterLink} to={`/products/category/${category.id}`}>
          <CardContent>
            <CardMedia component="img" image={category.image}/>
            <Box sx={{textAlign: 'center'}}>
              <Typography>{category.name}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
export default CategoryCard