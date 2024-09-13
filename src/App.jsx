import { useState } from 'react'
import { styled } from '@mui/material/styles';
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import CoinPage from './Pages/CoinPage'

function App() {

  const Root = styled('div')(({ theme }) => ({
    backgroundColor : "#14161a",
    color:"white",
    minHeight:'100vh'
  }));

  return (
    <BrowserRouter>
      <Root>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </Root>
    </BrowserRouter>
  )
}

export default App