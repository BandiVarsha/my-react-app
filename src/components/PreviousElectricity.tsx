import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AppUi from "../utils/AppUi";
import { axios } from "../utils/axios";
const queryClient = new QueryClient();

function PreviousElectricity() {
  return (
    <QueryClientProvider client={queryClient}>
      <PreviousData />
    </QueryClientProvider>
  );
}

interface EstimateAttributes {
  country?: string;
  state?: string;
  electricity_unit?: string;
  electricity_value?: number;
  estimated_at: string;
  carbon_g?: number;
  carbon_lb?: number;
  carbon_kg?: number;
  carbon_mt?: number;
}

interface Estimate {
  data: {
    id: string;
    type: string;
    attributes: EstimateAttributes;
  };
}

const fetchElectricityData = async () => {
  const response = await axios.get("/estimates", {});
  const electricityData = response.data.filter((estimate: Estimate) => {
    return (
      estimate.data.attributes.electricity_unit &&
      estimate.data.attributes.electricity_value !== undefined &&
      (estimate.data.attributes.carbon_g ||
        estimate.data.attributes.carbon_lb ||
        estimate.data.attributes.carbon_kg ||
        estimate.data.attributes.carbon_mt)
    );
  });
  return electricityData;
};

const PreviousData: React.FC = () => {
  const {
    data: electricityData,
    isLoading,
    isError,
  } = useQuery<Estimate[]>("electricityData", fetchElectricityData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <AppUi />
      <Paper sx={{ margin: "20px", mt: "100px", bgcolor: "#080924" }}>
        <CardContent>
          <Typography variant="h5" color={"white"}>
            Electricity
          </Typography>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Details</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxHeight: "400px", overflowY: "auto" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                {electricityData?.map((estimate, index) => (
                  <Paper
                    key={index}
                    elevation={9}
                    sx={{
                      backgroundColor: "#080924",
                      padding: "20px",
                      borderRadius: "8px",
                      width: "800px",
                      color: "white",
                    }}
                  >
                    <Stack sx={{ direction: "row" }}>
                      <Typography variant="body1">
                        Country: {estimate.data.attributes.country}
                      </Typography>
                      <Typography variant="body1">
                        State: {estimate.data.attributes.state}
                      </Typography>
                      <Typography variant="body2">
                        Estimated at:
                        {new Date(
                          estimate.data.attributes.estimated_at
                        ).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Electricity Value:
                        {estimate.data.attributes.electricity_value}
                      </Typography>
                      <Typography variant="body2">
                        Electricity Unit:
                        {estimate.data.attributes.electricity_unit}
                      </Typography>
                      <Typography variant="body2">
                        Carbon Emissions: {estimate.data.attributes.carbon_kg}
                        kg
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Paper>
    </>
  );
};

export default PreviousElectricity;
