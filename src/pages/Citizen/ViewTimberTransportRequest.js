import Header from "../../components/header/Header";
import { Box} from "@mui/material";
import TimberTransportRequestDetails from '../Common/TimberTransportRequestDetails'
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
          padding: 5,
          borderRadius: 8, 
          boxShadow: 3,
          backgroundColor: 'white'
        }}
        noValidate
        autoComplete="off"
      >
        <TimberTransportRequestDetails reqId={reqId}/>
        </Box>
    </Box>
    );

}

export default ViewTimberTransportRequest