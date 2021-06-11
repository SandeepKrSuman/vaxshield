import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import CenterCard from "./CenterCard";

import "./Search.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Search(){
    const classes = useStyles();

    const [display, setDisplay] = useState(false);
    const [inputTxt, setInputTxt] = useState("");
    const [apiData, setApiData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    const url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=';

    function handleChange(event){
        setInputTxt(event.target.value);
    }

    function handleSubmit(event){
        setLoading(true);
        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const today = `${d<10 ? '0'+d : d}-${m<10 ? '0'+m : m}-${y}`;
        if(inputTxt !== ""){
            fetch (`${url}${inputTxt}&date=${today}`)
            .then(res => res.json())
            .then(data => {setApiData(data); setLoading(false);})
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
            setInputTxt("");
            console.log(apiData);
        }
        else{
            setLoading(false);
        }
        event.preventDefault();
        setDisplay(true);
      }

      function handleAvailablity(sessions){
        for(let i = 0; i < sessions.length; i++)
        {
          if(sessions[i].available_capacity > 0)
          {
            return true;
          }
        }
        return false;
      }

      if(display && apiData && !apiData.error && apiData.centers.length>0){
        return (
          <div className="search-and-result-container">
            <form className="formstyle" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField 
                className="textfield-style"
                onChange={handleChange}
                value={inputTxt}
                id="outlined-basic" 
                label="Enter your PIN" 
                variant="outlined" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon className="search-button" onClick={handleSubmit} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>

            <div className={classes.root}>
              <Grid container spacing={3}>
              {apiData.centers.map(center => {
                return (
                  <CenterCard 
                  key = {center}
                  name = {center.name}
                  address = {`${center.address}, ${center.block_name}, ${center.district_name}, ${center.state_name}, ${center.pincode}`}
                  paid = {center.fee_type === "Paid" ? true : false}
                  available = {handleAvailablity(center.sessions)}
                  slotinfo = {center.sessions}
                />
                );
              })}
              </Grid>
            </div>

          </div>
        
        );
      }

      else{
        return (
          <div className="search-and-result-container">
            <form className="formstyle" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField 
                className="textfield-style"
                onChange={handleChange}
                value={inputTxt}
                type="number"
                id="outlined-basic" 
                label="Enter your PIN" 
                variant="outlined" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon className="search-button" onClick={handleSubmit} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            {isLoading ? <img src="preloader.gif" alt="Loading..." /> : null}
          </div>
        
        );
      }
}

export default Search;