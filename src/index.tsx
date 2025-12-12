import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { store } from "./store/store";
import App, { theme } from "./App";
import { ForwardPage } from "./components/forwardPage/ForwardPage";
import { Authorize } from "./components/authorize/Authorize";
import { Layout } from "./Layout";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root is not found");

createRoot(rootEl).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
          <Routes>
            <Route path="/" element={<ForwardPage />} />
            <Route path="/authorize" element={<Authorize />} />
            <Route path="/registration" element={<Authorize />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
