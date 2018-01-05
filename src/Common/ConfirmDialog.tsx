import * as React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

interface IAlertDialogProps {
  isOpen: boolean;
  title: string;
  content: string;
  agreeCaption: string;
  disagreeCaption: string;
  onDisagree: () => void;
  onAgree: () => void;
}

const AlertDialog = (props: IAlertDialogProps) => {
  return <Dialog
    open={props.isOpen}
    onClose={props.onDisagree}
  >
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {props.content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onAgree} color="primary">
        {props.agreeCaption}
      </Button>
      <Button onClick={props.onDisagree} color="primary" autoFocus>
        {props.disagreeCaption}
      </Button>
    </DialogActions>
  </Dialog>
}

export default AlertDialog;