"use client";
import CustomInputField from "@/components/CustomInputField";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import ResponseItem from "@/components/ResponseItem";
import useFetchData from "@/hooks/useFetchData";

export type resData = {
  language: string;
  heading: string;
  overview: {
    level: string;
    location: string;
    category: string;
    description: string;
  };
  about: string[];
  contact_numbers: string[];
};
export default function Home() {
  const [fill, setFill] = useState("#000");
  const { prompt, data, handleSendPrompt, handlePromptChange, pdfBase64 } =
    useFetchData();

  useEffect(() => {
    if (prompt.length > 0) setFill("#3ECDD5");
    else setFill("#000");
  }, [prompt]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <form className="relative mb-10 flex">
        <CustomInputField
          placeholder="Enter Chat Name"
          type="text"
          value={prompt}
          id="chat-name"
          handleChanges={handlePromptChange}
          isInput={false}
        />
        <button
          className="absolute bottom-6 right-4 cursor-pointer"
          onClick={handleSendPrompt}
        >
          <IoSend className="transition duration-300" size={30} fill={fill} />
        </button>
      </form>
      {data &&
        data.map((item, index) => <ResponseItem key={index} data={item} />)}
      {pdfBase64 && (
        <>
          <iframe
            src={`data:application/pdf;base64,${pdfBase64}`}
            width="100%"
            height="1000px"
          />
          <div>
            <a href={"/Tutorial 3.pdf"} download>
              Download PDF
            </a>
          </div>
        </>
      )}
    </main>
  );
}
