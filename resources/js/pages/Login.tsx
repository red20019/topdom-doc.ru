import React, { useEffect } from "react";
import { Alert } from "antd";

import { authAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { RootState } from "../redux/store";

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "Авторизация | ТопДомДок";
  }, []);

  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const { loading, error } = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      await authAPI.getToken();
      const response = await authAPI.signIn(formData);
      if (response.success === false) {
        dispatch(signInFailure(response.data.message));
        return;
      }
      const userResponse = await authAPI.me();
      console.log(userResponse);
      dispatch(signInSuccess(userResponse.data.data));

      navigate("/");
    } catch (error: unknown) {
      dispatch(signInFailure("Неправильный логин или пароль"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section className="container px-4 mx-auto flex justify-center items-center mt-12">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[12px] sm:text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[12px] placeholder:text-[12px] sm:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-[12px] sm:text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[12px] placeholder:text-[12px] sm:text-sm text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center gap-x-5 text-[10px] sm:text-sm">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? <LoadingOutlined /> : "Войти"}
            </button>
            <a
              className="inline-block align-baseline font-medium text-blue-500 hover:text-blue-800"
              href="#"
            >
              Забыли пароль?
            </a>
          </div>
        </form>
        {error && (
          <Alert message="Ошибка" description={error} type="error" closable />
        )}
      </div>
    </section>
  );
};

export default Login;
