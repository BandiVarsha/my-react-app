import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Calculate() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#080924",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          padding: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            color: "#ffffff",
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: "black" }}>
            Calculate Carbon Emission
          </Typography>
          <Divider />
          <TextField
            select
            label="Type"
            variant="outlined"
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#1a1a2e",
                    color: "white",
                  },
                },
              },
            }}
          >
            <MenuItem value="type">Estimate</MenuItem>
          </TextField>
          <TextField
            select
            label="Electricity Unit"
            variant="outlined"
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#1a1a2e",
                    color: "white",
                  },
                },
              },
            }}
          >
            <MenuItem value="mwh">mwh</MenuItem>
            <MenuItem value="kwh">kwh</MenuItem>
          </TextField>

          <TextField label="Electricity Value" variant="outlined" fullWidth />
          <TextField
            select
            label="Country"
            variant="outlined"
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#1a1a2e",
                    color: "white",
                  },
                },
              },
            }}
          >
            <MenuItem value="us">US</MenuItem>
          </TextField>
          <TextField
            select
            label="State"
            variant="outlined"
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#1a1a2e",
                    color: "white",
                  },
                },
              },
            }}
          >
            <MenuItem value="fl">Florida</MenuItem>
          </TextField>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#4a4a4a",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#000000",
              },
            }}
          >
            Submit
          </Button>

          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#0d0d2b",
              padding: "20px",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          >
            <Typography variant="body1">ESTIMATE RESPONSE</Typography>
            <Typography variant="body2">Country: </Typography>
            <Typography variant="body2">State:</Typography>
            <Typography variant="body2">Electricity Unit: </Typography>
            <Typography variant="body2">Electricity Value:</Typography>
            <Typography variant="body2">Estimated At:</Typography>
            <Typography variant="body2" color="error">
              Carbon (In gms):
            </Typography>
            <Typography variant="body2">Carbon (In lb): </Typography>
            <Typography variant="body2">Carbon (In Kg):</Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Calculate;
