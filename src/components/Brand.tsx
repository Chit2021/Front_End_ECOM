import { Box, Grid } from "@mui/material";

// component props type
type BrandProps = { brand: string; index: number };

function Brand({ brand, index }: BrandProps) {
  return (
    <Grid item xs={6} sm={4} md={2}>
      <Box sx={{ cursor: "pointer", height: "168px", width: "168px" }}>
        <img
          src={brand}
          alt={`brand_img_${index}`}
          height={"100%"}
          width={"100%"}
        />
      </Box>
    </Grid>
  );
}

export default Brand;