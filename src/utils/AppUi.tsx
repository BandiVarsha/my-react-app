import { AppBar, Avatar, Toolbar } from "@mui/material";
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
    </>
  );
}

export default AppUi;
