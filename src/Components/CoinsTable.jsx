import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api'
import { CryptoState } from '../CryptoContext'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CoinsTable() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const navigate = useNavigate()


  const { currency, symbol } = CryptoState()

  const fetchCoins = async () => {
    setLoading(true)

    const { data } = await axios.get(CoinList(currency))

    setCoins(data)
    setLoading(false)
  }

  console.log(coins);

  useEffect(() => {
    fetchCoins()
  }, [currency])


  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  })


  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
  }


  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, textTransform: "uppercase" }}
        >
          Crypto Currency by Market Cap!
        </Typography>

        <TextField
          label="Search For a Crytpo Currency"
          variant="outlined"
          InputLabelProps={{
            style: { color: "orange" }, // Default label color
          }}
          sx={{
            marginBottom: 2,
            width: "100%",
            input: {
              color: "white",  // Text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "orange", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "blue", // Border color when hovered
              },
              "&.Mui-focused fieldset": {
                borderColor: "orange", // Border color when focused
              },
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>


        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {
                  ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell style={{ color: "black", fontWeight: "700" }}
                      key={head}
                      align={head === 'coin' ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}  // Use navigate
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        scope='row'
                        style={{
                          display: "flex",
                          gap: 15
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }} />

                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ textTransform: "uppercase", fontSize: "22" }}>{row.symbol}</span>
                          <span style={{ color: "darkgray" }}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell
                        align='right'
                        style={{ color: "white" }}
                      >
                        {symbol}{" "}
                        {row?.current_price?.toLocaleString()}

                      </TableCell>

                      <TableCell
                        align='right'
                        style={{
                          color: profit > 0 ? "rgb(14,230,129)" : "red",
                          fontWeight: 500
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell
                        align='right'
                        style={{ color: "white" }}
                      >
                        {symbol}{" "}
                        {row.market_cap.toLocaleString().slice(0, -6)} M
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          }
        </TableContainer>

          <Pagination
            style={{
              padding:20,
              width:"100%",
              display:"flex",
              justifyContent:"center",
            }}
            count={(handleSearch()?.length/10).toFixed(0)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",  // Text color of the page numbers
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "orange",  // Selected page background color
                color: "white",  // Selected page text color
              },
              "& .MuiPaginationItem-page:hover": {
                backgroundColor: "blue",  // Hover background color
                color: "white",  // Hover text color
              }
            }}
            onChange={(_, val)=>{
              setPage(val)
              window.scroll(0, 500)
            }}
          />

      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
