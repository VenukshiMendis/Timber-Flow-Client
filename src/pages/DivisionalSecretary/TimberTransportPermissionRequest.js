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
import TimberTransportApprovalByGramaSewaka from "../Common/TimberTransportApprovalByGramaSewaka";

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

        <Box
        sx={{
          '& .MuiTextField-root': { m: 1 },
          margin: 10,
          padding: 5,
          marginTop:5,
          borderRadius: 8, 
          boxShadow: 3,
          backgroundColor: 'white'
        }}
        noValidate
        autoComplete="off">
          <TimberTransportApprovalByGramaSewaka reqId={reqId}/> 
        </Box>
    </Box>
    );

}

export default TimberTransportPermissionRequest