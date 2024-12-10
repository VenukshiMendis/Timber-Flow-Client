import Header from "../../components/header/Header";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography} from "@mui/material";
import TimberTransportRequestDetails from "../Common/TimberTransportRequestDetails";
import { useNavigate, useParams } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAddGramaSewakaApproval from "../../hooks/useAddGramaSewakaApproval";
import { useState } from "react";
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimberTransportPermissionRequest = () => {
    const { reqId } = useParams();
    const navigate = useNavigate();
  
    const url = `http://localhost:4000/api/gramasewaka/addTimberTransportApprovalByGramaSewaka`
    const { addApprovalDetails } = useAddGramaSewakaApproval(url);
  
    const [dateOfInspection, setDateOfInspection] = useState(null);
    const [timeOfInspection, setTimeOfInspection] = useState(null);
    const [isApplicantDetailsChanged, setIsApplicantDetailsChanged] = useState('No');
    const [isProcumentDetailsChanged, setIsProcumentDetailsChanged] = useState('No');
    const [isTransportationDetailsChanged, setIsTransportationDetailsChanged] = useState('No');
    const [isTimberDetailsChanged, setIsTimberDetailsChanged] = useState('No');
    const [areThereDisputes, setAreThereDisputes] = useState('No');
    const [isRequestApproved, setIsRequestApproved] = useState('No');
    
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      // Check if all required radio groups are filled
      if (!dateOfInspection || !timeOfInspection || !isApplicantDetailsChanged || !isProcumentDetailsChanged || !isTransportationDetailsChanged || !isTimberDetailsChanged || !areThereDisputes || !isRequestApproved) {
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
            is_applicant_details_changed: isApplicantDetailsChanged,
            applicant_details_changes: isApplicantDetailsChanged === 'Yes' ? event.target.applicantDetailsChanges.value : '',
            is_procurement_details_changed: isProcumentDetailsChanged,
            procurement_details_changes:  isProcumentDetailsChanged === 'Yes' ? event.target.procurementChanges.value : '',
            is_transport_destination_details_changed: isTransportationDetailsChanged,
            transport_destination_details_changes: isTransportationDetailsChanged  === 'Yes' ? event.target.transportationChanges.value : '',
            is_timber_details_changed: isTimberDetailsChanged,
            timber_details_changes: isTimberDetailsChanged === 'Yes' ? event.target.timberChanges.value : '',
            are_there_disputes: areThereDisputes,
            is_request_approved: isRequestApproved,
            reasons_for_disapproval: isRequestApproved === 'No' ? event.target.reasonsForDisapproval.value : '', 
        }
  
        //send request data to server side
        addApprovalDetails(data)
        .then(() => {
          toast.success('Submission successful!', {
            position: "top-right",
            onClose: () => {
              navigate("/gramasewaka/alltransportrequests"); // Navigate after toast is closed
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
         <TimberTransportRequestDetails reqId={reqId}/>
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
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the details of the applicant provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={isApplicantDetailsChanged}
                        onChange={(event)=>{setIsApplicantDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
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
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the details related to the timber procument provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={isProcumentDetailsChanged}
                        onChange={(event)=>{setIsProcumentDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                {isProcumentDetailsChanged === 'Yes' && (
                    <Grid item xs={12} >
                    <TextField
                        label="If yes, specify the changes in the details of the procument"
                        name="procurementChanges"
                        variant="outlined"
                        multiline // Enable multi-line mode
                        rows={3} // Number of rows
                        fullWidth
                    />
                    </Grid>
                )}

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the transportation and destination details provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={isTransportationDetailsChanged}
                        onChange={(event)=>{setIsTransportationDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                {isTransportationDetailsChanged === 'Yes' && (
                    <Grid item xs={12} >
                    <TextField
                        label="If yes, specify the changes in transportation and destination details"
                        name="transportationChanges"
                        variant="outlined"
                        multiline // Enable multi-line mode
                        rows={3} // Number of rows
                        fullWidth
                    />
                    </Grid>
                )}

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Is there any change in the details of the timber to be transported provided in the request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={isTimberDetailsChanged}
                        onChange={(event)=>{setIsTimberDetailsChanged(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                
                {isTimberDetailsChanged === 'Yes' && (
                <Grid item xs={12} >
                  <TextField
                    label="If yes, specify the changes in the details of timber to be transported"
                    name="timberChanges"
                    variant="outlined"
                    multiline // Enable multi-line mode
                    rows={3} // Number of rows
                    fullWidth
                  />
                </Grid>
                )}

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Are there any disputes over this land?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={areThereDisputes}
                        onChange={(event)=>{setAreThereDisputes(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} marginLeft={1} marginBottom={1}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Do you approve this request?</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={isRequestApproved}
                        onChange={(event)=>{setIsRequestApproved(event.target.value)}}
                        >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
                </Grid>

                {isRequestApproved === 'No' && (
                    <Grid item xs={12} >
                    <TextField
                        label="If no, specify the reasons"
                        name="reasonsForDisapproval"
                        variant="outlined"
                        multiline // Enable multi-line mode
                        rows={3} // Number of rows
                        fullWidth
                    />
                    </Grid>
                )}


            </Grid>
            <Box marginTop={1} display="flex" alignItems="center">
                <Checkbox required />
                <Typography  color={'red'} marginTop={2}>
                I hereby certify that I have conducted an inspection of the timber and specified in the request, on the date indicated above. Additionally, I have thoroughly examined all relevant documents verifying the procument of timber.
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

export default TimberTransportPermissionRequest