import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import _ from 'lodash'
import styled from '@emotion/styled'
import { Typography, TextField, Box, Grid, IconButton } from '@mui/material'
import DatePicker from '../DatePicker/DatePicker'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { Scrollbars } from 'react-custom-scrollbars-2'
import IconLoader from '../Icon/Icon-loader'
import dayjs from 'dayjs'

const TypographyCaption = styled(Typography)`
  font-size: 16px;
  color: #000000;
  // font-weight: bold;
`

const AddBox = IconLoader('md', 'MdAddBox')
const DelBox = IconLoader('md', 'MdDelete')

/**
 * ダイアログフォーム部品
 */
const DialogForm = ({ open, toggleOpen, handleOnSubmit, onClickCancel }) => {
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur',
  })
  const {
    fields: members,
    append: appendMemberRow,
    remove: removeMemberRow,
  } = useFieldArray({
    control,
    name: 'members',
  })

  const {
    fields: dates,
    append: appendDateRow,
    remove: removeDateRow,
  } = useFieldArray({
    control,
    name: 'dates',
  })

  const addNewMemeber = () => appendMemberRow({ name: '' })
  const addNewDate = () => appendDateRow({ date: dayjs() })

  return (
    <div>
      <Dialog open={open} onClose={toggleOpen} fullWidth>
        <DialogTitle>プロジェクト編集ダイアログ</DialogTitle>

        <DialogContent>
          <Box component="form">
            <Scrollbars style={{ height: 300 }}>
              <Grid container>
                <Grid item width="100%">
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`name`}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField {...field} fullWidth size="small"/>
                      )}
                    />
                  </Grid>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <TypographyCaption>プロジェクトメンバ</TypographyCaption>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={addNewMemeber}>
                        <AddBox />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Grid item width="100%">
                    {members.map((field, index) => (
                      <Grid container key={field.id} marginBottom={1} alignItems="center">
                        <Grid item xs={10}>
                          <Controller
                            control={control}
                            name={`members.${index}.name`}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField {...field} size="small" fullWidth />
                            )}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color="error"
                            variant="text"
                            onClick={() => removeMemberRow(index)}
                          >
                            <DelBox />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <TypographyCaption>候補日</TypographyCaption>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={addNewDate}>
                        <AddBox />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Grid item>
                    {dates.map((field, index) => (
                      <Grid container key={field.id} marginBottom={1} alignItems="center">
                        <Grid item xs={10}>
                          <Controller
                            control={control}
                            name={`dates.${index}.date`}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <DatePicker
                                onChange={onChange}
                                value={value}
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color="error"
                            variant="text"
                            onClick={() => removeDateRow(index)}
                          >
                            <DelBox />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Scrollbars>
          </Box>
        </DialogContent>

        <DialogActions>
          {onClickCancel ? <Button onClick={onClickCancel}>キャンセル</Button> : <></>}
          <Button onClick={handleSubmit(handleOnSubmit)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogForm
