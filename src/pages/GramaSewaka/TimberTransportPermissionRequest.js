import { grey } from "@mui/material/colors";
import Header from "../../components/header/Header";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Typography } from "@mui/material";

const TimberTransportPermissionRequest = () => {
    const sampleData = [
        { no: 1, typeOfTree: 'Maple', circumference: 2.5, height: 10, reason: 'Diseased' },
        { no: 2, typeOfTree: 'Oak', circumference: 3.2, height: 12, reason: 'Leaning dangerously' },
        { no: 3, typeOfTree: 'Pine', circumference: 1.8, height: 8, reason: 'Roots damaged' }
    ];

    return (
    <Box>
      <Header isLoggedIn={true}/>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1 },
          margin: 10,
          padding: 5,
          borderRadius: 8, 
          boxShadow: 3,
          backgroundColor: 'white'
        }}
        noValidate
        autoComplete="off"
      >
          <Box 
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center'
              }}
          >
              <Typography
                      fontSize={"1.6rem"}
                      fontWeight="bold"
                      textTransform={'capitalize'}
                      >
                      Request to Obtain A Timber Transport Permit
              </Typography>
          </Box>
    
          <Typography 
              variant="h6" 
              margin={1} 
              marginTop={4} 
              marginBottom={2}  
              color={grey[900]}
              >
              Details of the applicant
          </Typography>
          <Grid
                  container
                  spacing={2}
                  display={"flex"}
                  flexDirection={"row"}
                  color={grey[700]}
                >
              <Grid item xs={2} marginLeft={1}>
                  <Typography>Name : </Typography> 
              </Grid>
              <Grid  item xs={9} >
                <Typography>Nimal perera </Typography> 
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                  <Typography>NIC : </Typography> 
              </Grid>
              <Grid  item xs={9} >
                <Typography>245432345V </Typography> 
              </Grid>
              <Grid item xs={2} marginLeft={1}>
                  <Typography>Mobile Number : </Typography> 
              </Grid>
              <Grid  item xs={9} >
                <Typography>076565453 </Typography> 
              </Grid>             
            </Grid>

            <Typography 
              variant="h6" 
              margin={1} 
              marginTop={4} 
              marginBottom={2}  
              color={grey[900]}
              >
              Details of the supplier from whom you procured the timber

            </Typography>
            <Grid
                    container
                    spacing={2}
                    display={"flex"}
                    flexDirection={"row"}
                    color={grey[700]}
                    >
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Name of the supplier : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>Nimal perera </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Address of the supplier : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>245432345V </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Timber is obtained from : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>076565453 </Typography> 
                </Grid>             
            </Grid>

            <Typography 
              variant="h6" 
              margin={1} 
              marginTop={4} 
              marginBottom={2}  
              color={grey[900]}
              >
              Details of the store from where timber is obtained


            </Typography>
            <Grid
                    container
                    spacing={2}
                    display={"flex"}
                    flexDirection={"row"}
                    color={grey[700]}
                    >
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Name of the store : </Typography> 
                    </Grid>
                    <Grid  item xs={9} >
                        <Typography>245432345V </Typography> 
                    </Grid>
                    <Grid item xs={3} marginLeft={1}>
                        <Typography>Address of the store : </Typography> 
                    </Grid>
                    <Grid  item xs={8} >
                        <Typography>245432345V </Typography> 
                    </Grid>
            </Grid>


            <Typography 
                variant="h6" 
                margin={1} 
                marginTop={4}
                marginBottom={2}
                color={grey[900]}
                >
                Details of the land from where timber is obtained
            </Typography>
            <Grid
                  container
                  spacing={1}
                  display={"flex"}
                  flexDirection={"row"}
                  color={grey[700]}
                >
                <Grid item xs={2} marginLeft={1}>
                  <Typography>Name of the Land : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>245432345V </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Address of the Land : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>245432345V </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Ownership of the Land : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>245432345V </Typography> 
                </Grid>
                <Grid item xs={6} marginLeft={1}>
                    <Typography>Deed / Grant Certificate / Power of Attorney /Joint Ownership Registered Number : </Typography> 
                </Grid>
                <Grid  item xs={5} >
                    <Typography>245432345V </Typography> 
                </Grid>
            </Grid>

            <Typography 
              variant="h6" 
              margin={1} 
              marginTop={4} 
              marginBottom={2}  
              color={grey[900]}
              >
              Location details of the timber procument (private store / land)

            </Typography>
            <Grid
                    container
                    spacing={2}
                    display={"flex"}
                    flexDirection={"row"}
                    color={grey[700]}
                    >
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Grama Division : </Typography> 
                    </Grid>
                    <Grid  item xs={9} >
                        <Typography>245432345V </Typography> 
                    </Grid>
                    <Grid item xs={3} marginLeft={1}>
                        <Typography>Divisional Secretariat Division : </Typography> 
                    </Grid>
                    <Grid  item xs={8} >
                        <Typography>245432345V </Typography> 
                    </Grid>
            </Grid>

          <Typography 
              variant="h6" 
              margin={1} 
              marginTop={4} 
              marginBottom={2}  
              color={grey[900]}
              >
              Transportation and Destination Details for Timber

          </Typography>
          <Grid
                  container
                  spacing={2}
                  display={"flex"}
                  flexDirection={"row"}
                  color={grey[700]}
                >
              <Grid item xs={2} marginLeft={1}>
                  <Typography>Destination address : </Typography> 
              </Grid>
              <Grid  item xs={9} >
                <Typography>Nimal perera </Typography> 
              </Grid>
              <Grid item xs={3} marginLeft={1}>
                  <Typography>Transport Vehicle Number : </Typography> 
              </Grid>
              <Grid  item xs={8} >
                <Typography>245432345V </Typography> 
              </Grid>           
          </Grid>

          <Typography 
              variant="h6" 
              margin={1} 
              marginTop={4} 
              marginBottom={"20px"}  
              color={grey[900]}
              >
              Details of the trees requesting to be cut
          </Typography>
          <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: grey[400] }}>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Type of Tree</TableCell>
                        <TableCell>Circumference (m)</TableCell>
                        <TableCell>Height (m)</TableCell>
                        <TableCell>Reason to be considered as dangerous</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: grey[100] }}>
                    {sampleData.map((row) => (
                        <TableRow key={row.no}>
                            <TableCell>{row.no}</TableCell>
                            <TableCell>{row.typeOfTree}</TableCell>
                            <TableCell>{row.circumference}</TableCell>
                            <TableCell>{row.height}</TableCell>
                            <TableCell>{row.reason}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    </Box>
    );

}

export default TimberTransportPermissionRequest