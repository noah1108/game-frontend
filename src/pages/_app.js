import '../styles/globals.css'
import Head from 'next/head'
import MenuAppBar from '../containers/custom-header'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

const StyledGrid = styled.div`
  margin: 5px 10px;
`
/**
 * 共通フレーム
 */
const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Head />
      {/* <MenuAppBar /> */}
      <StyledGrid container direction="row" justifyContent="center" margin="10px">
        <Grid item>
          <Component {...pageProps} />
        </Grid>
      </StyledGrid>
    </div>
  )
}

export default App
