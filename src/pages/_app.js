import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ColorModeContext from '../context/ColorModeContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import Head from '../components/Head'
import MenuAppBar from '../containers/custom-header'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'

const StyledGrid = styled.div`
  margin: 5px 10px;
`
/**
 * 共通フレーム
 */
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head title={''} />
      <MenuAppBar />
      <StyledGrid container direction="row" justifyContent="center" margin="10px">
        <Grid item>
          <Component {...pageProps} />
        </Grid>
      </StyledGrid>
    </>
  )
}

export default App
