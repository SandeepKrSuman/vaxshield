import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import "./Footer.css";

function Footer(){
    return (
        <footer className="foot">
            <h2 className="foot-tag">#LargestVaccineDrive</h2>
    
            <div className="footdiv">
                <a className="booklink" href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener noreferrer"><Button variant="outlined">Book your appointment <SendIcon style={{marginLeft: '5px'}} /></Button></a>
                <p className="developerDetail">Made with ❤ by <a className="devlink" href="https://www.linkedin.com/in/sandeepkrsuman/" target="_blank" rel="noopener noreferrer">SandeepKrSuman</a></p>
            </div>
        </footer>
    );
    
}

export default Footer;