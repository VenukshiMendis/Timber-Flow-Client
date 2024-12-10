import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup,  TextField,  Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { grey } from "@mui/material/colors";
import TimberCuttingRequestDetails from "../Common/TimberCuttingRequestDetails"
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useAddGramaSewakaApproval from "../../hooks/useAddGramaSewakaApproval";
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const TimberCuttingPermissionRequest = () => {
  const { reqId } = useParams();
  const navigate = useNavigate();

  const url = `http://localhost:4000/api/gramasewaka/addTreeCuttingApprovalByGramaSewaka`
  const { addApprovalDetails } = useAddGramaSewakaApproval(url);

  const [dateOfInspection, setDateOfInspection] = useState(null);
  const [timeOfInspection, setTimeOfInspection] = useState(null);
  const [haveTreesBeenCutBefore, setHaveTreesBeenCutBefore] = useState('No');
  const [isApplicantDetailsChanged, setIsApplicantDetailsChanged] = useState('No');
  const [isLandDetailsChanged, setIsLandDetailsChanged] = useState('No');
  const [isTreeDetailsChanged, setIsTreeDetailsChanged] = useState('No');
  const [areThereOtherOwners, setAreThereOtherOwners] = useState('No');
  const [areThereDisputes, setAreThereDisputes] = useState('No');
  const [isRequestApproved, setIsRequestApproved] = useState('No');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if all required radio groups are filled
    if (!dateOfInspection || !timeOfInspection || !haveTreesBeenCutBefore || !isApplicantDetailsChanged || !isLandDetailsChanged || !isTreeDetailsChanged || !areThereOtherOwners || !areThereDisputes || !isRequestApproved) {
      toast.error('Please fill all required fields.', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
   
      const data =   {
        req_id: reqId,
        date_of_inspection: dateOfInspection ? dateOfInspection.format('YYYY-MM-DD') : null,
        time_of_inspection: timeOfInspection ? timeOfInspection.format('HH:mm:ss') : null,
        have_trees_been_cut_before: haveTreesBeenCutBefore,
        is_applicant_details_changed: isApplicantDetailsChanged,
        applicant_details_changes: isApplicantDetailsChanged === 'Yes' ? event.target.applicantDetailsChanges.value : '',
        is_land_details_changed: isLandDetailsChanged,
        land_details_changes: isLandDetailsChanged === 'Yes' ? event.target.landDetailsChanges.value : '',
        is_tree_details_changed: isTreeDetailsChanged,
        tree_details_changes: isTreeDetailsChanged === 'Yes' ? event.target.treeDetailsChanges.value : '',
        are_there_other_owners: areThereOtherOwners,
        are_there_disputes: areThereDisputes,
        is_request_approved: isRequestApproved,
        approval_reasons: isRequestApproved === 'No' ? event.target.approvalReasons.value : '',
        trees_cut_details: haveTreesBeenCutBefore === 'Yes' ? event.target.treesCutDetails.value : '',
      }

      //send request data to server side
      addApprovalDetails(data)
      .then(() => {
        toast.success('Submission successful!', {
          position: "top-right",
          onClose: () => {
            navigate("/gramasewaka/allcuttingrequests"); // Navigate after toast is closed
          }
        });
      })
      .catch((error) => {
        console.error("Error occurred during request:", error);
        toast.error('Submission failed. Please try again.', {
          position: "top-right",
          autoClose:2000,
        });
      });
    
  };

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
      <Header isLoggedIn={true}/>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1 },
          margin: 10,
          padding: 5,
          paddingBottom:10,
          borderRadius: 8, 
          boxShadow: 3,
          backgroundColor: 'white',
          marginBottom:2,
        }}
        noValidate
        autoComplete="off"
      >
        <TimberCuttingRequestDetails reqId={reqId}/>
        </Box>

        <Box sx={{
          '& .MuiTextField-root': { m: 1 },
          margin: 10,
          marginTop:5,
          padding: 5,
          borderRadius: 8, 
          boxShadow: 3,
          backgroundColor: 'white',
          
        }}>
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
          <Grid>

            <Grid item xs={12} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker   
                  label="Date of inspection"  
                  required
                  name="date"
                  value={dateOfInspection}
                  onChange={(newValue) => setDateOfInspection(newValue)} />
                <TimePicker 
                  label="Time of inspection"
                  required
                  name="time"
                  value={timeOfInspection}
                  onChange={(newValue) => setTimeOfInspection(newValue)} />
              </LocalizationProvider>
              </Grid>

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Have jackfruit, palm or coconut trees been cut from this land before?</FormLabel>
                    <RadioGroup
                        required
                        row
                        name="row-radio-buttons-group" 
                        value={haveTreesBeenCutBefore}
                        onChange={(event)=>{setHaveTreesBeenCutBefore(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label='No' />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                {haveTreesBeenCutBefore === 'Yes' && (
                <Grid item xs={12} >
                  <TextField
                    label="If yes, specify the details of trees that have been cut from this land before"
                    name="treesCutDetails"
                    variant="outlined"
                    multiline // Enable multi-line mode
                    rows={3} // Number of rows
                    fullWidth
                  />
                </Grid>
                )}
                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the details of the applicant provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={isApplicantDetailsChanged}
                        onChange={(event)=>{setIsApplicantDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

              {isApplicantDetailsChanged === 'Yes' && (
                <Grid item xs={12} >
                  <TextField
                    label="If yes, specify the changes in the details of the applicant"
                    name="applicantDetailsChanges"
                    variant="outlined"
                    multiline // Enable multi-line mode
                    rows={3} // Number of rows
                    fullWidth
                  />
                </Grid>
              )}

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the details of the land provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        required
                        value={isLandDetailsChanged}
                        onChange={(event)=>{setIsLandDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

              {isLandDetailsChanged === 'Yes' && (
                <Grid item xs={12} >
                  <TextField
                    label="If yes, specify the changes in the details of the land"
                    name="landDetailsChanges"
                    variant="outlined"
                    multiline // Enable multi-line mode
                    rows={3} // Number of rows
                    fullWidth
                  />
                </Grid>
              )}
                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the details of the trees to be cut provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        required
                        value={isTreeDetailsChanged}
                        onChange={(event)=>{setIsTreeDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                {isTreeDetailsChanged === 'Yes' && (
                  <Grid item xs={12} >
                    <TextField
                      label="If yes, specify the changes in the details of the trees to be cut "
                      name="treeDetailsChanges"
                      variant="outlined"
                      multiline // Enable multi-line mode
                      rows={3} // Number of rows
                      fullWidth
                    />
                  </Grid>
                )}

                <Grid  item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Are there any other owners for this land?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        required
                        value={areThereOtherOwners}
                        onChange={(event)=>{setAreThereOtherOwners(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
               
                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Are there any disputes over this land?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={areThereDisputes}
                        required
                        onChange={(event)=>{setAreThereDisputes(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Do you approve this request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        required
                        value={isRequestApproved}
                        onChange={(event)=>{setIsRequestApproved(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value='No' control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                {isRequestApproved === 'No' && (
                  <Grid item xs={12} >
                    <TextField
                      label="If no, specify the reasons"
                      name="approvalReasons"
                      variant="outlined"
                      multiline // Enable multi-line mode
                      rows={3} // Number of rows
                      fullWidth
                    />
                  </Grid>
                )}


            </Grid>
            <Box marginTop={2} display="flex" alignItems="center">
                <Checkbox required />
                <Typography  color={'red'} marginTop={2}>
                I hereby certify that I have conducted an inspection of the land and trees specified on the date indicated above. Additionally, I have thoroughly examined all relevant documents verifying the ownership of the land.
                </Typography>
            </Box>
            <Box>
                <Button  variant="contained" type="submit"
                sx={{
                    marginTop:2,
                    marginLeft:1,
                    width: "10vw",
                    height: "8vh",
                    backgroundColor: "#4169E1",
                    color:"white"
                }}>
                    Submit
                </Button>
            </Box>
            <ToastContainer />
          </Box>
        </form>
    </Box>
    );

}

export default TimberCuttingPermissionRequest