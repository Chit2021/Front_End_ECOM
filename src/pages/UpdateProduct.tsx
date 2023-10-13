import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector'

// import ErrorMessage from "../../app/errors/ErrorMessage";
// import AccessDenied from "../../app/errors/AccessDenied";
import { getOneProduct, updateProductAsync } from "../redux/reducers/productsReducer";
import { AppState } from "../redux/store";
import UpdateProductInput from "../types/UpdateProductInput";
import Product from "../types/Product";
import uploadFile from "../redux/selectors/uploadFile";

export default function EditProductForm(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductInput>();

  // const { categories } = useAppSelector((state: AppState) => state.category);
  const dispatch = useAppDispatch();
  // const { currentUser } = useAppSelector((state: AppState) => state.user);
  // const { error } = useAppSelector((state: AppState) => state.product);

  useEffect(() => {
    dispatch(getOneProduct(+id!)).then((productData) => {
      if (productData.meta.requestStatus === "fulfilled") {
        const item = productData.payload as Product;
        setValue("update.title", item.title);
        setValue("update.price", item.price);
        setValue("update.description", item.description);
        setValue("update.categoryId", item.category.id);
        setValue("update.images", item.images);
        setImageUrls(item.images);
        setValue("id", item.id);
      }
    });
  }, [dispatch, id, setValue]);

  // if (currentUser && currentUser?.role.includes("customer")) {
  //   return <AccessDenied />;
  // }
  // if (!currentUser) {
  //   navigate("/login");
  // }

  const handleFormSubmit = async (data: UpdateProductInput) => {
    if (images.length) {
      let imageLocations: string[] = new Array(images.length);
      for (let i = 0; i < images.length; i++) {
        imageLocations[i] = await uploadFile(images[i]);
      }
      data.update.images = imageLocations;
    }
    const result = await dispatch(updateProductAsync(data));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product updated successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while updating product");
    }
    navigate("/product");
  };

  // if (error) return <ErrorMessage message={error} />;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Edit Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="update.title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.update?.title}
              helperText={errors.update?.title?.message}
            />
          )}
        />

        <Controller
          name="update.price"
          control={control}
          defaultValue={0}
          rules={{
            required: "Price is required",
            pattern: /^\d+(\.\d{1,2})?$/,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.update?.price}
              helperText={errors.update?.price?.message}
            />
          )}
        />
        <Controller
          name="update.description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              error={!!errors.update?.description}
              helperText={errors.update?.description?.message}
            />
          )}
        />
        {/* <Controller
          name="update.categoryId"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                {...field}
                error={!!errors.update?.categoryId}
                value={field.value || ""}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        /> */}

        <InputLabel htmlFor="images">Select Multiple Files</InputLabel>
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            style={{ width: "100px", height: "100px", margin: "10px" }}
          />
        ))}
        <Controller
          name="update.images"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              multiple
              style={{ margin: "20px 0", width: "100%" }}
              onChange={handleFileChange}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "20px", width: "20%" }}
        >
          Update
        </Button>
        <Button
          component={Link}
          to={`/product`}
          size="small"
          variant="contained"
          color="primary"
          style={{ margin: "20px", width: "20%" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import SendIcon from "@mui/icons-material/Send";
// import CancelIcon from "@mui/icons-material/Cancel";
// import DialogTitle from "@mui/material/DialogTitle";
// import CloseIcon from "@mui/icons-material/Close";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// import {
//   Alert,
//   Box,
//   Collapse,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   SelectChangeEvent,
//   Stack,
//   Tooltip,
// } from "@mui/material";
// import { useState } from "react";

// //import IProduct from "../../types/Product";
// import useAppSelector from "../hooks/useAppSelector";
// import useAppDispatch from "../hooks/useAppDispatch";

// //import { updateProductAsync } from "../../redux/products/productReducer";
// import UpdateProduct, { ProductDto } from "../types/UpdateProductInput";
// import Product from "../types/Product";
// import { updateProductAsync } from "../redux/reducers/productsReducer";

// export default function UpdateProduct({ product }: { product: Product }) {
//   const [open, setOpen] = React.useState(false);
//   const [openAlert, setOpenAlert] = React.useState(true);
//   const [title, setTitle] = React.useState(product.title);
//   const [desc, setDesc] = React.useState(product.description);
//   const [price, setPrice] = React.useState(product.price);
//   const [categoryId, setCategoryId] = React.useState(product.category.id);
//   const [updatedProduct, setUpdatedProduct] = useState<UpdateProduct>();
//   const [showMessage, setShowMessage] = useState(false);
//   // const [singleProduct, setSingleProduct] = React.useState<Product>(product);

//   const dispatch = useAppDispatch();
// //   const categories = useAppSelector(
// //     (state) => state.ProductCategoryReducer.categories
// //   );

//   const { products, error } = useAppSelector((state) => state.productReducer);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const onCloseAlert = () => {
//     setOpenAlert(false);
//     setShowMessage(false);
//   };

//   const categoryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const id = event.target.value;
//     setCategoryId(+id);
//   };

//   const saveChanges = () => {
//     const productDto: ProductDto = {
//       title: title,
//       description: desc,
//       price: price,
//       categoryId: categoryId,
//     };
//     const updateProduct: UpdateProduct = {
//       id: product.id,
//       updateProduct: productDto,
//     };
//     setUpdatedProduct(updateProduct);
//     setShowMessage(true);
//     setOpenAlert(true);
//     // if (!showMessage) {
//     //   console.log("showMessage", showMessage);

//     // }
//   };

//   React.useEffect(() => {
//     if (updatedProduct) {
//       dispatch(updateProductAsync(updatedProduct));
//     }
//     setOpen(false);
//   }, [updatedProduct]);

//   // const  show  = React.useMemo(() => {
//   //   if (updatedProduct ) {

//   //     setOpen(false);
//   //     return true;
//   //   }
//   //   return false;
//   // }, [updatedProduct]);
//   return (
//     <main>
//       <Box>
//         {/* <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
//           Update
//         </Button> */}
//         <Tooltip title="Edit">
//           <IconButton color="secondary" onClick={handleClickOpen}>
//             <ModeEditOutlineOutlinedIcon />
//           </IconButton>
//         </Tooltip>
//         <Dialog open={open} fullWidth>
//           <Box
//             component="form"
//             display="flex"
//             flexDirection="column"
//             padding="2em"
//           >
//             <DialogTitle>Update the Product</DialogTitle>
//             <TextField
//               required
//               id="title"
//               label="Title"
//               defaultValue={product.title}
//               variant="filled"
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <TextField
//               id="desc"
//               label="Description"
//               multiline
//               maxRows={4}
//               variant="filled"
//               defaultValue={product.description}
//               onChange={(e) => setDesc(e.target.value)}
//               sx={{ marginTop: "20px" }}
//             />
//             {/* <TextField
//               id="select-category"
//               select
//               variant="filled"
//               defaultValue={product.category.name}
//               value={categoryId}
//               onChange={categoryHandleChange}
//               sx={{ marginTop: "20px" }}
//             >
//               {categories.map((c) => (
//                 <MenuItem key={c.id} value={c.id}>
//                   {c.name}
//                 </MenuItem>
//               ))}
//             </TextField> */}
//             <TextField
//               id="price"
//               label="Price"
//               variant="filled"
//               defaultValue={`${product.price}`}
//               onChange={(e) => setPrice(+e.target.value)}
//               sx={{ marginTop: "20px" }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">€</InputAdornment>
//                 ),
//               }}
//             />
//             {/* <TextField
//               id="url"
//               label="Image Url"
//               multiline
//               maxRows={4}
//               variant="filled"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               sx={{ marginTop: "20px" }}
//             /> */}
//           </Box>
//           <DialogActions>
//             <Button
//               variant="contained"
//               endIcon={<CancelIcon />}
//               onClick={handleClose}
//               color="error"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               endIcon={<SendIcon />}
//               onClick={saveChanges}
//             >
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//       <Box>
//         {error && showMessage && (
//           <Stack sx={{ width: "100%" }} spacing={2}>
//             <Collapse in={openAlert}>
//               <Alert
//                 severity="error"
//                 action={
//                   <IconButton
//                     aria-label="close"
//                     color="inherit"
//                     size="small"
//                     onClick={() => {
//                       onCloseAlert();
//                     }}
//                   >
//                     <CloseIcon fontSize="inherit" />
//                   </IconButton>
//                 }
//               >
//                 Product is not Updated <br /> because {error}
//               </Alert>
//             </Collapse>
//           </Stack>
//         )}
//         {products && showMessage && (
//           <Stack sx={{ width: "100%" }} spacing={2}>
//             <Collapse in={openAlert}>
//               <Alert
//                 severity="success"
//                 action={
//                   <IconButton
//                     aria-label="close"
//                     color="inherit"
//                     size="small"
//                     onClick={() => {
//                       onCloseAlert();
//                     }}
//                   >
//                     <CloseIcon fontSize="inherit" />
//                   </IconButton>
//                 }
//               >
//                 Product has been updated successfully
//               </Alert>
//             </Collapse>
//           </Stack>
//         )}
//       </Box>
//     </main>
//   );
// }