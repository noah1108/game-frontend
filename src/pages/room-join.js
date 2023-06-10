import React, { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'

// Socket.ioサーバ接続情報
const ENDPOINT = 'http://192.168.0.105:7000'

const SocketTest = () => {
  //   const [msg, setMsg] = useState('')
  const socketRef = useRef()
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('') 

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT)
    socketRef.current.on('chat', (data) => {
      console.log(data)
    })
    socketRef.current.on('room', (data) => {
      console.log(data)
      setRoomId(data.id)
    })
    // CLEAN UP THE EFFECT
    return () => socketRef.current.disconnect()
    //
  }, [])

  const handleOnClick = () => {
    socketRef.current.emit('join', username, roomId)
    // setUsername('')
  }

  const handleOnChangeRoomId = (e) => {
    setRoomId(e.target.value)
  }

  const handleOnChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  return (
    <>
      {/* <div>{'部屋番号:'+roomId}</div> */}
      <TextField size="small" onChange={handleOnChangeRoomId} value={roomId} />
      <TextField size="small" onChange={handleOnChangeUsername} value={username} />
      <Button onClick={handleOnClick} variant="outlined">
        参加する
      </Button>
    </>
  )
}

export default SocketTest
