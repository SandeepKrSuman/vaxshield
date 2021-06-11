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
import { FaCheckCircle } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { BsXCircleFill } from 'react-icons/bs';
import SlotCard from "./SlotCard";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
    <Grid item xs={12} md={6}>
      <Card className={classes.root}>
        <CardHeader
          title={props.name}
          subheader={props.address}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="slots may be available">
            {props.available ? <FaCheckCircle style={{color:"#64dd17"}} /> : <BsXCircleFill style={{color:"#f44336"}} />}
          </IconButton>
          {props.paid ? <IconButton aria-label="Paid">
            <BiRupee style={{color:"#f44336"}} />
          </IconButton> : null}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="view slots"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.root1}>
              <Grid container spacing={3}>
                {props.slotinfo.map(session => {
                  return (
                    <SlotCard 
                      key = {session}
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
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
