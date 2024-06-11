import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControl,  FormControlLabel, FormLabel,  Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {  grey} from '@mui/material/colors';
import Header from '../../components/header/Header';
import useTimberTransportRequest from '../../hooks/useTimberTransportRequest';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimberTransportLicense= () => {
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

    const initialRows = Array.from({ length: 5 }, (_, index) => ({
    no: index + 1,
    typeOfTimber: '',
    circumference: '',
    length: '',
    numberOfPieces: ''
    }));

    const [tableData, setTableData] = useState(initialRows);

    const handleInputChange = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
    };

    const getTableDataAsJson = () => {
        console.log(tableData)

        // Filter out rows that are completely empty
        const filteredData = tableData.filter(row => 
            row.typeOfTimber.trim() !== '' || 
            row.circumference.trim() !== '' || 
            row.length.trim() !== '' || 
            row.numberOfPieces.trim() !== ''
        );
        console.log(filteredData)

        if (filteredData.length === 0) {
            toast.error('All rows are empty. Please fill in at least one row.', {
            position: "top-right",
            autoClose: 5000,
            });
            return null;
        }
        
        const emptyFields = filteredData.some(row => !row.typeOfTimber.trim() || !row.circumference.trim() || !row.length.trim() || !row.numberOfPieces.trim());
        
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
    const [supplier, setSupplier] = useState("private store");

    const handleChange = (event) => {
        setSupplier(event.target.value);
    };
    

    const {transportRequest} = useTimberTransportRequest();

    const { user } = useAuthContext()
    const navigate = useNavigate();
    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let tableData = getTableDataAsJson();
        
        if(tableData != null) {
            const data =   {
            username: user.username,
            supplier_name : event.target.supplierName.value , 
            supplier_address :event.target.supplierAddress.value, 
            timber_obtained_from : supplier,
            grama_division: gramaDivision,
            ds_division: dsDivision,
            destination_address : event.target.destinationAddress.value, 
            transport_vehicle_number : event.target.vehicleNumber.value,  
            details_of_trees: tableData
            }

            // Add store details if supplier is a private store
            if (supplier === "private store") {
                data.store_name = event.target.storeName.value;
                data.store_address = event.target.storeAddress.value;
                data.land_name = ""; // Clear land details
                data.land_address = "";
                data.land_ownership = "";
                data.land_ownership_number = "";
            } 
            // Add land details if supplier is a private land owner
            else if (supplier === "private land owner") {
                data.store_name = ""; // Clear store details
                data.store_address = "";
                data.land_name = event.target.landName.value;
                data.land_address = event.target.landAddress.value;
                data.land_ownership = ownership;
                data.land_ownership_number = event.target.ownershipNumber.value;
            }

            console.log(data)
            
            //send request data to server side
            transportRequest(data)
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
        }}
        noValidate
        autoComplete="off">
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                <Typography
                        fontSize={"1.6rem"}
                        fontWeight="bold"
                        marginBottom={"30px"}
                        textTransform={'capitalize'}
                        >
                        Request to obtain a Timber Transport Permit
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
                    marginBottom={3}
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
                marginBottom={"10px"}  
                color={grey[900]}
                >
                Details of the supplier from whom you procured the timber
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
                    label="Name of the supplier"
                    fullWidth
                    name="supplierName"
                    />
                </Grid>
                <Grid item xs={6} >
                    <TextField
                    required
                    id="outlined-required"
                    label="Address of the supplier"
                    fullWidth
                    name="supplierAddress"
                    />
                </Grid>
                <Grid container item xs={12} marginLeft={1} marginBottom={2}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Timber is obtained from</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        value={supplier}
                        onChange={handleChange}>
                        <FormControlLabel value="private store" control={<Radio />} label="A pivate store" />
                        <FormControlLabel value="land owner" control={<Radio />} label="A private land owner" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            {supplier === 'private store' && (
                <>
                <Typography 
                    variant="h6" 
                    margin={1} 
                    marginBottom={"10px"}  
                    color={grey[900]}
                    >
                    Details of the store from where timber is obtained
                </Typography>
                <Grid
                        container
                        spacing={2}
                        display={"flex"}
                        flexDirection={"row"}
                        marginBottom={3}
                    >
                    <Grid item xs={6}>
                        <TextField
                        id="outlined-required"
                        label="Name of the store"
                        fullWidth
                        name="storeName"
                        required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        id="outlined-required"
                        label="Address of the store"
                        fullWidth
                        name="storeAddress"
                        required
                        />
                    </Grid>
                </Grid>
                </>
            )}
            {supplier === 'land owner' && (
                <>
                <Typography 
                variant="h6" 
                margin={1} 
                marginBottom={"10px"}  
                color={grey[900]}
                >
                Details of the land from where timber is obtained
            </Typography>
            <Grid
                    container
                    spacing={1}
                    display={"flex"}
                    flexDirection={"row"}
                >
                <Grid item xs={6}>
                    <TextField
                    id="outlined-required"
                    label="Name of the land"
                    name="landName"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="outlined-required"
                    label="Address of the land"
                    name="landAddress"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6} >
                <FormControl fullWidth  >
                <InputLabel>Ownership of the land</InputLabel>
                <Select
                    label="Ownership of the land"
                    fullWidth
                    name="landOwnership"
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
                    label="Deed / Grant Certificate / Power of Attorney / Joint Ownership Number"
                    />
                </FormControl>
                </Grid>
            </Grid>
                </>
            
            )}
            <Typography 
                variant="h6" 
                margin={1} 
                marginBottom={"10px"}  
                color={grey[900]}
                >
                Location details of the timber procument (private store / land)
            </Typography>
            <Grid
                container
                spacing={1}
                display={"flex"}
                flexDirection={"row"}
                marginBottom={3}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                    <InputLabel>Grama Division</InputLabel>
                    <Select 
                        label="Grama Division"
                        fullWidth
                        name="gramadivision"
                        value={gramaDivision}
                        required
                        onChange={(e) => setGramaDivision(e.target.value)}
                        >
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
                        required
                        fullWidth
                        id="dsdivision"
                        name="dsdivision"
                        value={dsDivision}
                        onChange={(e) => setDsDivision(e.target.value)}>
                            {dsDivisions.map((division, index) => (
                            <MenuItem key={index} value={division}>
                                {division}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Typography 
                variant="h6" 
                margin={1} 
                marginBottom={"10px"}  
                color={grey[900]}
                >
                Transportation and Destination Details for Timber
            </Typography>
            <Grid
                    container
                    spacing={2}
                    display={"flex"}
                    flexDirection={"row"}
                    marginBottom={3}   
                >
                <Grid item xs={6}>
                    <TextField
                    id="outlined-required"
                    label="Destination address"
                    name= "destinationAddress"
                    fullWidth
                    required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="outlined-required"
                    label="Transport Vehicle Number"
                    name = "vehicleNumber"
                    fullWidth
                    required
                    />
                </Grid>
            </Grid>
            
            <Typography 
                variant="h6" 
                margin={1} 
                marginBottom={"20px"}  
                color={grey[900]}
                >
                Details of the timber to be transported
            </Typography>
            <TableContainer component={Paper} sx={{margin:1, marginBottom:4}}>
                <Table aria-label="simple table">
                    <TableHead sx={{ backgroundColor : grey[400] , alignContent:'center'}}>
                    <TableRow >
                        <TableCell colSpan={1} align='center'> No </TableCell>
                        <TableCell colSpan={2} align='center'> Type of Timber </TableCell>
                        <TableCell colSpan={1} align='center'> Circumference (m) </TableCell>
                        <TableCell colSpan={1} align='center'> Length (m) </TableCell>
                        <TableCell colSpan={5} align='center'> Number of pieces </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: grey[100] }}>
                        {tableData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{row.no}</TableCell>
                            <TableCell align="center" colSpan={2}>
                            <TextField
                                fullWidth
                                value={row.typeOfTimber}
                                onChange={(e) => handleInputChange(index, 'typeOfTimber', e.target.value)}
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
                                value={row.length}
                                onChange={(e) => handleInputChange(index, 'length', e.target.value)}
                            />
                            </TableCell>
                            <TableCell align="center">
                            <TextField
                                fullWidth
                                value={row.numberOfPieces}
                                onChange={(e) => handleInputChange(index, 'numberOfPieces', e.target.value)}
                            />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Box marginTop={4} display="flex" alignItems="center">
                <Checkbox required />
                <Typography  color={'red'}>
                    I hereby declare that all the information I have provided in this document is true and accurate to the best of my knowledge. 
                </Typography>
            </Box>

            <Box>
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
            </Box>
            <ToastContainer />
        </Box>
        </form>
    </Box>
  );
}

export default TimberTransportLicense