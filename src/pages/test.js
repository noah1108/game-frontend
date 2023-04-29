import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import IconLoader from '../components/Icon/Icon-loader'
import TestForm from '../components/Dialog/TestForm'

const StyledDiv = styled.div`
  margin: 10px;
`

export const A = IconLoader("md","MdSettings")

// 

/**
 * スケジュール画面
 */
const Test = ({}) => {
  const [test, setTest] = useState(0)


  const onClick = () => {
    // console.log(`onClick:${test}`)
    setTest(test + 1)
  }

  // err infinity loop #1
  // setTest(test+1)

  // err infinity loop #2
  // useEffect(()=>{
  //   setTest(test+1)
  // },[test])

  

  return (
    <StyledDiv>
      <TestForm/>
    </StyledDiv>
  )
}

export default React.memo(Test)
