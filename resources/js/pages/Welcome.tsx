import React, { useEffect } from "react";

import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

const Welcome: React.FC = () => {
  useEffect(() => {
    document.title = "Добро пожаловать | ТопДомДок";
  }, []);
  const currentUser = useAppSelector((state: RootState) => state.user.currentUser);

  return (
    <section className="flex flex-col items-center justify-center mt-12 px-5 sm:px-10">
      <h1 className="text-md sm:text-3xl">Добро пожаловать, {currentUser?.name ? currentUser.name : `гость. Войдите, чтобы пользоваться сервисом.`}</h1>
    </section>
  );
};

export default Welcome;
