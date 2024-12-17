import "./index.css";

import { Routes, Route } from "react-router-dom";
import ProductTable from "./pages/admin/ProductTable";
import ProductForm from "./pages/admin/ProductForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/update/:id" element={<ProductForm />} />
      </Routes>
    </>
  );
}

export default App;
