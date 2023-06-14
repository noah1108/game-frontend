import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import { SocketContext } from './_app'
import _ from 'lodash'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

const TypographyErr = styled(Typography)`
  color: red;
`

/**
 * 部屋を建てる画面(ホスト)
 */
const RoomSetting = () => {
  const [socket, setSocket] = useContext(SocketContext)
  const [username, setUsername] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const router = useRouter()

  // ソケットイベント定義
  useEffect(() => {
    // 部屋建てボタン押下のレスポンスを受けての処理
    if (!_.isEmpty(socket)) {
      socket.on('create', (res) => {
        console.log(res)
        if(res.status === '200'){
          router.push({
            pathname: 'wait',
            query: {
              roomId: res.data.id,
            },
          })
        }else{ 
          setErrMsg(res.message)
        }
      })
    }
    /**
     * 返却形式
     *  {
     *    status:200 or Exxx(エラー)
     *    message:""
     *    data:{
     *      ※コンソールなどで確認
     *    }
     *  }
     */

    // 正常系処理(戻り値=200)
    // 1. レスポンスから部屋番号を取得
    // 2. 部屋番号をパラメータで渡し、wait画面へ遷移

    // 異常系処理(戻り値=Exxx)
    // 1. レスポンスからエラーメッセージを取得
    // 2. 赤文字でエラーメッセージを表示する
    // ※ 画面遷移しない
    
  }, [socket])

  // const sockEvent = useMemo(() => {
  //   if (!_.isEmpty(socket)) {
  //     socket.on('create', (res) => {
  //     })
  //   }
  // }, [socket])

  // 部屋を建てるボタン押下イベントハンドラ
  const handleOnClick = () => {
    socket.emit('create', username)
    // TODO ↓ 要る? 使用感と相談
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
      <TypographyErr>{errMsg}</TypographyErr>
        <Button onClick={handleOnClick} variant="outlined">
          部屋を建てる
        </Button>
      </Grid>
    </Grid>
  )
}

export default RoomSetting
