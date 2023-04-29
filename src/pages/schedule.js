import { useState, useEffect } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import IconLoader from '../components/Icon/Icon-loader'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import _ from 'lodash'
import axios from 'axios'
import { useRouter } from 'next/router'
import { execSql } from '../api/api'
import { Button } from '@mui/material'

const TypographyCaption = styled(Typography)`
  font-size: 16px;
  color: #888888;
  // font-weight: bold;
`

const DropContainer = styled.div`
  // height: 25px;
  // margin: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const InputArea = styled.div`
  height: 25px;
  margin: 5px;
  display: flex;
  justify-content: end;
`

const DateArea = styled.div`
  height: 25px;
  width: 25px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
`

const EditIcon = IconLoader('md', 'MdEdit')
const DelIcon = IconLoader('md', 'MdDelete')
const Haguruma = IconLoader('md', 'MdSettings')
const Circle = IconLoader('md', 'MdOutlineLens')
const Triangle = IconLoader('md', 'MdOutlineChangeHistory')
const Crossmark = IconLoader('md', 'MdOutlineClear')
const Date = IconLoader('md', 'MdDateRange')
const Account = IconLoader('md', 'MdAccountCircle')
const Checkbox = IconLoader('md', 'MdCheckBox')

// const data = {
//   20230330: {
//     user1: 1,
//     user2: 2,
//     user3: 0,
//   },
//   20230331: {
//     user1: 0,
//     user2: 1,
//   },
//   20230401: {
//     user1: 2,
//     user2: 0,
//   },
//   20230402: {
//     user1: 2,
//     user2: 1,
//   },
// }
//console.log(data["20230330"]["user1"])

//console.log(_.map(Object.keys(data['20230330'])))

//console.log(_.get(data, "a4", "default"))

// _.forEach(Object.keys(data), key=>{
//   console.log(key)
//   console.log(data[key])
// })

/**
 * スケジュール画面
 * 2023/03/23
 */
const Schedule = ({}) => {
  const [open, setOpen] = useState(true)
  const [edit, setEdit] = useState({})
  const [data, setData] = useState({})

  const router = useRouter()
  const id = router?.query?.id ?? 0

  const handleClick = () => {
    setOpen(!open)
  }

  const editClick = (path) => {
    setEdit((old) => {
      const obj = _.cloneDeep(old)
      const val = _.get(obj, path)
      _.set(obj, path, !val)
      return obj
    })
  }

  const updateConf = async () => {
    const conf = JSON.stringify(data)
    const sql = `update project set conf='${conf}' where id='${id}';`
    await execSql(sql)
  }

  const handleChange = (path, event) => {
    setData((old) => {
      const obj = _.cloneDeep(old)
      _.set(obj, path, event.target.value)
      return obj
    })
  }

  useEffect(() => {
    ;(async () => {
      try {
        const sql = `select * from project where id='${id}';`
        const proj = await execSql(sql)
        if (!_.isEmpty(proj)) {
          const conf = proj[0].conf
          const obj = {}
          _.forEach(Object.keys(conf), (date) => {
            _.forEach(Object.keys(conf[date]), (user) => {
              _.set(obj, `${date}.${user}`, false)
            })
          })
          setData(conf)
          setEdit(obj)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <>
      <TypographyCaption>スケジュール画面</TypographyCaption>
      <List>
        {_.map(Object.keys(data), (date) => {
          return (
            <div>
              <ListItemButton onClick={handleClick}>
                <DateArea>
                  <Date size="25" />
                </DateArea>
                <ListItemText primary={date} />
                {true ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {_.map(Object.keys(data[date]), (user) => {
                    return (
                      <div>
                        <ListItem sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <Account size="25" />
                          </ListItemIcon>
                          <ListItemText primary={user} />
                          <InputArea>
                            {edit[date][user] ? (
                              <>
                                <IconButton
                                  onClick={async () => {
                                    try {
                                      const sql = `select * from project where id='${id}';`
                                      const proj = await execSql(sql)
                                      if (!_.isEmpty(proj)) {
                                        const conf = proj[0].conf
                                        setData(conf)
                                      }
                                    } catch (error) {
                                      console.error(error)
                                    } finally {
                                      editClick(`${date}.${user}`)
                                    }
                                  }}
                                >
                                  <Crossmark size="28" />
                                </IconButton>
                                <IconButton
                                  onClick={async () => {
                                    try {
                                      await updateConf()
                                      const sql = `select * from project where id='${id}';`
                                      const proj = await execSql(sql)
                                      if (!_.isEmpty(proj)) {
                                        const conf = proj[0].conf
                                        setData(conf)
                                      }
                                    } catch (error) {
                                      console.error(error)
                                    } finally {
                                      editClick(`${date}.${user}`)
                                    }
                                  }}
                                >
                                  <Checkbox size="28" />
                                </IconButton>
                              </>
                            ) : (
                              <IconButton onClick={() => editClick(`${date}.${user}`)}>
                                <EditIcon size="28" />
                              </IconButton>
                            )}
                          </InputArea>
                          <Select
                            value={data[date][user]}
                            onChange={(event) => handleChange(`${date}.${user}`, event)}
                            size="small"
                            disabled={!edit[date][user]}
                          >
                            <MenuItem value={0}>
                              <DropContainer>
                                <Circle size="25" />
                              </DropContainer>
                            </MenuItem>
                            <MenuItem value={1}>
                              <DropContainer>
                                <Triangle size="25" />
                              </DropContainer>
                            </MenuItem>
                            <MenuItem value={2}>
                              <DropContainer>
                                <Crossmark size="25" />
                              </DropContainer>
                            </MenuItem>
                          </Select>
                        </ListItem>
                      </div>
                    )
                  })}
                </List>
              </Collapse>
            </div>
          )
        })}
      </List>
    </>
  )
}

export default Schedule
