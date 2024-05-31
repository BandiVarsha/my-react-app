import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, TextField, Button, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
interface Leg {
  departure_airport: string;
  destination_airport: string;
}
interface EstimateAttributes {
  passengers: number;
  legs: Leg[];
  distance_value: number;
  distance_unit: string;
  estimated_at: string;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;
}
const FlightEstimate: React.FC = () => {
  const [type, setType] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [estimate, setEstimate] = useState<EstimateAttributes | null>(null);
  const navigate = useNavigate();
  const fetchEstimate = async () => {
    try {
      const response = await axios.post(
        "https://www.carboninterface.com/api/v1/estimates",
        {
          type,
          passengers,
          legs: [{ departure_airport: departureAirport, destination_airport: destinationAirport }],
          distance_unit: distanceUnit
        },
        {
          headers: {
            Authorization: "Bearer dHUT2UiVV7uAoRzZeDrRtg",
            "Content-Type": "application/json",
          },
        }
      );
      setEstimate(response.data.data.attributes);
    } catch (error) {
      console.error("Error fetching flight estimate:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
  };

  const handleNavigateBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        bgcolor: "#080924",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '20px',
        color: "white",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: estimate ? "row" : "column",
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          border: '1px solid #fff',
          borderRadius: '8px',
          maxWidth: '800px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: estimate ? '20px' : '0',
            marginBottom: estimate ? '0' : '20px',
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ marginBottom: '20px' }}
          >
            Calculate Carbon Emission
          </Typography>
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ marginBottom: '10px', bgcolor: "white", borderRadius: 1, width: '210px' }}
          >
            <MenuItem value="flight">Flight</MenuItem>
          </TextField>
          <TextField
            label="Passengers"
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            sx={{ marginBottom: '10px', bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            select
            label="Departure Airport"
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
            sx={{ marginBottom: '10px', bgcolor: "white", borderRadius: 1, width: '210px' }}
          >
            <MenuItem value="NCE">NCE</MenuItem>
          </TextField>
          <TextField
            select
            label="Destination Airport"
            value={destinationAirport}
            onChange={(e) => setDestinationAirport(e.target.value)}
            sx={{ marginBottom: '10px', bgcolor: "white", borderRadius: 1, width: '210px' }}
          >
            <MenuItem value="ARN">ARN</MenuItem>
          </TextField>
          <TextField
            select
            label="Distance Unit"
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
            sx={{ marginBottom: '20px', bgcolor: "white", borderRadius: 1, width: '210px' }}
          >
            <MenuItem value='km'>km</MenuItem>
            <MenuItem value='mi'>mi</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={fetchEstimate}>
            Submit
          </Button>
        </Box>
        {estimate && (
          <Paper
            sx={{
              padding: '20px',
              bgcolor: "#1B1C2A",
              borderRadius: 3,
              color: "white",
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <CloseIcon
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                cursor: "pointer",
                color: "white",
              }}
              onClick={handleNavigateBack}
            />
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Passengers:</strong> {estimate.passengers}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Departure Airport:</strong> {estimate.legs[0].departure_airport}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Destination Airport:</strong> {estimate.legs[0].destination_airport}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Distance:</strong> {estimate.distance_value} {estimate.distance_unit}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Estimated At:</strong> {formatDate(estimate.estimated_at)}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px', color: estimate.carbon_g > 100000 ? 'red' : 'white' }}>
              <strong>Carbon Emission (g):</strong> {estimate.carbon_g} {estimate.carbon_g > 100000 ? '25% more than threshold' : ''}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Carbon Emission (lb):</strong> {estimate.carbon_lb}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Carbon Emission (kg):</strong> {estimate.carbon_kg}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>
              <strong>Carbon Emission (mt):</strong> {estimate.carbon_mt}
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
export default FlightEstimate;
