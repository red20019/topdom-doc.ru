import React, { useEffect } from "react";
import { authAPI } from "../api/api";

const CreateDoc: React.FC = () => {
  useEffect(() => {
    const getToken = async () => {
      const token = await authAPI.getToken();
      console.log(token);
    };
    getToken();
  }, []);
  return (
    <section className="container mx-auto px-4">
      <h2>Загрузка документа</h2>

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="multiple_files"
      ></label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="multiple_files"
        type="file"
        multiple
      />

      <table className="table-auto">
        <thead>
          <tr>
            <th>Название</th>
            <th>Подробнее</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Выписка из ЕГРН</td>
            <td>
              <a className="button">Перейти</a>
            </td>
          </tr>
          <tr>
            <td>Договор на ипотеку</td>
            <td>
              <a className="button">Перейти</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default CreateDoc;
