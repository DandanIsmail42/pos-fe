import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import AuthMiddleware from "./middleware/authMidleWare";
import Layout from "./components/Layouts/Layout";
import Products from "./pages/Products/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AuthMiddleware element={<Layout />} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
