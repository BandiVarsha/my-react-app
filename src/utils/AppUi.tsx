import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import { acc, first } from "../assets/index";

function AppUi() {
  return (
    <>
      <AppBar sx={{ bgcolor: "#080924" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src={first} alt="first" />
          <Avatar src={acc} alt="acc" />
        </Toolbar>
      </AppBar>
      <Box
        sx={{ bgcolor: "#080924", width: "1900px", minHeight: "100vh" }}
      ></Box>
    </>
  );
}

export default AppUi;
