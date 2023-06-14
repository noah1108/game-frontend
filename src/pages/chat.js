import { Button, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'

// Socket.ioサーバ接続情報
const ENDPOINT = 'http://192.168.0.105:7000'

/**
 * Socket.io サンプル
 * 参考：https://qiita.com/Hakkokunihonbashi/items/9da86d65b79d9743dc47
 */
const SocketTest = () => {
  const [dataarray, setDataarray] = useState([])
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('')
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT)
    socketRef.current.on('chat', (data) => {
      console.log(data)

      setCount((prevCount) => prevCount + 1)
    })
    // socketRef.current.emit('chat','koizumi');
    // CLEAN UP THE EFFECT
    return () => socketRef.current.disconnect()
    //
  }, [])

  const handleOnClick = () => {
    socketRef.current.emit('chat', msg)
    setMsg('')
  }

  const handleOnChange = (e) => {
    setMsg(e.target.value)
  }

  return (
    <>
      <div>{msg}</div>
      <TextField size="small" onChange={handleOnChange} value={msg} />
      <Button onClick={handleOnClick} variant="outlined">
        test
      </Button>
    </>
  )
}

export default SocketTest
