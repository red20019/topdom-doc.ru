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
    <section className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl">Welcome!</h1>
    </section>
  );
};

export default Welcome;
