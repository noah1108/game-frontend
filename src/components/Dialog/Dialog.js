import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

/**
 * ダイアログ部品
 */
const AlertDialog = ({ open, title, content, toggleOpen, onClickOk, onClickCancel }) => {
  return (
    <div>
      <Button variant="outlined" onClick={toggleOpen}>
        Open alert dialog
      </Button>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {onClickCancel ? <Button onClick={onClickCancel}>キャンセル</Button> : <></>}
          {onClickOk ? <Button onClick={onClickOk}>OK</Button> : <></>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AlertDialog
