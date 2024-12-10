import {useRef} from "react"
import { useLogin } from "../../hooks/useLogin"
import { ThemeProvider } from "@emotion/react";
import Header from "../../components/header/Header"
import { Typography,Box, Grid, createTheme} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { blue, grey} from "@mui/material/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SignUp = () => {
  //const theme = useTheme();
 
  const theme = createTheme({
    palette: {
      background: {
        //default: pink[900], 
      },
    },
  });
  const LoginContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    border: '1px solid #ccc',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', 
    height: "100%",
    margin:"60px 150px",
    
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "justify",
      margin:"10px 20px",
    },
  }));
  
  const {login} = useLogin()
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  //Handle submission of the login form 
  const handleSubmit = async (e) => {
    const email = emailRef.current;
    const password = passwordRef.current;
    
    e.preventDefault()
    console.log(email,password);
    await login(email, password)
  }

  return (
    <ThemeProvider theme={theme}>
    <Header/>
    <LoginContainer>
      <Grid container>
        <Grid item xs={12}  padding={"10px 20px"} backgroundColor={grey[100]}>
        <Container component="main" >
        <CssBaseline />
        <Box>
            <Box
            sx={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 2 
            }} >
                
                <Typography component="h2" variant="h5" fontWeight={'bold'} marginBottom={2}>
                    Sign Up
                </Typography>
                <AccountCircleIcon  sx={{ fontSize: 120, marginBottom: 1, color: blue[200] }} />
                <Typography component="h5">
                    Please fill this form to create an account
                </Typography>
            </Box>        
        <Box px={3} py={2} backgroundColor={grey[100]}component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={1} >
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="fullname"
                name="fullname"
                label="Full Name"
                fullWidth
                margin="dense"
              />
              <Typography variant="inherit" color="textSecondary">

              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nic"
                name="nic"
                label="NIC"
                fullWidth
                margin="dense"
              />
              <Typography variant="inherit" color="textSecondary">
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phoneNo"
                name="phoneNo"
                label="Phone Number"
                fullWidth
                margin="dense"
              />
              <Typography variant="inherit" color="textSecondary">
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                margin="dense"
              />
              <Typography variant="inherit" color="textSecondary">
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
              />
              <Typography variant="inherit" color="textSecondary">
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
              />
              <Typography variant="inherit" color="textSecondary">
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                margin="dense"
                
              />
              <Typography variant="inherit" color="textSecondary">
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              
            >
              Register
            </Button>
          </Box>
        </Box>
        </Box>
      </Container>
    </Grid>
    </Grid>
    </LoginContainer>
   
    </ThemeProvider>
  )
}

export default SignUp