import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

/**
 * タイトル画面
 */
const Title = () => {
  const router = useRouter()

  // tap to start
  const handleOnClick = useCallback(() => {
    router.push('room-choice')
  }, [])

  return (
    <div>
      <h2>タイトル画面</h2>
      <Button variant="outlined" onClick={handleOnClick}>
        tap to start !
      </Button>
    </div>
  )
}

export default Title
