import { Box, Card, styled } from "@mui/material";
export const StyledBox = styled(Box)({
  bgcolor: "green",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

export const StyledCard = styled(Card)({
  width: 300,
  bgcolor: "#1B1C2A",
  color: "white",
  mt: "150px",
  ml: "20px",
  borderRadius: 3,
  p: 2,
});

export const CardBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mb: 2,
});
