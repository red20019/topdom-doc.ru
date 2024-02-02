import React, { useEffect } from "react";
import { authAPI } from "../api/api";

const CreateDoc: React.FC = () => {
  useEffect(() => {
    const getToken = async () => {
      const token = await authAPI.getToken();
      console.log(token);
    };
    // getToken();
  }, []);
  return (
    <section className="container mx-auto px-4">
      <h2>Загрузка документа</h2>

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="multiple_files"
      ></label>
      <input
        className="mb-8 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="multiple_files"
        type="file"
        multiple
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Номер</th>
              <th scope="col" className="px-6 py-3">Дата</th>
              <th scope="col" className="px-6 py-3">Название</th>
              <th scope="col" className="px-6 py-3">Подробнее</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">31.01.2024</td>
              <td className="px-6 py-4">Выписка из ЕГРН</td>
              <td className="px-6 py-4">
                <a className="button">Перейти</a>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">31.01.2024</td>
              <td className="px-6 py-4">Договор на ипотеку</td>
              <td className="px-6 py-4">
                <a className="button">Перейти</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CreateDoc;
