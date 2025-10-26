import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/globals.css";
import { AppContainer, MainContent } from "./App.styles";
import AppRouter from "./routes/AppRouter"; // Import AppRouter
import { AuthProvider } from "./context/AuthContext"; // Auth context

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <MainContent>
            <AppRouter /> {/* Router to handle all pages */}
          </MainContent>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
};

export default App;