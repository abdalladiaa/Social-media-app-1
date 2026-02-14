import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { router } from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <div><Toaster/></div>
      </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;
