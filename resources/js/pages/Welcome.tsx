import React, { useEffect } from "react";
import { authAPI } from "../api/api";

const Welcome: React.FC = () => {
  useEffect(() => {

    const getToken = async () => {
      const token = await authAPI.getToken();
      console.log(token)
    }

    getToken()
  }, [])

  return (
    <div>
      <h1 className="text-3xl">Welcome!</h1>
    </div>
  );
};

export default Welcome;
