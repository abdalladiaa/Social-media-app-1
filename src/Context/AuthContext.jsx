import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { headersObjData } from "../Helper/headersOdj";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState();

  async function getLoggedinUserData() {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        headersObjData,
      );
      console.log(data);
      setUserData(data.user)
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLoggedinUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken , userData }}>
      {children}
    </AuthContext.Provider>
  );
}
