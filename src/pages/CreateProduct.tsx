import {
    Alert,
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogTitle,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    IconButton,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import SendIcon from "@mui/icons-material/Send";
  import CancelIcon from "@mui/icons-material/Cancel";
  import CloseIcon from "@mui/icons-material/Close";
  import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
  
  import useAppDispatch  from "../hooks/useAppDispatch";
  import useAppSelector from "../hooks/useAppSelector";
  import CreateProductInput from "../types/CreateProductInput";
  import { createProductAsync } from "../redux/reducers/productsReducer";
  
  export const CreateProduct = () => {
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [categoryId, setCategoryId] = React.useState<number>(1);
    const [price, setPrice] = React.useState(0);
    const [showMessage, setShowMessage] = React.useState(false);
   const [product, setProduct] = React.useState<CreateProductInput>();
    const [image, setImage] = React.useState("");
  
    const dispatch = useAppDispatch();
    const categories = useAppSelector(
      (state) => state.categoriesReducer.categories
    );
  
    const { products, error } = useAppSelector((state) => state.productReducer);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const onCloseAlert = () => {
      setOpenAlert(false);
    };
  
    const saveChanges = () => {
      const product: CreateProductInput = {
        title: title,
        description: desc,
        price: price,
        categoryId: categoryId,
        images: [image],
      };
  
      setProduct(product);
    };
  
    useEffect(() => {
      if (product) {
        dispatch(createProductAsync(product));
        setOpen(false);
      }
    }, [products]);
  
    const categoryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const id = event.target.value;
      setCategoryId(+id);
    };
    
    return (
      <main>
        <Box sx={{ marginTop: "5px" }}>
          {/* <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            color="primary"
            onClick={handleClickOpen}
          >
            Add Product
          </Button> */}
          {/* <Dialog open={open} fullWidth> */}
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              padding="2em"
            >
              <DialogTitle>Create New Product</DialogTitle>
              <TextField
                id="title"
                label="Title"
                variant="filled"
                onChange={(e) => setTitle(e.target.value)}
              />
  
              <TextField
                id="desc"
                label="Description"
                multiline
                maxRows={4}
                variant="filled"
                onChange={(e) => setDesc(e.target.value)}
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="select-category"
                label="Category"
                select
                variant="filled"
                value={categoryId}
                onChange={categoryHandleChange}
                sx={{ marginTop: "20px" }}
              >
                {categories?.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="price"
                label="Price"
                variant="filled"
                onChange={(e) => setPrice(+e.target.value)}
                sx={{ marginTop: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
              />
              <TextField
                id="image"
                label="Image Url"
                variant="filled"
                onChange={(e) => setImage(e.target.value)}
                sx={{ marginTop: "20px" }}
              />
            </Box>
            {/* <DialogActions> */}
              <Button
                variant="contained"
                endIcon={<CancelIcon />}
                onClick={handleClose}
                color="error"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={saveChanges}
              >
                Save
              </Button>
            {/* </DialogActions> */}
          {/* </Dialog> */}
        </Box>
        <Box>
          {error && showMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Collapse in={openAlert}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        onCloseAlert();
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Product is not created <br /> because {error}
                </Alert>
              </Collapse>
            </Stack>
          )}
          {products && showMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Collapse in={openAlert}>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        onCloseAlert();
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Product has been updated successfully
                </Alert>
              </Collapse>
            </Stack>
          )}
        </Box>
      </main>
    );
  };