import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import "./Search.css";

function Search(){

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