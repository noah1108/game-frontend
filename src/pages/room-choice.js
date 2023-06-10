import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const RoomChoice = () => {
  const router = useRouter()

  const handleOnClick = (path) => {
    router.push(path)
  }

  return (
    <>
      <Button onClick={()=>handleOnClick('room-join')} variant="outlined">
        参加
      </Button>
      <Button onClick={()=>handleOnClick('room-setting')} variant="outlined">
        部屋を建てる
      </Button>
    </>
  )
}

export default RoomChoice
