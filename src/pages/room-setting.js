import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useContext } from 'react'
import { SocketContext } from './_app'
import { useRouter } from 'next/router'

/**
 * 部屋を建てる画面(ホスト)
 */
const RoomSetting = () => {
  const [socket, setSocket] = useContext(SocketContext)
  const [username, setUsername] = useState('')

  // 部屋を建てるボタン押下イベントハンドラ
  const handleOnClick = () => {
    socket.emit('create', username)
    setUsername('')
  }

  // ユーザ名入力変更検知イベントハンドラ
  const handleOnChange = (e) => {
    setUsername(e.target.value)
  }

  return (
    <>
      {/* <div>{'部屋番号:'+roomId}</div> */}
      <TextField size="small" onChange={handleOnChange} value={username} />
      <Button onClick={handleOnClick} variant="outlined">
        部屋を建てる
      </Button>
    </>
  )
}

export default RoomSetting
