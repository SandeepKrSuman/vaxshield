import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { FaCheckCircle } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { BsXCircleFill } from 'react-icons/bs';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SlotCard from "./SlotCard";
import SlotModal from "./SlotModal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  root1: {
    flexGrow: 1,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function CenterCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={6} md={4} key = {props.usekey}>
      <Card className={classes.root}>
        <CardHeader
          title={props.name}
          subheader={props.address}
        />
        <CardActions disableSpacing>
          <Tooltip TransitionComponent={Zoom} title={props.available ? 'Slots Available' : 'Slot Unavailable'}>
            <IconButton aria-label="slots availability">
              {props.available ? <FaCheckCircle style={{color:"#64dd17"}} /> : <BsXCircleFill style={{color:"#f44336"}} />}
            </IconButton>
          </Tooltip>
          {props.paid ? <Tooltip TransitionComponent={Zoom} title={props.paid ? 'PAID' : null}><IconButton aria-label="Paid">
            <BiRupee style={{color:"#f44336"}} />
          </IconButton></Tooltip> : null}
          {useMediaQuery('(max-width:767.5px)') ? 
          <Tooltip TransitionComponent={Zoom} title='View Slots'>
            <IconButton
              autoFocus={props.usekey === 0 ? true : false}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="view slots"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip> : 
          <SlotModal 
          slotinfo = {props.slotinfo}
          modaltitle = {props.name}
          />}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.root1}>
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
                      booked = {session.available_capacity === 0 ? true: false}
                      dose1 = {session.available_capacity_dose1}
                      dose2 = {session.available_capacity_dose2}
                    />
                  );
                })}
              </Grid>
              <IconButton onClick={handleExpandClick}>
                <ExpandLessIcon />
              </IconButton> 
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
