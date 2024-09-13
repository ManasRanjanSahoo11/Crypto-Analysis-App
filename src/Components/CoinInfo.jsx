import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../Config/api'
import { Box, CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { Line } from 'react-chartjs-2'

function CoinInfo({ coin }) {

    console.log(coin.id);
    
    
    const [historicalData, setHistoricalData] = useState()
    const [days, setDays] = useState(1)

    const { currency, symbol } = CryptoState()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

        setHistoricalData(data.prices)
    }

    useEffect(()=>{
        fetchHistoricalData()
    }, [currency, days])


    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })

    return (
       <ThemeProvider theme={darkTheme}>
        <Box sx={{
            width:"70%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            marginTop:3,
            padding:35
        }}>
            {
                !historicalData ? (
                    <CircularProgress 
                    style={{color:"gold"}}
                    size={250}
                    thickness={1}
                    />
                ) : (
                    <>
                        <Line 
                         data={{
                            labels: historicalData.map((coin)=>{
                                let date = new Date(coin[0]);
                                let time = date.getHours() > 12 
                                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                                    : `${date.getHours()} : ${date.getMinutes()} AM`

                            return days === 1 ? time : date.toLocaleDateString()
                            }), 

                            datasets : [
                                {
                                data:historicalData.map((coin) => coin[1]),
                                label:`Price (Past ${days} Days) In ${currency}`,
                                borderColor:"#EEBC1D"
                                }
                            ]
                         }}
                         options={{
                            elements:{
                                point:{
                                    radius:1
                                }
                            }
                         }}
                        />
                    </>
                )
            }
        </Box>
       </ThemeProvider>
    )
}

export default CoinInfo
