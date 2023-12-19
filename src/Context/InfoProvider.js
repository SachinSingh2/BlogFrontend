import React, { createContext, useState } from "react";

export const InfoContext = createContext(null);

const InfoProvider = ({ children }) => {
  const [Account, setAccount] = useState({ email: "", name: "" });

  return (
    <InfoContext.Provider value={{ Account, setAccount }}>
      {children}
    </InfoContext.Provider>
  );
}

export default InfoProvider;
