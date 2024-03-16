import { useState } from "react";
import { resData } from "@/app/page";
import dummyData from "./dummy.json";
const useFetchData = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<resData[]>([]);
  const [pdfBase64, setPdfBase64] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    var data = [];
    try {
      const res = await fetch("http://localhost:8000/api/slb/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });
      data = await res.json();
      console.log(data);
      if (!data) return;
      setResponse(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Fetching PDF", data.message);
      setIsLoading(true);
      const response_pdf = await fetch("http://localhost:8080/getPdf/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data.message }),
      });
      console.log(response_pdf);
      const pdf = await fetch("http://localhost:8080/test.pdf");
      const pdfBlob = await pdf.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result?.toString().split(",")[1];
        setPdfBase64(base64Data);
      };
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return {
    prompt,
    isLoading,
    data: response,
    pdfBase64,
    handleSendPrompt,
    handlePromptChange,
  };
};

export default useFetchData;
