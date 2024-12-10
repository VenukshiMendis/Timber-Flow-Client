import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import useGetGramaSewakaApprovalDetails from "../../hooks/useGetGramaSewakaApprovalDetails";
import { useEffect, useState } from "react";

const TimberCuttingApprovalByGramaSewaka = (reqId) => {    
   
    const url = `http://localhost:4000/api/gramasewaka/getTreeCuttingApprovalDetailsByGramaSewaka/${reqId.reqId}`

    const {getCuttingRequest,request, isLoading, error} = useGetGramaSewakaApprovalDetails(url);
    const [requestDetails, setRequestDetails] = useState([]);
    
    // Fetch all permit request made by the citizen at the initial rendering of the component 
    useEffect(() => {
      console.log("get request approval");
      getCuttingRequest()
    }, []);
    
    useEffect(() => {
      // Update rows when requests change and isLoading becomes false
      if (!isLoading && request ) {
          setRequestDetails(request[0])
          console.log(requestDetails);
          
      }
  }, [request, isLoading]);

    return (
      <Box>
           <Box 
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginBottom:4,
              }}
          >
            <Typography
                      fontSize={"1.6rem"}
                      fontWeight="bold"
                      textTransform={'capitalize'}
                      >
                      Grama Sewaka Approval
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
                <Grid container spacing={2} display={"flex"} flexDirection={"row"} color={grey[700]}>
                        <Grid item xs={5} marginLeft={1}>
                            <Typography>Date of inspection:</Typography> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{new Date(requestDetails.date_of_inspection).toDateString()}</Typography> 
                        </Grid>

                        <Grid item xs={5} marginLeft={1}>
                            <Typography>Time of inspection:</Typography> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{requestDetails.time_of_inspection }</Typography> 
                        </Grid>

                        <Grid item xs={5} marginLeft={1}>
                            <Typography>Have jackfruit, palm or coconut trees been cut from this land before:</Typography> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{requestDetails.have_trees_been_cut_before }</Typography> 
                        </Grid>

                        {requestDetails.have_trees_been_cut_before  === 'Yes' && (
                            <>
                            <Grid item xs={5} marginLeft={1}>
                                <Typography>Details of trees that have been cut from this land before:</Typography> 
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{requestDetails.trees_cut_details }</Typography> 
                            </Grid>
                            </>
                        )}
                        <Grid item xs={6} marginLeft={1}>
                            <Typography>Is there any change in the details of the applicant provided in the request?</Typography> 
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>{requestDetails.is_applicant_details_changed }</Typography> 
                        </Grid>

                        {requestDetails.is_applicant_details_changed === 'Yes' && (
                            <>
                                <Grid item xs={5} marginLeft={1}>
                                    <Typography>Changes in the details of the applicant:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{requestDetails.applicant_details_changes }</Typography>
                                </Grid>
                            </>
                        )}

                        <Grid item xs={6} marginLeft={1}>
                            <Typography>Is there any change in the details of the land provided in the request?</Typography> 
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>{requestDetails.is_land_details_changed }</Typography> 
                        </Grid>

                        {requestDetails.is_land_details_changed === 'Yes' && (
                            <>
                                <Grid item xs={5} marginLeft={1}>
                                    <Typography>Changes in the details of the land:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{requestDetails.land_details_changes }</Typography>
                                </Grid>
                            </>
                        )}

                        <Grid item xs={6} marginLeft={1}>
                            <Typography>Is there any change in the details of the trees to be cut provided in the request?</Typography> 
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>{requestDetails.is_tree_details_changed }</Typography> 
                        </Grid>

                        {requestDetails.is_tree_details_changed === 'Yes' && (
                            <>
                                <Grid item xs={5} marginLeft={1}>
                                    <Typography>Changes in the details of the trees to be cut:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{requestDetails.tree_details_changes}</Typography>
                                </Grid>
                            </>
                        )}

                        <Grid item xs={5} marginLeft={1}>
                            <Typography>Are there any other owners for this land?</Typography> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{requestDetails.are_there_other_owners}</Typography> 
                        </Grid>

                        <Grid item xs={5} marginLeft={1}>
                            <Typography>Are there any disputes over this land?</Typography> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{requestDetails.are_there_disputes }</Typography> 
                        </Grid>

                        <Grid item xs={5} marginLeft={1}>
                            <Typography>Do you approve this request?</Typography> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{requestDetails.is_request_approved }</Typography> 
                        </Grid>

                        {requestDetails.is_request_approved === 'No' && (
                            <>
                                <Grid item xs={5} marginLeft={1}>
                                    <Typography>Reasons to reject the request:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{requestDetails.approval_reasons}</Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>
              </Box>

                )}
    
         
        </Box>
    );

}

export default TimberCuttingApprovalByGramaSewaka