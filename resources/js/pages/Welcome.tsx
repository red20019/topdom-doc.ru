import React, { useEffect } from "react";

import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

const Welcome: React.FC = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.currentUser);

  return (
    <section className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl">Добро пожаловать, {currentUser?.name ? currentUser.name : `гость. Войдите, чтобы пользоваться сервисом.`}</h1>
    </section>
  );
};

export default Welcome;
