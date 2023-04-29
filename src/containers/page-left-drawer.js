import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/router'
import { MdEvent, MdOutlinePeople, MdEdit, MdLogin } from 'react-icons/md'
import _ from 'lodash'

// TODO 一旦ハードコーディング
// いずれコンフィグ定義

const pages = [
  {
    icon: <MdEvent size="25px" />,
    name: 'スケジュール',
    path: 'schedule',
  },
  {
    icon: <MdOutlinePeople size="25px" />,
    name: 'プロジェクト管理',
    path: 'manage-project',
  },
  {
    icon: <MdLogin size="25px" />,
    name: 'ログイン',
    path: 'login',
  },
  {
    icon: <MdEdit size="25px" />,
    name: '【開発用】テスト',
    path: 'test',
  },
  {
    icon: <MdEdit size="25px" />,
    name: '【開発用】テスト2',
    path: 'test2',
  },
]

/**
 * 画面左サイドバー
 */
const PageLeftDrawer = ({ open, toggleDrawer }) => {
  const router = useRouter()

  const list = (() => (
    <Box
      sx={{ width: 280 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {_.map(pages, (page) => {
          return (
            <ListItem disablePadding key={page.path}>
              <ListItemButton
                onClick={() => {
                  
                  router.push(page.path )
                }}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  ))()

  return (
    <div>
      <SwipeableDrawer
        anchor={'left'}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  )
}

export default PageLeftDrawer
