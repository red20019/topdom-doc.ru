import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { authAPI } from "../api/api";

const SignUp: React.FC = () => {
  React.useEffect(() => {
    const getToken = async () => {
      const token = await authAPI.getToken();
      console.log(token);
    };

    // getToken();
  }, []);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await authAPI.signUp(formData);
      console.log(response.data);
      if (response.success === false) {
        setLoading(false);
        setError(response.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error: unknown) {
      setLoading(false);
      setError((error as Record<string, string>).message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section className="flex justify-center items-center flex-dir-col mt-12">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Имя
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Имя"
            />
          </div>
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password_confirmation"
            >
              Подтвердите пароль
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password_confirmation"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:opacity-95 disabled:opacity-80 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Подождите..." : "Зарегистрироваться"}
            </button>
          </div>
          <div className="flex gap-2 mt-5">
            <p>Уже есть аккаунт?</p>
            <Link to={"/login"}>
              <span className="text-blue-500">Войти</span>
            </Link>
          </div>
        </form>

        {error && <p className="text-red-500 text-xs mt-5">{error}</p>}
      </div>
    </section>
  );
};

export default SignUp;
