import { Container, Grid, Paper, Typography } from "@mui/material";

export default function ContactPage() {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Email: online_shop@email.com</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Phone: +44 123456345</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Address: 123 Magic Road, Magic City, Magic Country
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}