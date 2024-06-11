import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControl,  Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { grey } from '@mui/material/colors';
import Header from '../../components/header/Header';
import useTimberCuttingRequest from '../../hooks/useTimberCuttingRequest';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimberCuttingLicense= () => {
  const gramaDivisions = [
    'Morawinna',
    'Walana',
    'Seeduwa',
    'Mahavila',
    'Mahabellana'

  ];

  const dsDivisions = [
    'Panadura',
    'Bandaragama',
    'Horana',
    'Wadduwa'
  ]

  const landOwnerships=[
    'Deed',
    'Grant Certificate',
    'Power of Attorney',
    'Joint Ownership Number'
  ]

  const initialRows = Array.from({ length: 2 }, (_, index) => ({
    no: index + 1,
    typeOfTree: '',
    circumference: '',
    height: '',
    reason: ''
  }));

  const [tableData, setTableData] = useState(initialRows);

  const handleInputChange = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };

  const getTableDataAsJson = () => {
    // Filter out rows that are completely empty
    const filteredData = tableData.filter(row => 
      row.typeOfTree.trim() !== '' || 
      row.circumference.trim() !== '' || 
      row.height.trim() !== '' || 
      row.reason.trim() !== ''
    );

    if (filteredData.length === 0) {
      toast.error('All rows are empty. Please fill in at least one row.', {
        position: "top-right",
        autoClose: 5000,
      });
      return null;
    }
    
    const emptyFields = filteredData.some(row => !row.typeOfTree.trim() || !row.circumference.trim() || !row.height.trim() || !row.reason.trim());
    
    if (emptyFields) {
      toast.error('Some filled rows have empty fields. Please completely fill those rows.', {
        position: "top-right",
        autoClose: 5000,
      });
      return null;
    }
    
    return JSON.stringify(filteredData, null, 2);
  };

  const [gramaDivision, setGramaDivision] = useState('');
  const [dsDivision, setDsDivision] = useState('');
  const [ownership, setOwnership] = useState('');
 

  const { cuttingRequest} = useTimberCuttingRequest();

  const { user } = useAuthContext()
  const navigate = useNavigate();
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let tableData = getTableDataAsJson();
    
    if(tableData != null) {
      const data =   {
        username: user.username,
        land_name: event.target.landname.value,
        land_address: event.target.landaddress.value,
        land_ownership: ownership,
        land_ownership_number:  event.target.ownershipNumber.value,
        grama_division: gramaDivision,
        ds_division: dsDivision,
        tree_details: tableData
      }
     
      //send request data to server side
      cuttingRequest(data)
      .then(() => {
        toast.success('Submission successful!', {
          position: "top-right",
          onClose: () => {
            navigate("/citizen"); // Navigate after toast is closed
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
    }    
  };
 

  return (
    
    <Box>
      <Header isLoggedIn={true}/>
      <form onSubmit={handleFormSubmit}>
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
                      marginBottom={"30px"}
                      textTransform={'capitalize'}
                      >
                      Requesting permission to cut dangerous jackfruit, palm or coconut Trees
              </Typography>
          </Box>
    
          <Typography 
              variant="h6" 
              margin={1} 
              marginBottom={"10px"}  
              color={grey[900]}
              >
              Details of the applicant
          </Typography>
          <Grid
                  container
                  spacing={2}
                  display={"flex"}
                  flexDirection={"row"}
                >
              <Grid item xs={6}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue="Nimal Perera"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                  required
                  id="outlined-required"
                  label="NIC"
                  defaultValue="8757383636"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Address"
                  defaultValue="23/1,Upadya Mawatha,Panadura"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Mobile Number"
                  defaultValue="0711765469"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  />
              </Grid>
          </Grid>
          
          <Typography 
              variant="h6" 
              margin={1} 
              marginBottom={"20px"}  
              color={grey[900]}
              >
              Details of the trees requesting to be cut
          </Typography>
          <TableContainer component={Paper} sx={{margin:1, marginBottom:4}}>
              <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor : grey[400] , alignContent:'center'}}>
                  <TableRow >
                      <TableCell colSpan={1} align='center'> No </TableCell>
                      <TableCell colSpan={2} align='center'> Type of Tree </TableCell>
                      <TableCell colSpan={1} align='center'> Circumference (m) </TableCell>
                      <TableCell colSpan={1} align='center'> Height (m) </TableCell>
                      <TableCell colSpan={5} align='center'> Reason to be considered as dangerous </TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: grey[100] }}>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.no}</TableCell>
                        <TableCell align="center" colSpan={2}>
                          <TextField
                            fullWidth
                            value={row.typeOfTree}
                            onChange={(e) => handleInputChange(index, 'typeOfTree', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            value={row.circumference}
                            onChange={(e) => handleInputChange(index, 'circumference', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            value={row.height}
                            onChange={(e) => handleInputChange(index, 'height', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            value={row.reason}
                            onChange={(e) => handleInputChange(index, 'reason', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
          </TableContainer>

          <Typography 
              variant="h6" 
              margin={1} 
              marginBottom={"10px"}  
              color={grey[900]}
              >
              Details of the land where the above mentioned trees are located
          </Typography>
          <Grid
                  container
                  spacing={1}
                  display={"flex"}
                  flexDirection={"row"}
                >
              <Grid item xs={6}>
                  <TextField
                  required
                  name="landname"
                  id="outlined-required"
                  label="Name of the land"
                  fullWidth
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                  required
                  name="landaddress"
                  id="outlined-required"
                  label="Address of the land "
                  fullWidth
                  />
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Grama Division</InputLabel>
                <Select 
                  label="Grama Division" 
                  id="gramadivision"
                  fullWidth 
                  name="gramadivision"
                  value={gramaDivision}
                  required
                  onChange={(e) => setGramaDivision(e.target.value)}>
                  {gramaDivisions.map((division, index) => (
                    <MenuItem key={index} value={division}>
                      {division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Divisional Secretariat Division</InputLabel>
                <Select 
                  label="Divisional Secretariat Division" 
                  fullWidth 
                  id="dsdivision"
                  name="dsdivision"
                  value={dsDivision}
                  onChange={(e) => setDsDivision(e.target.value)}
                  required>
                  {dsDivisions.map((division, index) => (
                    <MenuItem key={index} value={division}>
                      {division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              
              <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel>Ownership of the land</InputLabel>
                <Select
                  label="Ownership of the land"
                  fullWidth
                  name="landownership"
                  value={ownership}
                  onChange={(e) => setOwnership(e.target.value)}
                  required
                >
                  {landOwnerships.map((ownership, index) => (
                    <MenuItem key={index} value={ownership}>
                      {ownership}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                  required
                  id="outlined-required"
                  name= "ownershipNumber"
                  label="Deed / Grant Certificate / Power of Attorney /Joint Ownership Registered Number"
                  />
                </FormControl>
              </Grid>
        </Grid>
        <Box marginTop={3} marginBottom={1} display="flex" alignItems="center">
            <Checkbox required />
            <Typography paddingTop={2} color={'red'}>
              I hereby declare that all the information I have provided in this document is true and accurate to the best of my knowledge. Furthermore, I affirm that I am the rightful owner of the aforementioned property and have full legal authority to make decisions regarding it.
            </Typography>
        </Box>
          <Button  variant="contained" type="submit"
          sx={{
              marginTop:2,
              width: "10vw",
              height: "8vh",
              backgroundColor: "#4169E1",
              color:"white"
          }}>
              Submit
          </Button> 
          <ToastContainer />
      </Box>
      </form>
    </Box>
  );
}

export default TimberCuttingLicense