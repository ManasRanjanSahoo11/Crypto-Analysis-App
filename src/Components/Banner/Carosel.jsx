import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../Config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";


const Carosel = () => {
    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    // Fixed the items array by returning the JSX inside the map function
    const items = trending.map((coin) => {

        return (
            <Link to={`/coins/${coin.id}`} key={coin.id} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white", 
              }}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ margin: "0 10px" }}
                />
                <span>{coin.symbol}
                    &nbsp;
                    <span>
                        {coin?.price_change_percentage_24h > 0 && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize:22, fontWeight:500}}>
                    {symbol}  {coin?.current_price?.toLocaleString()}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <Box
            sx={{
                height: "0%",
                display: "flex",
                paddingTop: 10,
                alignItems: "center",
                width: "100%"
            }}
        >
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                autoPlay
                responsive={responsive}
                items={items}
            />
        </Box>
    );
};

export default Carosel;
