import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div>
                <h1 className="mainH1">Dogs API</h1>
            </div>

            <div className="homeButton">

                <button onClick={() => { navigate('/home') }}>Home</button>

            </div>
        </div>
    );
}

export default LandingPage;