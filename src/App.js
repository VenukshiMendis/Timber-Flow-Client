import { BrowserRouter,Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home";
import CitizenRoutes from "./Routes/CitizenRoutes";
import GramaSewakaRoutes from "./Routes/GramaSewakaRoutes";
import DivisionalSecretaryRoutes from "./Routes/DivisionalSecretaryRoutes";
import './App.css';
import Login from "./pages/Common/Login";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/citizen/*" element={<CitizenRoutes />} />
      <Route path="/gramasewaka/*" element={<GramaSewakaRoutes/>} />
      <Route path="/divisionalsecretary/*" element={<DivisionalSecretaryRoutes/>} />

    </Routes>
  </BrowserRouter>
        
  );
}

export default App;
