import AboutCard from "../../components/about/AboutCard";
import { divisionalSecretaryHome } from "../../assets/cardData";
import bossImage from "../../assets/boss.jpg";
import Header from "../../components/header/Header";

const DivisionalSecretaryHome = () => {
    
    return (
        <div>
            <Header isLoggedIn={true}/>
            <AboutCard 
            title = "Let's Start Today's Work!"
            backgroundImage={bossImage}
            homeAboutData={divisionalSecretaryHome}
            />
        
        </div>
            
    );
}

export default DivisionalSecretaryHome