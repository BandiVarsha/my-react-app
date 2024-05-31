import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";

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
  const [estimate, setEstimate] = useState<EstimateAttributes | null>(null);

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const response = await axios.post(
          "https://www.carboninterface.com/api/v1/estimates",
          {
            type: "flight",
            passengers: 1,
            legs: [{ departure_airport: "NCE", destination_airport: "ARN" }],
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

    fetchEstimate();
  }, []);

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

  return (
    <Box
      sx={{
        bgcolor: "#080924",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: '20px',
        color: "white",
      }}
    >
      <Typography 
        variant="h6" 
        component="div" 
        sx={{ marginTop: '60px', marginBottom: '20px' }}
      >
        Flight Carbon Emission Estimate
      </Typography>
      {estimate ? (
        <Paper
          sx={{
            padding: '20px',
            bgcolor: "#1B1C2A",
            borderRadius: 3,
            color: "white",
            width: '300px',
          }}
        >
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
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
}

export default FlightEstimate;
