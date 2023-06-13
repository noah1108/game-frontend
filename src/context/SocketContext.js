import { createContext, useContext, useState } from 'react'

// Socket.ioサーバ接続情報
export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState()
  const value = {
    socket,
    setSocket,
  }
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

// Custom Hooks
export const useSocket = () => {
  return useContext(SocketContext)
}
