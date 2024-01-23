import React, { useEffect } from "react";

import { authAPI } from "../api/api";
import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

const Welcome: React.FC = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {

    const getToken = async () => {
      const token = await authAPI.getToken();
      console.log(token)
    }

    // getToken()
  }, [])

  return (
    <section className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl">Добро пожаловать, {currentUser?.name ? currentUser.name : `гость. Войдите, чтобы пользоваться сервисом.`}</h1>
    </section>
  );
};

export default Welcome;
