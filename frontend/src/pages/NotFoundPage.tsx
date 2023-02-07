import {useNavigate} from "react-router-dom";
import {Button, Container, Typography} from "@mui/material";
import NavBar from "../components/NavBar";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function NotFoundPage() {

    const[user] = useAuth()
    const navigate = useNavigate();
    return (
        <>
            <NavBar user={user}/>
            <Container sx={{pt: 6}}>
                <Container maxWidth="sm">
                    <Typography variant="h2">404</Typography>
                    <Typography variant="h6">this Page is not exist...</Typography>
                    <Button variant={"contained"} sx={{mt: 2}} onClick={() => navigate("/")}>&rarr; &nbsp; To
                        Home</Button>
                </Container>
            </Container>
        </>
    )
}