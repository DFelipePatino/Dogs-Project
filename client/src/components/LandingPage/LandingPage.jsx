import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Grow } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './LandingPage.css';
// import { set } from "../../../../server/src/app";

const LandingPage = () => {

    const [loadingShown, setLoadingShown] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {!loadingShown ? (
                <>
                    <div>
                        <h1 className="mainH1">Dogs API</h1>
                    </div>
                    <div className="homeButton">
                        <Button onClick={() => {
                            setLoadingShown(true);
                            setTimeout(() => {
                                navigate('/home')
                            }, 2000)
                        }}>Home</Button>
                    </div>
                </>
            ) : (
                <Grow
                    in={loadingShown}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(loadingShown ? { timeout: 1000 } : {})}
                >
                    <div className='loading'>
                        <br />
                        <br />
                        Loading...
                        <br />
                        <br />
                        <p>Preparate para una gran experiencia!</p>
                        <Box sx={{ width: '100%', paddingBottom: "10%" }}>
                            <LinearProgress />
                        </Box>
                    </div>
                </Grow>
            )}
        </div>
    );
}

export default LandingPage;