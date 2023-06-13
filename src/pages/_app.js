import '../styles/globals.css'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import { createContext, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'

const StyledGrid = styled.div`
  margin: 5px 10px;
`

// Socket.ioサーバ接続情報
const ENDPOINT = 'http://192.168.0.105:7000'
export const SocketContext = createContext()

/**
 * 共通フレーム
 */
const App = ({ Component, pageProps }) => {
  const [socket, setSocket] = useState()

  // 初回読み込み時、ソケット接続試行
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT)
    setSocket(newSocket)
    // CLEAN UP THE EFFECT
    return () => newSocket.disconnect()
  }, [])

  return (
    //  {/* Provider 経由でステートをバインドする */}
    <SocketContext.Provider value={[socket, setSocket]}>
      <div>
        <Head />
        <StyledGrid container direction="row" justifyContent="center" margin="10px">
          <Grid item>
            <Component {...pageProps} />
          </Grid>
        </StyledGrid>
      </div>
    </SocketContext.Provider>
  )
}

export default App
