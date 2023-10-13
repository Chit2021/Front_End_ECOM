import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Footer  from "./pages/Footer";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartPage } from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import { UserProfile } from "./components/UserProfile";
import ProductPage from "./pages/ProductPage";
import UserList from "./components/UserList";
import Address from "./components/Address";
import PaymentForm from "./components/PaymentForm";
import Contact from "./pages/Contact";
import CheckAuth from './components/CheckAuth';
import { CreateProduct } from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import useAppDispatch from "./hooks/useAppDispatch";
import { useEffect } from "react";
import { authenticateUserAsync } from "./redux/reducers/usersReducer";
import { fetchAllCategories } from "./redux/reducers/categoriesReducer";

const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      dispatch(authenticateUserAsync(jwt))
        .then(() => {
        })
        .catch((err: string) => {
          <Navigate to="/login" />
        })
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [])

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/homepage",
          element: <HomePage />,
        },
        {
          path: "/products-page",
          element: <ProductsPage/>,
        },
        {
          path: 'products/:id',
          element: <ProductPage />
        },
        // {
        //   path: "products/category/:categoryId",
        //   element: <CategoryCard/>,
        // },
        {
          path: "/userprofile",
          element: <UserProfile/>,
        },
        {
          path: 'userlist',
          element: <UserList />
        },
        {
          path: "/address",
          element: <Address/>,
        },
        {
          path: "/paymentForm",
          element: <PaymentForm/>,
        },
        {
          path: "/admin_page",
          element: <AdminPage/>,
        },
        {
          path: "/createProduct",
          element: <CreateProduct/>,
        },
        {
          path: "/updateProduct",
          element: <UpdateProduct/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/cart",
          // element: 
          // <CheckAuth>
          //   <CartPage />
          // </CheckAuth>
          element: <CartPage/>,
        },
        {
          path: "/userProfile",
          element: <UserProfile/>,
        },

        {
          path: "/contact",
          element: <Contact/>,
        },
        {
          path: "/footer",
          element: <Footer />,
          
        },  
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};
export default App;