import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from './_app'
import _ from 'lodash'

/**
 *  参加待ち画面
 */
const Wait = () => {
  const [socket, setSocket] = useContext(SocketContext)
  const [room, setRoom] = useState({})
  const router = useRouter()
  // reloadされたら詰む
  const roomId = router.query.roomId
  
  // ソケットイベント定義
  useEffect(() => {
    if (!_.isEmpty(socket)) {
      socket.on('getRoomRes', (res) => {
        console.log(res)
      })

      // 部屋情報取得
      socket.emit('getRoom',roomId)
    }
  }, [socket])

  return (
    <Grid item>
      
    </Grid>
  )
}

export default Wait
