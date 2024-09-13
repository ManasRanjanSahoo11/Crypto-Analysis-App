import { AppBar, Container, Toolbar, Typography, Select, MenuItem, styled, createTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import CryptoContext, {CryptoState} from '../CryptoContext.jsx'

const Root = styled("div")(() => ({
    flex: 1,
    color: "gold",
    cursor: "pointer"
}))

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        mode: "dark"
    }
})


const Header = () => {
    const {currency, setCurrency} = CryptoState();
    // console.log(currency);
    

    const handleChange = (e) => {
        setCurrency(e.target.value)
    }

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="transparent">
                <Container>
                    <Toolbar>
                        <Root>
                            <Typography style={{ fontSize: "25px", fontWeight: "bold" }} onClick={() => navigate('/')}>CRYPTO</Typography>
                        </Root>

                        <Select value={currency} onChange={handleChange} variant="outlined" style={{ width: "100px", height: "40px", marginLeft: "20px" }}>
                            <MenuItem value={'USD'} >USD</MenuItem>
                            <MenuItem value={'INR'} >INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header