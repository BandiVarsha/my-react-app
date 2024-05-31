import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Calculate from "./components/Calculate";
import FirstPage from "./components/FirstPage";
import FlightEstimates from "./components/FlightEstimates";
import { axios } from "./utils/axios";
const App: React.FC = () => {
  const data = axios.get("/estimates").then((res) => res.data);
  console.log(data, "dataa");
  console.log(process.env.REACT_APP_PORT);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/calculate" element={<Calculate />} />
        <Route path="/flightestimate"element={<FlightEstimates/>}/>
      </Routes>
    </Router>
  );
};
export default App;
