import { Bolt as BoltIcon, Flight as FlightIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppUi from "../utils/AppUi";

function FirstPage() {
  const navigate = useNavigate();
  const text = "In consequat, quam id sodales hendrerit eros mi molestie leo.";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <AppUi />
      <Box
        sx={{
          bgcolor: "#080924",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "white",
            marginTop: "60px",
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        >
          Calculate Carbon Emission
        </Typography>
        <Button
          variant="outlined"
          sx={{ position: "absolute", top: "70px", right: "45px" }}
          onClick={() => {
            navigate("/previous");
          }}
        >
          Previous Responses
        </Button>

        <Grid container spacing={5} sx={{ marginLeft: "20px" }}>
          <Grid item sx={{ marginLeft: "-50px" }}>
            <Card
              sx={{
                width: 300,
                height: 260,
                bgcolor: "#1B1C2A",
                color: "white",
                borderRadius: 3,
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <CardMedia>
                  <BoltIcon
                    sx={{
                      fontSize: 40,
                      color: "#FFFFFF",
                      bgcolor: "#242540",
                      borderRadius: "50%",
                      p: 2,
                    }}
                  />
                </CardMedia>
              </Box>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                  Electricity
                </Typography>
                <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                  {text}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6C63FF" }}
                  onClick={() => {
                    navigate("/calculate");
                  }}
                >
                  Calculate
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item>
            <Card
              sx={{
                width: 300,
                height: 260,
                bgcolor: "#1B1C2A",
                borderRadius: 3,
                color: "white",
                p: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <CardMedia>
                  <FlightIcon
                    sx={{
                      fontSize: 40,
                      color: "#FFFFFF",
                      bgcolor: "#242540",
                      borderRadius: "50%",
                      p: 2,
                    }}
                  />
                </CardMedia>
                <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                  Flight
                </Typography>
                <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                  {text}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6C63FF" }}
                  onClick={() => {
                    navigate("/flightestimate");
                  }}
                >
                  Calculate
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FirstPage;
