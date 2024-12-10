import AboutCard from "../../components/about/AboutCard";
import { gramaHome} from "../../assets/cardData";
import gramasewakaImage from '../../assets/gs.jpg'; 
import Header from "../../components/header/Header";

const GramaSewakaHome = () => {
    console.log("grama");
     return (
        <div>
            <Header isLoggedIn={true}/>
            <AboutCard 
            title = "Let's Start Today's Work!"
            backgroundImage={gramasewakaImage}
            homeAboutData={gramaHome}
            />
        </div>
    );

}

export default GramaSewakaHome