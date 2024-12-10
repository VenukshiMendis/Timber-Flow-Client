import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { grey} from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import useGetAllRequests from "../../hooks/useGetAllRequests";
import { useEffect, useState } from "react";

const CheckStatus = () => {
    const navigate = useNavigate();

    // Navigate based on the request type
    const handleViewDetails = (id,requestType) => {
      console.log(id)
        if (requestType === "transport") {
                navigate(`/gramasewaka/viewtransportrequest/${id}`)
        }
        else if (requestType === "cutting") {
            navigate(`/gramasewaka/viewcuttingrequest/${id}`)
    }
      };
      
    const url ="http://localhost:4000/api/divisionalsecretary/allPreviousRequests";

    const {getAllRequests,requests, isLoading} = useGetAllRequests(url);
    const [rows, setRows] = useState([]); 


    // Fetch all permit request made by the citizen at the initial rendering of the component 
    useEffect(() => {
      console.log("get requests");
      getAllRequests()
    }, []);
    
    useEffect(() => {
        // Update rows when requests change and isLoading becomes false
        if (!isLoading && requests.length > 0) {
            console.log(requests);

            // Map requests to rows and update rows state
            const updatedRows = requests.map((row) => ({
                id: row.req_id,
                requestType: row.request_type,
                name: row.name,
                nic: row.nic,
                date: new Date(row.date).toDateString(),
                gramaSewakaApproval: row.grama_sewaka_approval,
                divisionalSecretaryApproval:row.divisional_secretary_approval,
                status:row.status

            }));
            setRows(updatedRows);
        }
    }, [requests, isLoading]);    

  const columns = [
    { field: "id", headerName: "Reference No", width: 100},
    { field: "requestType", headerName: "Request Type", width: 150 },
    { field: "name", headerName: "Name of the Applicant", width: 200 },
    { field: "nic", headerName: "NIC Number", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "gramaSewakaApproval", headerName: "Grama Sewaka Approval", width: 250 },
    { field: "divisionalSecretaryApproval", headerName: "Divisional Secretary Approval", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    {
        field: "actions",
        headerName: "Actions",
        width: 400,
        renderCell: (params) => (
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => handleViewDetails(params.row.id,params.row.requestType)}
            >
              View Details
            </Button>
          </Box>
        ),
      },
  ];

  return (
    <Box>
        <Header isLoggedIn={true}/>
        <Box 
                sx={{
                    display: 'flex',
                    marginLeft:10,
                    justifyContent: 'left',
                    textAlign: 'center'
                }}
            >
                <Typography
                        fontSize={"1.5rem"}
                        fontWeight="bold"
                        marginTop={"20px"}
                        textTransform={'capitalize'}
                        color={grey[800]}
                        >
                        Your Timber Permit Requests 
                </Typography>
            </Box>
        <Box
        sx={{
            margin: 10,
            marginTop:3,
            height: 520,
            backgroundColor:'white',
            boxShadow: 3,
            padding:2,
        }}
        >           
            <DataGrid
            sx={{
                '&.MuiDataGrid-root': {
                    border: 'none',
                },
            }}
            rows={rows}
            columns={columns}
            />
        </Box>
    </Box>
    
  );
}

export default CheckStatus;