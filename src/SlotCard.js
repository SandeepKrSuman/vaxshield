import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SlotCard(props) {
  const classes = useStyles();

  function handleDate(d){
    const dt = d.split('-');
    const mindex = parseInt(dt[1]);
    const months = ["", "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const date = `${dt[0]} ${months[mindex]}, ${dt[2]}`;
    return date;
  }

  const stylebooked = {backgroundColor: '#f44336', color: "#ffffff"};
  const styleavailable = {color: '#4caf50'};
  
  return (
    <Grid item xs={6} key={props.usekey}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="body1" component="p">
              {handleDate(props.slotdate)}
            </Typography>
            <Typography className={classes.pos} variant="body2" component="p" color="textSecondary">
              {props.vaccine}
            </Typography>
            <Box component="div" display="inline" p={1} m={1} color="error.main">[{props.age}]</Box>
            <br /><br />
            <Typography variant="body1" component="p" style = {props.booked ? stylebooked : styleavailable}>
              {props.booked ? 'BOOKED' : props.available}
            </Typography>
            {!props.booked ? <Typography variant="body2" component="p">
              D1: {props.dose1}
              <br />
              D2: {props.dose2}
            </Typography> : null}
          </CardContent>
        </Card>
    </Grid>
  );
}
