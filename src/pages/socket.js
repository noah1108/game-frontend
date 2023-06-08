import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'

// Socket.ioサーバ接続情報
const ENDPOINT = 'http://localhost:7000'

/**
 * Socket.io サンプル
 * 参考：https://qiita.com/Hakkokunihonbashi/items/9da86d65b79d9743dc47
 */
const SocketTest = () => {
  const [dataarray, setDataarray] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('test', (data) => {
      console.log(data)
      setDataarray((prevDataarray) => {
        prevDataarray[prevDataarray.length] = data
        return prevDataarray
      })
      setCount((prevCount) => prevCount + 1)
    })

    // CLEAN UP THE EFFECT
    return () => socket.disconnect()
    //
  }, [])

  return (
    <>
      <div>{count}</div>
    </>
  )
}

export default SocketTest
