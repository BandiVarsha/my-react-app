import { Bolt as BoltIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import AppUi from "../utils/AppUi";

function FirstPage() {
  const navigate = useNavigate();
  const text = "In consequat, quam id sodales hendrerit eros mi molestie leo.";

  return (
    <>
      <AppUi />
      <Box
        sx={{
          bgcolor: "#080924",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Card
          sx={{
            width: 300,
            bgcolor: "#1B1C2A",
            color: "white",
            mt: "150px",
            ml: "20px",
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
            <Typography variant="body2">{text}</Typography>
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
      </Box>
    </>
  );
}

export default FirstPage;
