import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Grow } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './LandingPage.css';
import Swal from 'sweetalert2';
// import { set } from "../../../../server/src/app";

const LandingPage = () => {
    
    const navigate = useNavigate();

    const [useEffectState, setUseEffectState] = useState(false);
    const [loadingShown, setLoadingShown] = useState(false);

    const allDogs = useSelector(state => state.dogs);
    console.log(allDogs, 'allDogs');
    
    
    useEffect(() => {
        if (useEffectState && allDogs.length > 0) {
            navigate('/home');
        }
    }, [useEffectState, allDogs.length]
    );

    const handleClick = () => {
        setUseEffectState(true);
        Swal.fire({
            title: 'Atención!',
            text: 'This instance will spin down with inactivity, which can delay requests by 50 seconds or more. Thank you for your patience. - Esta instancia se detendrá por inactividad, lo que puede retrasar las solicitudes en 50 segundos o más. Gracias por su paciencia.',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido'
        }).then(() => {
            if (allDogs.length === 0) {
                setLoadingShown(true);
            } else {
                setLoadingShown(true);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }
        });
    };


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
                            handleClick();
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