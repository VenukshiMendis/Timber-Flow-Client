import { Box} from "@mui/material";
import Header from "../../components/header/Header";
import TimberCuttingRequestDetails from "../Common/TimberCuttingRequestDetails"
import {  useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import TimberCuttingApprovalByGramaSewaka from "../Common/TimberCuttingApprovalByGramaSewaka";

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
          <TimberCuttingApprovalByGramaSewaka reqId={reqId}/> 
        </Box>
    </Box>
    );

}

export default TimberCuttingPermissionRequest