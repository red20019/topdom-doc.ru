import { Layout } from "antd";
import React, { useState } from "react";
import FileViewer from "react-file-viewer";

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
  overflow: "auto",
  height: "100vh",
  right: 0,
  top: 0,
  bottom: 0,
};

const Document: React.FC = () => {
  const docs = [
    "/pdf/dummy.pdf",
    "/docx/docx.docx",
    "/images/sierra_nevada_bg.jpg",
  ];
  // const file = "/docx/docx.docx";
  // const type = "docx";

  const [file, setFile] = useState("");

  return (
    <Layout>
      <Layout.Content>
        <FileViewer filePath={file} fileType={file.split(".").pop()} />;
      </Layout.Content>
      <Layout.Sider width="15%" style={siderStyle}>
        <div className="flex flex-col gap-y-2 p-4">
          {docs &&
            docs.map((item, i) => (
              <div
                key={i}
                onClick={() => setFile(item)}
                className="p-5 bg-white text-black border rounded cursor-pointer"
              >
                {item}
              </div>
            ))}
        </div>
      </Layout.Sider>
    </Layout>
  );
};

export default Document;
