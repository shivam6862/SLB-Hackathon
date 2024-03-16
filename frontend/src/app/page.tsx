"use client";
import CustomInputField from "@/components/CustomInputField";
import { IoSend } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import ResponseItem from "@/components/ResponseItem";
import useFetchData from "@/hooks/useFetchData";
import LoadingComponent from "@/components/Loading";
import useHandleInputSize from "@/hooks/useHandleInputSize";

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

  const {
    prompt,
    isLoading,
    data,
    handleSendPrompt,
    handlePromptChange,
    pdfBase64,
  } = useFetchData();

  useEffect(() => {
    if (prompt.length > 0) setFill("#3ECDD5");
    else setFill("#000");
  }, [prompt]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <form className="relative mb-10 mt-10 flex">
        <CustomInputField
          placeholder="Enter your message here..."
          type="text"
          value={prompt}
          id="chat-name"
          handleChanges={handlePromptChange}
          isInput={false}
        />
        <button
          className="absolute bottom-6 right-4 cursor-pointer disabled:opacity-50"
          onClick={handleSendPrompt}
          onKeyDown={(e) => {
            if (e.key == "Enter") handleSendPrompt(e);
          }}
          disabled={isLoading}
        >
          <IoSend className="transition duration-300" size={30} fill={fill} />
        </button>
      </form>
      {isLoading && <LoadingComponent height="500px" />}
      {data &&
        data.map((item, index) => <ResponseItem key={index} data={item} />)}
      {pdfBase64 && (
        <>
          <iframe
            src={`data:application/pdf;base64,${pdfBase64}`}
            width="100%"
            height="1000px"
          />
          <div className="mt-8 w-fit">
            <a
              href={"http://localhost:8080/test.pdf"}
              download
              target="_blank"
              className="h-fit cursor-pointer rounded-md  bg-white p-2 pl-6 pr-6 transition duration-300 hover:bg-[#3ECDD5] hover:text-white"
            >
              Download PDF
            </a>
          </div>
        </>
      )}
    </main>
  );
}
