import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import React, { useRef, useState } from "react";

import CheckUpload from "../CheckUpload";
import {
  setCheckError,
  setCheckLoading,
  updateStage,
  uploadChecks,
} from "../../redux/docs/docsSlice";
import { docsAPI } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { ItemProps } from "./DocItem";

const Accountant: React.FC<ItemProps> = ({
  item,
  matchesMax1270,
  matchesMax1000,
  matchesMax790,
}) => {
  const dispatch = useAppDispatch();
  const { checkLoading } = useAppSelector((state: RootState) => state.docs);

  const [checkId, setCheckId] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (id: number) => {
    if (inputRef.current) {
      setCheckId(id);
      inputRef.current.click();
    }
  };

  const handleCheckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      dispatch(setCheckLoading(true));
      // setFormData(info.file.originFileObj);
      const formData = new FormData();
      console.log(e.target.files);
      if (checkId && e.target.files) {
        formData.append("id", String(checkId));
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append("files[]", e.target.files[i]);
        }
      }

      const response = await docsAPI.uploadCheck(formData);
      if (response?.success === false) {
        dispatch(setCheckLoading(false));
        dispatch(setCheckError(response.message));
        return;
      }
      await dispatch(updateStage({ id: checkId, status: "accepted" }));
      dispatch(setCheckLoading(false));
      dispatch(setCheckError(""));
      dispatch(uploadChecks(checkId));
    } catch (error) {
      dispatch(setCheckLoading(false));
      dispatch(setCheckError((error as Record<string, string>).message));
    }
  };

  return (
    <div
      className={`flex items-center gap-x-3 ${
        matchesMax790 ? "justify-center flex-col gap-y-2" : "justify-end"
      }`}
    >
      {item.is_check ? (
        <span className="text-sm sm:text-lg">
          <CheckCircleTwoTone twoToneColor="#52c41a" /> Чек загружен
        </span>
      ) : (
        <span className="text-sm sm:text-lg">
          <CloseCircleTwoTone twoToneColor="red" /> Чек не загружен
        </span>
      )}
      {!item.is_check && (
        <div className="">
          <CheckUpload
            id={item.id}
            ref={inputRef}
            handleUploadClick={handleUploadClick}
            handleCheckUpload={handleCheckUpload}
          />
          <span className="block ">{checkLoading && "Чек загружается..."}</span>
        </div>
      )}
    </div>
  );
};

export default Accountant;
