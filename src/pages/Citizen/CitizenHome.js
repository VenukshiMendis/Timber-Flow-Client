import AboutCard from "../../components/about/AboutCard";
import { homeAbout } from "../../assets/cardData";
import citizenImage from "../../assets/young-man-standing-park-character_25030-39570.avif"
import Header from "../../components/header/Header";

const CitizenHome = () => {
    return (
        <div>
            <Header isLoggedIn={true}/>
            <AboutCard 
            titlee = "Explore Our Services"
            backgroundImage={citizenImage}
            homeAboutData={homeAbout}
            />
        </div>
    );

}

export default CitizenHome