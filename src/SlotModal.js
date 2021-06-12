import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import SlotCard from './SlotCard';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function SlotModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Tooltip TransitionComponent={Zoom} title='View Slots'>
        <IconButton onClick={handleClickOpen} style={{marginLeft: 'auto'}}>
            <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.modaltitle}</DialogTitle>
        <DialogContent dividers={true}>
            <div
            className={classes.root}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            >
              <Grid container spacing={3}>
                {props.slotinfo.map((session,index) => {
                  return (
                    <SlotCard 
                      usekey = {index}
                      key = {index}
                      slotdate = {session.date}
                      vaccine = {session.vaccine}
                      age = {`Age: ${session.min_age_limit}+`}
                      available = {`Available: ${session.available_capacity}`}
                      dose1 = {session.available_capacity_dose1}
                      dose2 = {session.available_capacity_dose2}
                    />
                  );
                })}
              </Grid>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
