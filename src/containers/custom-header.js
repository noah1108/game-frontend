import * as React from 'react'
import { useState } from 'react'
import CustomAppBar from '../components/CustomAppBar'
import PageLeftDrawer from './page-left-drawer'

const MenuAppBar = ({}) => {
  // const [auth, setAuth] = useState(true)
  // const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }


  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(open)
  }

  return (
    <>
      <CustomAppBar open={open} toggleDrawer={toggleDrawer} />
      <PageLeftDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  )
}

export default React.memo(MenuAppBar)
