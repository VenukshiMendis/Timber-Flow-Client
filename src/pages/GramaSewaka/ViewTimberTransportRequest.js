import Header from "../../components/header/Header";
import { Box} from "@mui/material";
import TimberTransportRequestDetails from "../Common/TimberTransportRequestDetails";
import TimberTransportApprovalByGramaSewaka from "../Common/TimberTransportApprovalByGramaSewaka"
import { useParams } from "react-router-dom";

const ViewTimberTransportRequest = () => {
    const { reqId } = useParams();

    return (
    <Box>
      <Header isLoggedIn={true}/>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1 },
          margin: 10,
          marginBottom:2,
          padding: 5,
          paddingBottom:5,
          borderRadius: 8, 
          boxShadow: 3,
          backgroundColor: 'white'
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

export default ViewTimberTransportRequest