import React, { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useContext } from 'react'
import { SocketContext } from './_app'

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
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>ユーザ名：</Grid>
          <Grid item>
            <TextField size="small" onChange={handleOnChange} value={username} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={handleOnClick} variant="outlined">
          部屋を建てる
        </Button>
      </Grid>
    </Grid>
  )
}

export default RoomSetting
