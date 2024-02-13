import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { authAPI, docsAPI } from "../api/api";
import { DocsType } from "../redux/user/types";

const CreateDoc: React.FC = () => {
  const [formData, setFormData] = React.useState<DocsType>({
    name: "",
    files: null,
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  console.log(formData);

  useEffect(() => {
    document.title = "Добавление документа | ТопДомДок";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("name", formData.name);

    // if (formData.files) {
    //   for (let i = 0; i < formData.files?.length; i++) {
    //     data.append("files", formData.files[i]);
    //   }
    // }

    try {
      setLoading(true);
      await authAPI.getToken();
      const response = await docsAPI.sendDocs(formData);
      if (response.success === false) {
        setLoading(false);
        setError(response.message);
        return;
      }
      setLoading(false);
      setError(null);
      console.log(response);
    } catch (error: unknown) {
      setLoading(false);
      setError((error as Record<string, string>).message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.files,
      });
    }
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Загрузка документа
      </h2>

      <div className="flex flex-center mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-6 mb-8 p-8 shadow-md"
        >
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover"
              src="https://cdn-icons-png.flaticon.com/512/3375/3375199.png"
              alt="Документы"
            />
          </div>
          <div>
            <label htmlFor="name" className="block">
              <input
                onChange={handleChange}
                id="name"
                type="text"
                className="block w-full mb-2 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Название"
                multiple
              />
            </label>
            <label htmlFor="files" className="block mb-3">
              <input
                onChange={handleChange}
                id="files"
                type="file"
                className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                      "
                multiple
              />
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Загрузить
          </button>
        </form>
      </div>
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}

      <div className="items-center w-full px-4 py-4 mx-auto my-10 bg-white rounded-lg shadow-md">
        <div className="mx-auto">
          <div className="flex justify-between w-full px-4 py-2">
            <div className="text-lg font-bold">Список документов</div>
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 -translate-y-1/2 top-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Поиск
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-collapse table-auto">
              <thead className="">
                <tr className="text-base font-bold text-left bg-gray-50">
                  <th className="px-4 py-3 border-b-2 border-black">Номер</th>
                  <th className="px-4 py-3 border-b-2 border-blue-500">
                    Документ
                  </th>
                  <th className="px-4 py-3 border-b-2 border-green-500">
                    Кто добавил
                  </th>
                  <th className="px-4 py-3 text-center border-b-2 border-yellow-500 sm:text-left">
                    Добавлено
                  </th>
                  <th className="px-4 py-3 border-b-2 border-red-500">
                    <Link to="/1">Перейти</Link>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-4">1</td>
                  <td className="flex flex-row items-center px-4 py-4">
                    <div className="flex w-10 h-10 mr-4">
                      <a href="#" className="relative block">
                        <img
                          alt="profil"
                          src="https://images.unsplash.com/photo-1560329072-17f59dcd30a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBmYWNlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                          className="object-cover w-10 h-10 mx-auto rounded-md"
                        />
                      </a>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="font-medium dark:text-white">
                        Ипотечный кредит
                      </div>
                      <div className="text-sm text-blue-600 dark:text-gray-200">
                        На рассмотрении
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">480-570-3413</td>
                  <td className="px-4 py-4">MX-8523537435</td>
                  <td className="px-4 py-4">Just Now</td>
                </tr>
                <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-4">2</td>
                  <td className="flex flex-row items-center px-4 py-4">
                    <div className="flex w-10 h-10 mr-4">
                      <a href="#" className="relative block">
                        <img
                          alt="profil"
                          src="https://images.unsplash.com/photo-1571395443367-8fbb3962e48f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG1lbiUyMGZhY2V8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          className="object-cover w-10 h-10 mx-auto rounded-md"
                        />
                      </a>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="font-medium dark:text-white">
                        Газификация участка №228
                      </div>
                      <div className="text-sm text-green-600 dark:text-gray-200">
                        Принято
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">440-476-4873</td>
                  <td className="px-4 py-4">MX-9537537436</td>
                  <td className="px-4 py-4">Mar 04, 2018 11:37am</td>
                </tr>
                <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-4">3</td>
                  <td className="flex flex-row items-center px-4 py-4">
                    <div className="flex w-10 h-10 mr-4">
                      <a href="#" className="relative block">
                        <img
                          alt="profil"
                          src="https://images.unsplash.com/photo-1532170579297-281918c8ae72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGZlbWFsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"
                          className="object-cover w-10 h-10 mx-auto rounded-md"
                        />
                      </a>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="font-medium dark:text-white">
                        Плтаёжка за рекламу
                      </div>
                      <div className="text-sm text-yellow-600 dark:text-gray-200">
                        Отказано
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">206-783-1890</td>
                  <td className="px-4 py-4">MX-7533567437</td>
                  <td className="px-4 py-4">Mar 13, 2018 9:41am</td>
                </tr>
                <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-4">4</td>
                  <td className="flex flex-row items-center px-4 py-4">
                    <div className="flex w-10 h-10 mr-4">
                      <a href="#" className="relative block">
                        <img
                          alt="profil"
                          src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMGZhY2V8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          className="object-cover w-10 h-10 mx-auto rounded-md"
                        />
                      </a>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="font-medium dark:text-white">
                        Купля кирпичей
                      </div>
                      <div className="text-sm text-green-600 dark:text-gray-200">
                        Принято
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">931-499-6252</td>
                  <td className="px-4 py-4">MX-5673467743</td>
                  <td className="px-4 py-4">Feb 21, 2018 8:34am</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
            <p className="flex">
              Показано&nbsp;<span className="font-bold">от 1 до 4 </span>
              &nbsp;из 8 записей
            </p>
            <div className="flex items-center justify-between space-x-2">
              <a href="#" className="hover:text-gray-600">
                Назад
              </a>
              <div className="flex flex-row space-x-1">
                <div className="flex px-2 py-px text-white bg-blue-400 border border-blue-400 cursor-pointer">
                  1
                </div>
                <div className="flex px-2 py-px border border-blue-400 hover:bg-blue-400 hover:text-white cursor-pointer">
                  2
                </div>
              </div>
              <a href="#" className="hover:text-gray-600">
                Вперёд
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateDoc;
