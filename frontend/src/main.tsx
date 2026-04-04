import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/ToastContainer";
import { AuthProvider } from "./contexts/AuthContext";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <App />
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
