import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./MainRouter";

const queryClient = new QueryClient();

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <QueryClientProvider client={queryClient}>
        <MainRouter />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
