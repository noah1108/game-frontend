import React, { useState } from 'react'
import { Button, TextField, Grid } from '@mui/material'
import { useContext } from 'react'
import { SocketContext } from './_app'

/**
 * 部屋に参加する画面(ゲスト)
 */
const RoomJoin = () => {
  const [socket, setSocket] = useContext(SocketContext)
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')

  // 参加するボタン押下イベントハンドラ
  const handleOnClick = () => {
    socket.emit('join', username, roomId)
  }

  // ルームID入力変更検知イベントハンドラ
  const handleOnChangeRoomId = (e) => {
    setRoomId(e.target.value)
  }

  // ユーザ名入力変更検知イベントハンドラ
  const handleOnChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row">
          <Grid item>
            <div>{'部屋番号:' + roomId}</div>
          </Grid>
          <Grid item>
            <TextField size="small" onChange={handleOnChangeRoomId} value={roomId} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          <Grid item>
            <TextField size="small" onChange={handleOnChangeUsername} value={username} />
          </Grid>
          <Grid item>
            <Button onClick={handleOnClick} variant="outlined">
              参加する
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RoomJoin
