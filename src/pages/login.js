import React, { useCallback } from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { MdSettings } from 'react-icons/md'
import { Grid, Button, TextField, Paper } from '@mui/material'

const StyledDiv = styled.div`
  margin: 3px;
`

const StyledPaper = styled(Paper)``

/**
 * ログイン画面
 */
const Login = () => {
  const [res, setRes] = useState()

  // ログイン処理
  const onClickLogin = useCallback(async () => {
    const res = await axios
      .get('http://localhost:3000/user/login')
      .then((res) => res.data[0])
      .catch((err) => console.error(err))
    console.log(res)
    setRes(res)
  }, [])

  return (
    <StyledDiv>
      <Grid container justifyContent="center">
        <Grid item>
          <StyledPaper
            elevation={5}
            sx={{
              width: { xs: '350px', xl: '500px' },
              marginTop: { xs: '50px'},
            }}
          >
            <Button variant="contained" onClick={onClickLogin}>
              テスト実行
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledDiv>
  )
}
export default React.memo(Login)
