import { Container, Box, Typography } from "@mui/material";
import React from "react";
import Carosel from "./Carosel";

const Banner = () => {
    return (
        <Box
            sx={{
                backgroundImage: "url(./banner2.jpg)",
                backgroundSize: "cover", // Ensure the background image covers the entire box
                backgroundPosition: "center",
            }}
        >
            <Container
                sx={{
                    height: 385,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}
            >
                {/* Replace div with Box */}
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        marginTop:"-6vw",
                        flexDirection: "column",
                        justifyContent: "center", // Centers vertically
                        alignItems: "center", // Centers horizontally
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold", 
                            textTransform: "uppercase",
                            fontSize: "5vw",
                        }}
                    >
                        Crypto App
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontSize: "0.9vw",
                            // textTransform: "uppercase",
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, amet!
                    </Typography>

                    <Carosel />
                </Box>
            </Container>
        </Box>
    );
};

export default Banner;
