import React, { useEffect, useState } from 'react'
import { Button, TextField, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { SocketContext } from './_app'
import _ from 'lodash'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

const TypographyErr = styled(Typography)`
  color: red;
`

/**
 * 部屋に参加する画面(ゲスト)
 */
const RoomJoin = () => {
  const [socket, setSocket] = useContext(SocketContext)
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const router = useRouter()

  // ソケットイベント定義
  useEffect(() => {
    if (!_.isEmpty(socket)) {
      socket.on('join', (res) => {
        console.log(res)
        // 正常系処理
        if (res.status === '200') {
          router.push({
            pathname: 'wait',
            query: {
              roomId: res.data.id,
            },
          })
        } else {
          setErrMsg(res.message)
        }
      })
    }
  }, [socket])

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
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>部屋番号：</Grid>
          <Grid item>
            <TextField size="small" onChange={handleOnChangeRoomId} value={roomId} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item>ユーザ名：</Grid>
          <Grid item>
            <TextField size="small" onChange={handleOnChangeUsername} value={username} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={handleOnClick} variant="outlined">
          参加する
        </Button>
      </Grid>
      <Grid item>
        <TypographyErr>{errMsg}</TypographyErr>
      </Grid>
    </Grid>
  )
}

export default RoomJoin
