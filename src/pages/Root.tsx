import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../pages/Footer";
import  Header from "../pages/Header";

import Login from "../pages/Login";
import ProductsPage from "./ProductsPage";
import Register from "./Register";
import HomePage from "./HomePage";

// const Root = () => {
//   return (
//     <StyledEngineProvider injectFirst>
//       <header>
//         <Header />
//       </header>

//       <main>
//         {/* <Outlet /> */}
//         {/* <Layout/> */}
//         {/* <LoginPage/> */}
//         <Login/>
//         <Register/>
//         <br />
//         <HomePage/>
//         <ProductsPage/>
//       </main>

//       <footer>
//         <Footer />
//       </footer>
//     </StyledEngineProvider>
//   );
// };
// export default Root;

const Root = () => {
  return (
    <StyledEngineProvider injectFirst>
        <Header />
        <Outlet />
        <Footer />
    </StyledEngineProvider>
  );
};
export default Root;