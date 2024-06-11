import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { grey, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetAllRequests from "../../hooks/useGetAllRequests";

const CheckStatus = () => {

    const {getAllRequests,requests, isLoading, error} = useGetAllRequests();
    const [rows, setRows] = useState([]); 
    const navigate = useNavigate();

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
              date: new Date(row.date).toDateString(),
              status: row.status,
          }));
          setRows(updatedRows);
      }
  }, [requests, isLoading]);

    // Navigate based on the request type
    const handleViewDetails = (id, requestType) => {
      
      // Navigate based on the request type and reqId
      if (requestType === "transport") {
          navigate(`/citizen/checkstatus/transport/${id}`);
      } else if (requestType === "cutting") {
          navigate(`/citizen/checkstatus/cutting/${id}`);
      }
  };

  const columns = [
    { field: "id", headerName: "Reference No", width: 150},
    { field: "requestType", headerName: "Request Type", width: 250 },
    { field: "date", headerName: "Date", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
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
              onClick={() => handleViewDetails(params.row.id, params.row.requestType)}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={params.row.status !== "Approved"}
              sx={{ 
                marginRight: 10,  
                backgroundColor: pink[800],
                '&:hover': {
                    backgroundColor: pink[800],
                },
            }}
            >
              Download Permit
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
            
           {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Typography> Loading...</Typography>
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : (
                 
                   <DataGrid
                  sx={{
                      '&.MuiDataGrid-root': {
                          border: 'none',
                      },
                  }}
                      rows={rows}
                      columns={columns}
                  />     
                )}
                 
        </Box>
    </Box>
    
  );
}

export default CheckStatus;