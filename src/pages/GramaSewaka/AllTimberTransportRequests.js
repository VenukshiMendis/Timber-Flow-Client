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

    const url ="http://localhost:4000/api/gramasewaka/allTransportPermitRequests";

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
                name: row.name,
                nic: row.nic,
                date: new Date(row.date).toDateString(),
            }));
            setRows(updatedRows);
        }
    }, [requests, isLoading]);  
    
    const columns = [
      { field: "id", headerName: "Reference No", width: 150},
      { field: "name", headerName: "Name of the Applicant", width: 350 },
      { field: "nic", headerName: "NIC Number", width: 300 },
      { field: "date", headerName: "Date", width: 250 },
      {
          field: "actions",
          headerName: "Actions",
          width: 250,
          renderCell: (params) => (
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 10 }}
                onClick={() => navigate(`/gramasewaka/transportrequest/${params.row.id}`)}
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
                       Timber Transport License Requests from Your Grama Division
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