import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

export default () => (
  <GeistProvider>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  </GeistProvider>
);
