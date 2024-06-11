import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { grey, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const CheckStatus = () => {
    const navigate = useNavigate();

    // Navigate based on the request type
    const handleViewDetails = (requestType) => {
        if (requestType === "Transport") {
                navigate('/citizen/checkstatus/transport')
        }
        else if (requestType === "Cutting") {
            navigate('/citizen/checkstatus/cutting')
    }
      };
    
      const rows = [
        { id: 1, requestType: 'Transport', date: '2023-05-01', status: 'Approved' },
        { id: 2, requestType: 'Transport', date: '2023-04-15', status: 'Pending' },
        { id: 3, requestType: 'Cutting', date: '2023-03-10', status: 'Rejected' },
        { id: 4, requestType: 'Cutting', date: '2023-02-20', status: 'Approved' },
      ];

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
              onClick={() => handleViewDetails(params.row.requestType)}
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