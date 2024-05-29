import FirstPage from "./components/FirstPage";
import { axios } from "./utils/axios";
function App() {
  const data = axios.get("/estimates").then((res) => res.data);
  console.log(data, "dataa");
  console.log(process.env.REACT_APP_PORT);
  return <FirstPage />;
}
export default App;
