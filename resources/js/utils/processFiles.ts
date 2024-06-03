import { DocumentFilesType } from "../redux/docs/types";
import { mimeTypes } from "./mimeTypes";

export async function processFiles(files: DocumentFilesType[]) {
  for (const file of files) {
    try {
      const url = file.path;
      const filename = file.filename;
      const convertedFile = await urlToFile(url, filename);
      const base64Data = await fileToBase64(convertedFile);
      file.path = base64Data;
    } catch (error) {
      console.error(`Error converting file ${file.filename}:`, error);
    }
  }
}

async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch("/" + url);
  const blob = await response.blob();
  return new File([blob], fileName);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result?.toString().split(",")[1];
      if (base64Data) {
        const fileExtension = file.name.split(".").pop();
        let mimeType = "application/octet-stream";
        if (fileExtension) {
          mimeType = mimeTypes[fileExtension] || mimeType;
        }
        resolve(`data:${mimeType};base64, ` + base64Data);
      } else {
        reject("Error converting file to base64");
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
