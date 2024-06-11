import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import useGetRequestDetails from "../../hooks/useGetRequestDetails";
import { useEffect, useState } from "react";

const TimberCuttingRequestDetails = (reqId) => {    
   
    const url = `http://localhost:4000/api/citizen/getCuttingRequestById/${reqId.reqId}`

    const {getCuttingRequet,request, isLoading, error} = useGetRequestDetails(url);
    const [requestDetails, setRequestDetails] = useState([]);
    const [treeDetails, setTreeDetails] = useState([]);
    
    // Fetch all permit request made by the citizen at the initial rendering of the component 
    useEffect(() => {
      console.log("get requests");
      getCuttingRequet()
    }, []);
    
    useEffect(() => {
      // Update rows when requests change and isLoading becomes false
      if (!isLoading && request && request.requestDetails ) {
          setRequestDetails(request.requestDetails[0])
          setTreeDetails(request.treeDetails)
          //console.log(requestDetails);
          
      }
  }, [request, isLoading]);

    return (
      <Box>
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
                      Requesting permission to cut dangerous jackfruit, palm or coconut Trees
              </Typography>
          </Box>
          {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Typography> Loading...</Typography>
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : ( 
                <Box>
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
                        <Typography>Address : </Typography> 
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
                    Details of the land where the above mentioned trees are located
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
                    <Typography>{requestDetails.land_name} </Typography> 
                      </Grid>
                      <Grid item xs={2} marginLeft={1}>
                          <Typography>Address of the Land : </Typography> 
                      </Grid>
                      <Grid  item xs={9} >
                          <Typography>{requestDetails.land_address} </Typography> 
                      </Grid>
                      <Grid item xs={2} marginLeft={1}>
                        <Typography>Grama Division : </Typography> 
                      </Grid>
                      <Grid  item xs={9} >
                          <Typography>{requestDetails.grama_division} </Typography> 
                      </Grid>
                      <Grid item xs={3} marginLeft={1}>
                          <Typography>Divisional Secretariat Division : </Typography> 
                      </Grid>
                      <Grid  item xs={8} >
                          <Typography> {requestDetails.grama_division} </Typography> 
                      </Grid>
                      <Grid item xs={2} marginLeft={1}>
                          <Typography>Ownership of the Land : </Typography> 
                      </Grid>
                      <Grid  item xs={9} >
                          <Typography> {requestDetails.land_ownership} </Typography> 
                      </Grid>
                      <Grid item xs={2} marginLeft={1}>
                          <Typography> {requestDetails.land_ownership} Registered Number : </Typography> 
                      </Grid>
                      <Grid  item xs={9} >
                          <Typography> {requestDetails.land_ownership_number} </Typography> 
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
                          {treeDetails.map((row) => (
                              <TableRow key={row.no}>
                                  <TableCell>{row.tree_id}</TableCell>
                                  <TableCell>{row.type_of_tree}</TableCell>
                                  <TableCell>{row.circumference}</TableCell>
                                  <TableCell>{row.height}</TableCell>
                                  <TableCell>{row.reason}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
              </Box>

                )}
    
         
        </Box>
    );

}

export default TimberCuttingRequestDetails