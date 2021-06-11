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

  return (
    <Grid item xs={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.slotdate}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.vaccine}
              <br /> 
              [<Box component="div" display="inline" p={1} m={1} color="error.main">{props.age}</Box>]
            </Typography>
            <Typography variant="h6" component="h6" style={{color: "#4caf50"}}>
              {props.available}
            </Typography>
            <Typography variant="body2" component="p">
              D1: {props.dose1}
              <br />
              D2: {props.dose2}
            </Typography>
          </CardContent>
        </Card>
    </Grid>
  );
}
