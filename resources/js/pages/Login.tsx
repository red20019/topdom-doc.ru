import React from "react";

import { authAPI } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  signInToken,
} from "../redux/user/userSlice";
import { RootState } from "../redux/store";

const Login: React.FC = () => {
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const { loading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getUser = async (token: string) => {
    const response = await authAPI.me(token);
    dispatch(signInSuccess(response.data.data));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await authAPI.signIn(formData);
      console.log(response.data);
      if (response.success === false) {
        dispatch(signInFailure(response.message));
        return;
      }
      dispatch(signInToken(response.data.token));
      await getUser(response.data.token);

      navigate("/");
    } catch (error: unknown) {
      dispatch(signInFailure((error as Record<string, string>).message));
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Подождите..." : "Войти"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Забыли пароль?
            </a>
          </div>
        </form>
        {error && <p className="text-red-500 text-xs mt-5">{error}</p>}
      </div>
    </section>
  );
};

export default Login;
