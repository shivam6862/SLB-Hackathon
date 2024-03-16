"use client";
import CustomInputField from "@/components/CustomInputField";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import ResponseItem from "@/components/ResponseItem";

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
  const [prompt, setPrompt] = useState("");
  const [fill, setFill] = useState("#000");
  const [response, setResponse] = useState<resData[]>([]);
  const [pdfBase64, setPdfBase64] = useState("");
  useEffect(() => {
    if (prompt.length > 0) setFill("#3ECDD5");
    else setFill("#000");
  }, [prompt]);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    const res = await fetch("/api/create-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatName: prompt }),
    });
    const data = await res.json();
    if (!data) return;
    setResponse(data);
    setPrompt("");

    try {
      const response = await fetch("/Tutorial 3.pdf");
      const pdfBlob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result?.toString().split(",")[1];
        setPdfBase64(base64Data);
      };
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col p-24">
      <form className="relative mb-10 flex">
        <CustomInputField
          placeholder="Enter Chat Name"
          type="text"
          value={prompt}
          id="chat-name"
          handleChanges={(e) => setPrompt(e.target.value)}
          isInput={false}
        />
        <button
          className="absolute bottom-6 right-4 cursor-pointer"
          onClick={handleSendPrompt}
        >
          <IoSend className="transition duration-300" size={30} fill={fill} />
        </button>
      </form>
      {response && response.map((item) => <ResponseItem data={item} />)}
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
