import { Box, FormControl, FormControlLabel, FormLabel, Grid,  Radio, RadioGroup,  Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { grey } from "@mui/material/colors";
import TimberCuttingRequestDetails from "../Common/TimberCuttingRequestDetails"
import { useParams } from "react-router-dom";

const TimberCuttingPermissionRequest = () => {
  const { reqId } = useParams();

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
        <TimberCuttingRequestDetails reqId={reqId}/>
        <Typography 
                variant="h6" 
                margin={1} 
                marginTop={3}
                color={grey[900]}
                >
                Grama Sewaka Approval
            </Typography>
            <Grid container item xs={12} marginLeft={1} marginBottom={2}>
                <FormControl sx={{flexDirection:'row', }} >
                    <FormLabel  required sx={{ marginTop: 1, marginRight:2, fontSize:'1.2rem', color:grey[800]}}>Timber is obtained from</FormLabel>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group" 
                        // value={supplier}
                        // onChange={handleChange}
                        >
                        <FormControlLabel value="private store" control={<Radio />} label="A pivate store" />
                        <FormControlLabel value="land owner" control={<Radio />} label="A private land owner" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
        </Box>
    </Box>
    );

}

export default TimberCuttingPermissionRequest