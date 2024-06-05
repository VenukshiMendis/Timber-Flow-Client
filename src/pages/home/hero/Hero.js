import React from "react"
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/heading/Heading"
import "./Hero.css"
import { Box, Button} from "@mui/material"
import homeImage from "../../../assets/cover.jpg";
import Header from "../../../components/header/Header"

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Box  
      sx={{
            backgroundImage: `url(${homeImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '85vh',
            width: '100%',
            top: 0,
            left: 0,
          }}
      >
        <Header isUser={false}/>
        <Box className='container' sx={{marginTop:'160px'}}>
          <Heading  subtitle='WELCOME TO WOODWANDER !' title='Streamlined timber permits and licenses' />
          <div className='row1'>
            <p>The official government portal dedicated to facilitating the issuance of timber cutting and transport permits, providing transparent processes, and upholding regulatory standards to promote sustainable forestry practices nationwide</p>
          </div>
          <Button variant="contained"  size="large" sx={{
            marginTop:'10px',
            height:'50px',
          }}
            onClick={() =>navigate('/login')}>
            GET STARTED NOW 
          </Button> 
        </Box>
      </Box>
      <div className='margin'></div>
    </Box>
  )
}

export default Hero
