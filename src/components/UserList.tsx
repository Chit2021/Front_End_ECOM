import React, { ReactElement, useEffect } from "react";


import {
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Box,
    Avatar,
    Typography,
    Button,
} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import User from "../types/User";
import { deleteUserAsync, fetchUsersAsync } from "../redux/reducers/usersReducer";

const UserControl = () => {
    const allUsers = useAppSelector((state) => state.usersReducer.users);
    const dispatch = useAppDispatch();

    const handleGetAllUsers = () => {
        dispatch(fetchUsersAsync());
    };

    const deleteUser = (id: number) => {
        dispatch(deleteUserAsync(id));
        // toast.success(`Empty cart successfully`);
    };

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    return (
        <TableContainer>
            <Table sx={{ maxWidth: "65%", margin: "50px auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Avtar</TableCell>
                        <TableCell>User name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {allUsers.map(
                        (user: User): ReactElement<HTMLTableRowElement> => {
                            return (
                                <TableRow
                                    key={user.id}
                                    component="th"
                                    scope="row"
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                        <Avatar src={user.avatar} />
                                        </Box>
                                    </TableCell>
                                    <TableCell> 
                                        <Typography>{user.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.email}</Typography>
                                    </TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button>Update</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => deleteUser(user.id)}>DElete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserControl;