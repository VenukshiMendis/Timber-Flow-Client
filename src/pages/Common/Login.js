import { useRef} from "react"
import { useLogin } from "../../hooks/useLogin"
import { ThemeProvider } from "@emotion/react";
import Header from "../../components/header/Header"
import { Typography,Box, Grid, createTheme} from "@mui/material";
import { styled } from "@mui/material/styles";
import loginimage from "../../assets/loginImage.avif";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { grey } from "@mui/material/colors";

const Login = () => {
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

  const LoginImage = styled("img")(({src,theme}) => ({
    src: `url(${src})`,
    objectFit: 'cover', 
    maxWidth:"150%",
    
    [theme.breakpoints.up("lg")]: {
     
      height: '70vh',
    
    },
    [theme.breakpoints.down("lg")]: {
      width:"95vw",
      height: '50vh',
     
    }
  
  }));
 

  const {login, error} = useLogin()
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
        <Grid item xs={12} md={6}>
            <LoginImage src={loginimage} />
        </Grid>
        <Grid item xs={12} md={6} padding={"10px 20px"} backgroundColor={grey[100]}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5" fontWeight={'bold'} marginBottom={2}>
           Welcome Back!
          </Typography>
          <Typography component="h5" marginBottom={2}>
            Please login to your account to continue
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e)=>{emailRef.current=e.target.value}}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              required
            />
            <TextField
              onChange={(e)=>{passwordRef.current=e.target.value}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container display={"flex"} alignItems={"baseline"}>
              <Grid item xs={6}>
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end">
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            <Button
             
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,height:50}}
             // disabled={isLoading}
            >
              Sign In
            </Button>
           
           {/* {error && <div className="error">{error}</div>} */}
            <Box display="flex">
             
            <Typography padding="10px 5px" >Don't have an account? </Typography>
                
            <Link href="/register" variant="body1" padding="10px 0px" >
                {"Sign Up"}
            </Link>
              
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

export default Login