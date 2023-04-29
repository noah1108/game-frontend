import * as React from 'react'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import 'dayjs/locale/ja'

/**
 * カレンダー部品
 */
const DatePicker = ({ value, onChange, fullWidth }) => {
  // console.log(date)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <MuiDatePicker
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField size="small" {...params} fullWidth={fullWidth} />
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
