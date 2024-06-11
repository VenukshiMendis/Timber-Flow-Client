import { Box} from "@mui/material";
import Header from "../../components/header/Header";
import TimberCuttingRequestDetails from "../Common/TimberCuttingRequestDetails";
import { useParams } from "react-router-dom";

const ViewTimberCuttingRequest = () => {
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
                <TimberCuttingRequestDetails reqId={reqId} />
            </Box>
        </Box>
    );
}

export default ViewTimberCuttingRequest;
