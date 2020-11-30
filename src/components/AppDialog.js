import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="up" ref={ref} {...props} />;
});

export const AppDialog = ({isOpen, onClose, children, title}) => {
  return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
