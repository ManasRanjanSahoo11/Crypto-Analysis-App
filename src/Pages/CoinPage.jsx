import axios from "axios";
import ReactHtmlParser from 'html-react-parser';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";
import { Typography, Box } from "@mui/material";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
    }, [currency]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, alignItems: 'center' }}>
            {/* Sidebar */}
            <Box sx={{  width: { md: '30%', xs: '100%' }, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        mt: 3, 
                        borderRight: { md: '2px solid gold', xs: 'none' } }}>
                <img 
                    src={coin?.image.large} 
                    alt={coin?.name} 
                    height="200" 
                    style={{ marginBottom: "20px" }} 
                />
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'justify', p: 2 }}>
                    {ReactHtmlParser(coin?.description?.en?.split(". ")[0] || '')}
                </Typography>
                <Box>
                    <Box sx={{ display: "flex", mb: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight:"bold" }}>Rank:</Typography>
                        <Typography variant="h5" sx={{ ml: 1 }}>
                         {coin?.market_cap_rank}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight:"bold" }}>Current Price:</Typography>
                        <Typography variant="h5" sx={{ ml: 1 }}>
                            {symbol}{" "}
                            {coin?.market_data?.current_price[currency.toLowerCase()]?.toLocaleString('en-US')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="h5" sx={{ fontWeight:"bold" }}>Market Cap: {" "}</Typography>
                        <Typography variant="h5" sx={{ ml: 1}}>
                            {symbol}{" "}
                            {coin?.market_data?.market_cap[currency.toLowerCase()]?.toLocaleString('en-US', { maximumFractionDigits: 0 })?.slice(0, -6)} M
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* Chart */}
            <CoinInfo coin={coin} />
        </Box>
    );
};

export default CoinPage;
