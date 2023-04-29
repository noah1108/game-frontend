import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconLoader from '../components/Icon/Icon-loader'
import { Divider } from '@mui/material'
import DialogForm from '../components/Dialog/DialogForm'
import { execSql } from '../api/api'
import { useRouter } from 'next/router'

const TypographyCaption = styled(Typography)`
  font-size: 16px;
  color: #888888;
  // font-weight: bold;
`

const InputArea = styled.div`
  height: 25px;
  margin: 5px;
  display: flex;
  justify-content: end;
`

const ListArea = styled(Paper)`
  overflow-y: scroll;
  height: 65vh;
  margin: 10px 0px;
  padding: 5px;
`

const AddIcon = IconLoader('md', 'MdAddBox')

// 8桁乱数生成関数
const createPassword = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const passBase = alphabet + alphabetUpper + numbers
  const len = 8 // 8桁
  const password = ''
  for (const i = 0; i < len; i++) {
    password += passBase.charAt(Math.floor(Math.random() * passBase.length))
  }
  return password
}

// SQL生成関数
const getInsertSql = (projname, obj) => {
  const id = createPassword()
  const pw = '$2b$10$CxH9bTLBLTcr46mTij2ivOkLQ3C3e4xDU7pkzpl43Ok7IIBesG.6q'
  const name = projname
  const conf = JSON.stringify(obj)
  return `insert into project (id, name, passwd, conf) values ('${id}','${name}','${pw}','${conf}')`
}

/**
 * プロジェクト管理画面
 * 登録ユーザのみ遷移可能
 */
const ManageProject = () => {
  const [projs, setProjs] = useState([])
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // 画面読み込み完了後,DBからプロジェクト一覧を取得
  useEffect(() => {
    ;(async () => {
      try {
        const sql = 'select * from project;'
        const projList = await execSql(sql)
        if (!_.isNil(projList)) setProjs(projList)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  // プロジェクト追加ダイアログトグル関数
  const toggleDialogOpen = () => {
    setOpen((_open) => !_open)
  }

  // ダイアログ決定ボタン押下時処理
  const handleOnSubmit = async (evt) => {
    // ダイアログ閉じる(プロジェクト簡易化のため、エラーハンドリング無し)
    toggleDialogOpen()
    const name = evt.name
    // 入力値からconf作成
    const obj = {}
    _.forEach(evt.dates, (d) => {
      const dayLabel = d.date.format('YYYYMMDD')
      _.forEach(evt.members, (m) => {
        _.set(obj, `${dayLabel}.${m.name}`, 1)
      })
    })
    // インサート処理 → 正常終了後、再検索
    try {
      await execSql(getInsertSql(name, obj))
      const sql = 'select * from project;'
      const projList = await execSql(sql)
      if (!_.isNil(projList)) setProjs(projList)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <TypographyCaption>プロジェクト管理画面</TypographyCaption>
      <InputArea>
        <IconButton onClick={toggleDialogOpen}>
          <AddIcon size="28" />
        </IconButton>
      </InputArea>

      <ListArea>
        <List>
          {projs.map((proj) => {
            return (
              <div key={proj.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() =>
                        router.push(
                          {
                            pathname: 'schedule',
                            query: {
                              id: proj.id,
                            },
                          },
                          'schedule'
                        )
                      }
                    >
                      <CommentIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemText primary={proj.name} />
                </ListItem>
                <Divider component="li" />
              </div>
            )
          })}
        </List>
      </ListArea>

      <DialogForm
        open={open}
        toggleOpen={toggleDialogOpen}
        handleOnSubmit={handleOnSubmit}
      />
    </>
  )
}

export default ManageProject
