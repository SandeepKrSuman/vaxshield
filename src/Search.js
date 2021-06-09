import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import "./Search.css";

function Search(){

    return (
      <div className="search-and-result-container">
        <form className="formstyle" noValidate autoComplete="off">
          <TextField 
            className="textfield-style"
            id="outlined-basic" 
            label="Enter your PIN" 
            variant="outlined" 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="search-button" />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    
    );
}

export default Search;