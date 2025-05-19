import EmpleadosList from "./pages/EmpleadosList";
import RegistrarEmpleado from "./pages/RegistrarEmpleado";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmpleadosList/>} />
        <Route path="/registrar" element={<RegistrarEmpleado/>} />
        <Route path="/actualizar/:id" element={<RegistrarEmpleado />} />
      </Routes>
    </Router>
  )
}

export default App
