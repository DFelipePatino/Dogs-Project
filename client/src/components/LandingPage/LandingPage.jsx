import { Link } from "react-router-dom";
import './LandingPage.css';

const LandingPage = (onHomeClick) => {
    return (
        <div className="landing-page">
            <div>
                <h1 className="mainH1">Dogs API</h1>
            </div>

            <div className="homeButton">
                <Link to="/home">
                    <button onClick={onHomeClick}>Home</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;