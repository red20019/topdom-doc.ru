import React, { ForwardedRef, forwardRef } from "react";

type CheckUploadProps = {
  id: number;
  handleCheckUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadClick: (id: number) => void;
};

const CheckUpload = forwardRef<HTMLInputElement, CheckUploadProps>(
  (
    { id, handleUploadClick, handleCheckUpload }: CheckUploadProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label>
        <button
          onClick={() => handleUploadClick(id)}
          type="button"
          className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs sm:text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800"
        >
          Выбрать чеки
        </button>
        <input
          ref={ref}
          onChange={handleCheckUpload}
          type="file"
          multiple
          className="w-[22%] text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700 hidden"
        />
      </label>
    );
  }
);

export default CheckUpload;