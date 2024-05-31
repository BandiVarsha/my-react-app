import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import AppUi from "../utils/AppUi";
import { axios } from "../utils/axios";

interface EstimateResponse {
  country: string;
  state: string;
  electricity_unit: string;
  electricity_value: number;
  estimated_at: string;
  carbon_g: number;
  carbon_lb: number;
  carbon_kg: number;
  carbon_mt: number;
}

interface FormData {
  type: string;
  electricity_unit: string;
  electricity_value: number;
  country: string;
  state: string;
}

function Calculate() {
  const { control, handleSubmit } = useForm<FormData>();
  const [responseData, setResponseData] = useState<EstimateResponse | null>(
    null
  );
  const navigate = useNavigate();

  const mutation = useMutation(
    async (formData: FormData) => {
      const response = await axios.post("/estimates", formData);
      return response.data.data.attributes;
    },
    {
      onSuccess: (data) => {
        setResponseData(data);
      },
      onError: (error) => {
        console.error("Error fetching estimate:", error);
      },
    }
  );

  const onSubmit = (formData: FormData) => {
    mutation.mutate({
      ...formData,
      electricity_value: Number(formData.electricity_value),
    });
  };
  const onError = (err) => {
    console.log(err, "error");
  };
  const handleNavigateBack = () => {
    navigate("/");
  };

  return (
    <>
      <AppUi />
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
          <Stack direction={"row"} sx={{ gap: "200px" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Calculate Carbon Emission
            </Typography>
            <CloseIcon
              sx={{
                cursor: "pointer",
                color: "black",
                mt: "5px",
              }}
              onClick={handleNavigateBack}
            />
          </Stack>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Stack gap={"10px"} sx={{ width: "250px" }}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
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
                      <MenuItem value="electricity">Electricity</MenuItem>
                    </TextField>
                  )}
                />
                <Controller
                  name="electricity_unit"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
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
                  )}
                />
                <Controller
                  name="electricity_value"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Electricity Value"
                      variant="outlined"
                      fullWidth
                      type="number"
                    />
                  )}
                />
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
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
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
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
                  )}
                />
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
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>

            {responseData && (
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "800px",
                  color: "black",
                }}
              >
                <Typography variant="body1">ESTIMATE RESPONSE</Typography>
                <Divider />
                <Typography variant="body2">
                  Country: {responseData.country}
                </Typography>
                <Typography variant="body2">
                  State: {responseData.state}
                </Typography>
                <Typography variant="body2">
                  Electricity Unit: {responseData.electricity_unit}
                </Typography>
                <Typography variant="body2">
                  Electricity Value: {responseData.electricity_value}
                </Typography>
                <Typography variant="body2">
                  Estimated At:{" "}
                  {new Date(responseData.estimated_at).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="error">
                  Carbon (In gms): {responseData.carbon_g}
                </Typography>
                <Typography variant="body2">
                  Carbon (In lb): {responseData.carbon_lb}
                </Typography>
                <Typography variant="body2">
                  Carbon (In Kg): {responseData.carbon_kg}
                </Typography>
                <Typography variant="body2">
                  Carbon (In metric tons): {responseData.carbon_mt}
                </Typography>
                <CopyToClipboard
                  text={JSON.stringify(responseData, null, 2)}
                  onCopy={() => alert("Copied to clipboard")}
                >
                  <Button variant="contained" sx={{ mt: "40px" }}>
                    Copy to Clipboard
                  </Button>
                </CopyToClipboard>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Calculate;
