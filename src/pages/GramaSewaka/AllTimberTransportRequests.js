import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { grey} from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const CheckStatus = () => {
    const navigate = useNavigate();

      const rows = [
        { id: 1, name: 'Nimal Perera', nic: '8757383636', date: '2023-05-01', requestType: 'Transport', status: 'Approved' },
        { id: 2, name: 'Sunil Wijesinghe', nic: '8757383746', date: '2023-04-15', requestType: 'Transport', status: 'Pending' },
        { id: 3, name: 'Kamal Jayasinghe', nic: '8757383556', date: '2023-03-10', requestType: 'Cutting', status: 'Rejected' },
        { id: 4, name: 'Ruwan Fernando', nic: '8757383446', date: '2023-02-20', requestType: 'Cutting', status: 'Approved' },
        { id: 5, name: 'Anura Silva', nic: '8757383226', date: '2023-01-30', requestType: 'Transport', status: 'Pending' },
        { id: 6, name: 'Dilshan Perera', nic: '8757383116', date: '2022-12-25', requestType: 'Cutting', status: 'Approved' },
      ];

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
                  onClick={() => navigate('/gramasewaka/transportrequest')}
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