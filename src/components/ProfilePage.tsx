import {FormEvent, useState} from "react";
import useAppSelector from "../hooks/useAppSelector";

import React from 'react'
import usersReducer, { loginUserAsync } from "../redux/reducers/usersReducer";
import useAppDispatch from "../hooks/useAppDispatch";

export const ProfilePage = () => {
 //const currentUser = useAppSelector(state =>usersReducer.currentUser)
  const dispatch = useAppDispatch()
  const [email,setEmail] = useState("")
  const [password ,setPassword]= useState("")

  const onLogin = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  dispatch(loginUserAsync({email,password}))
  }

  return (
    <div>ProfilePage
      <form onSubmit={onLogin}>
        <input type="email" value={email} onChange ={(e)=>setEmail(e.target.value)}></input>
        <input type="password" value={password} onChange ={(e)=>setPassword(e.target.value)}></input>
      <button>submit</button>
      </form>
      {/* {
      //  currentUser && (
          <div>
            <h2>Current Login User</h2>
            <p>{currentUser.email}</p>
          </div>
        )
      } */}
    </div>
  )
}




// import {
//     Button,
//     Card,
//     CardActionArea,
//     CardActions,
//     CardContent,
//     CardMedia,
//     Typography,
//     //useTheme,
//   } from "@mui/material";
//   import { useState } from "react";
  
//   //import ModalText from "../modalText/ModalText";
//   //import UptadeProfileInfo from "../uptadeProfileInfo";
//   //import { Colors } from "../../styles";
//   import useAppSelector from "../hooks/useAppSelector";
//   //import { getRole, getUserData } from "../../redux/user/userSelectors";

//   export const Colors = {
//     backColor: "#F7F5ED",
//     white: "#fff",
//     boxShadowInput: "rgba(0,0,0,.1)",
//     borderButton: "#eaeaea",
//     black: "#45423E",
//     logoColor: "#e3893f",
//     blue: "#7697f9",
//     danger: "#d86f18",
//     secondaryColor: "#CB8D44",
//     hoverColor: "#a77030",
//     bgFooter: "#72716f",
//     orange: "#D3A863",
//     blackMode: "#141A1F",
//     borderRight: "#100b0b"
//   };
  
//   const ProfilePage = () => {
//     const [openModal, setOpenModal] = useState(false);
//    // const theme = useTheme();
//    // const role = useAppSelector(getRole);
//    // const user = useAppSelector(getUserData);
//    // const { name, email, avatar, password } = user || {};
//     //const maskedPassword = password ? "*".repeat(password.length) : "";
  
//     const onCloseModal = () => {
//       setOpenModal(false);
//     };
  
//     return (
//       <>
//         <Card
//           sx={{
//             maxWidth: 300,
//             margin: "90px auto 0",
//             textAlign: "center",
//             //backgroundColor: theme.palette.background.default,
//           }}
//         >
//         <CardActionArea>
//             <CardMedia/>
//                 <CardContent>
//                     <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
//                         name
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Email
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Password:
//                     </Typography>
//                 </CardContent>
//         </CardActionArea>
         
//           <CardActions>
//             {/* {role === "admin" && ( */}
//               <Button
//                 size="small"
//                 color="primary"
//                 sx={{
//                   color: Colors.secondaryColor,
//                   margin: "0 auto",
//                 }}
//                 onClick={() => {
//                   setOpenModal((prev) => !prev);
//                 }}
//               >
//                 Update_info
//               </Button>
//             {/* )} */}
//           </CardActions>
//         </Card>
//         {/* <ModalText
//           text="Choose the info"
//           openModal={openModal}
//           handleCloseModal={onCloseModal}
//         >
//           <UptadeProfileInfo handleCloseModal={onCloseModal}  />
//         </ModalText> */}
//       </>
//     );
//   };
//   export default ProfilePage;