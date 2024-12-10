import { grey } from "@mui/material/colors";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useGetgRequestDetails from "../../hooks/useGetRequestDetails";

const TimberTransportRequestDetails = (reqId) => {

    const url = `http://localhost:4000/api/citizen/getTransportRequestById/${reqId.reqId}`

    const {getCuttingRequet,request, isLoading, error} = useGetgRequestDetails(url);
    const [requestDetails, setRequestDetails] = useState([]);
    const [treeDetails, setTreeDetails] = useState([]);
    const [supplier,setSupplier] = useState();
    
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
          setSupplier(request.requestDetails[0].timber_obtained_from)
          
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
                    Request to Obtain A Timber Transport Permit
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
                    <Typography>{requestDetails.supplier_name}</Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Address of the supplier : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>{requestDetails.supplier_address} </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Timber is obtained from : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography> {requestDetails.timber_obtained_from} </Typography> 
                </Grid>             
            </Grid>

            {supplier === 'private store' && (
                <>
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
                            <Typography>{requestDetails.store_name} </Typography> 
                        </Grid>
                        <Grid item xs={2} marginLeft={1}>
                            <Typography>Address of the store : </Typography> 
                        </Grid>
                        <Grid  item xs={9} >
                            <Typography>{requestDetails.store_address} </Typography> 
                        </Grid>
                </Grid>`
                </>
            )}

            
            
            {supplier === 'land owner' && (
                <>
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
                    <Typography>{requestDetails.land_name} </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Address of the Land : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>{requestDetails.land_address} </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Ownership of the Land : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                    <Typography>{requestDetails.land_ownership} </Typography> 
                </Grid>
                <Grid item xs={6} marginLeft={1}>
                    <Typography>{requestDetails.land_ownership} Registered Number : </Typography> 
                </Grid>
                <Grid  item xs={5} >
                    <Typography>{requestDetails.land_ownership_number} </Typography> 
                </Grid>
            </Grid>
                </>

            )}

            <Typography 
                variant="h6" 
                margin={1} 
                marginTop={2} 
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
                <Grid item xs={3} marginLeft={1}>
                    <Typography>Grama Division : </Typography> 
                    </Grid>
                    <Grid  item xs={8} >
                        <Typography>{requestDetails.grama_division} </Typography> 
                    </Grid>
                    <Grid item xs={3} marginLeft={1}>
                        <Typography>Divisional Secretariat Division : </Typography> 
                    </Grid>
                    <Grid  item xs={8} >
                        <Typography>{requestDetails.ds_division} </Typography> 
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
                <Typography>{requestDetails.destination_address} </Typography> 
                </Grid>
                <Grid item xs={2} marginLeft={1}>
                    <Typography>Transport Vehicle Number : </Typography> 
                </Grid>
                <Grid  item xs={9} >
                <Typography>{requestDetails.transport_vehicle_number} </Typography> 
                </Grid>           
            </Grid>

            <Typography 
                variant="h6" 
                margin={1} 
                marginTop={4} 
                marginBottom={"20px"}  
                color={grey[900]}
                >
                Details of the timber to be transported
            </Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: grey[400] }}>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Type of Timber</TableCell>
                        <TableCell>Circumference (m)</TableCell>
                        <TableCell>Length (m)</TableCell>
                        <TableCell>Number of pieces</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: grey[100] }}>
                    {treeDetails.map((row) => (
                        <TableRow key={row.no}>
                            <TableCell>{row.tree_id}</TableCell>
                            <TableCell>{row.type_of_timber}</TableCell>
                            <TableCell>{row.circumference}</TableCell>
                            <TableCell>{row.length}</TableCell>
                            <TableCell>{row.number_of_pieces}</TableCell>
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

export default TimberTransportRequestDetails