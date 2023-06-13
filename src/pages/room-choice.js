import { Button, Grid } from '@mui/material'
import { useRouter } from 'next/router'

/**
 * 部屋選択画面
 */
const RoomChoice = () => {
  const router = useRouter()

  // ボタン押下イベントハンドラ
  const handleOnClick = (path) => {
    router.push(path)
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Button onClick={() => handleOnClick('room-join')} variant="outlined">
          参加
        </Button>
        <Button onClick={() => handleOnClick('room-setting')} variant="outlined">
          部屋を建てる
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => handleOnClick('title')} variant="outlined">
          タイトルへ戻る
        </Button>
      </Grid>
    </Grid>
  )
}

export default RoomChoice
