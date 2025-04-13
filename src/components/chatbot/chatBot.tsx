"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { BsFillChatSquareTextFill, BsStars } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { ArrowRightIcon, ArrowUpRight, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import MarkdownRenderer from "./MarkdownRender";

export interface Message {
  role: "user" | "assistant";
  content: string;
  id?: number;
}

const ChatBot = ({ propertyData }: { propertyData?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState<"english" | "marathi">("english");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const genAI = useRef(
    new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string),
  );

  const exampleProperty = {
    id: "prop4",
    title: "Luxury Villa in Lonavala",
    type: "Residential",
    subType: "house",
    status: "ACTIVE",
    area: "4500",
    unitOfMeasurement: "sqft",
    price: "₹3,50,00,000",
    district: "pune",
    city: "Pune",
    taluka: "Maval",
    address: "Royal Palms, Lonavala, Pune",
    verified: true,
    thumbnail: "https://example.com/image.jpg",
    buildingDetails: {
      condition: "ready_to_move",
    },
    documents: 7,
    photos: 12,
    lastUpdated: "2024-04-15",
    sellerInfo: {
      name: "Rajesh Sharma",
      contactNumber: "+91-9876543210",
      email: "rajesh.s@example.com",
      verificationStatus: "VERIFIED",
      previousListings: 3,
      memberSince: "2022-01-15",
      ratings: 4.8,
      reviewCount: 12,
    },
    propertyHistory: {
      previousOwners: 2,
      lastSoldDate: "2021-05-10",
      lastSoldPrice: "₹3,20,00,000",
      constructionYear: 2015,
      renovationYear: 2019,
      propertyTaxHistory: "Regular payments, no outstanding dues",
      disputeHistory: "No legal disputes on record",
    },
    documentOCR: {
      titleDeed:
        "Title deed shows clear ownership transfer from Sunil Patil to Rajesh Sharma on 15th May 2021. Registered at Maval Sub-Registrar Office.",
      propertyTax:
        "Property tax receipt shows payment of ₹45,000 for FY 2023-24. No pending dues.",
      encumbranceCertificate:
        "No encumbrance found on the property for the period 2010-2024.",
      occupancyCertificate:
        "Occupancy certificate issued by Lonavala Municipal Council on 10th June 2015.",
      naDevelopmentPermission:
        "NA order issued for residential purpose dated 12th March 2014.",
      sevenTwelveExtract:
        "Land measurement shows 4500 sq ft area under residential zone as per DP 2014.",
    },
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateChatResponse = useCallback(async () => {
    if (!chatPrompt.trim()) return;

    setIsGenerating(true);
    const newMessage: Message = { role: "user", content: chatPrompt };
    setChatMessages((prev) => [...prev, newMessage]);
    setChatPrompt("");

    try {
      const model = genAI.current.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
        },
      });

      const propertyInfo = propertyData || exampleProperty;

      const prompt =
        language === "english"
          ? `You are a property assistant chatbot that helps users with information about property details, fraud analysis, seller history, and Maharashtra land policy. Based on the following property information, please answer the user's question: "${chatPrompt}"`
          : `तुम्ही एक मालमत्ता सहाय्यक चॅटबॉट आहात जो वापरकर्त्यांना मालमत्ता तपशील, फसवणूक विश्लेषण, विक्रेता इतिहास आणि महाराष्ट्र भूमि धोरणाबद्दल माहिती देण्यात मदत करतो. खालील मालमत्ता माहितीच्या आधारे, कृपया वापरकर्त्याच्या प्रश्नाचे उत्तर द्या: "${chatPrompt}"`;

      const mahaPolicyContext =
        language === "english"
          ? `Keep in mind the Maharashtra Land Revenue Code, 1966 and Real Estate (Regulation and Development) Act, 2016 requirements when answering questions about property legality. For agricultural land, check if proper NA (Non-Agricultural) permissions are obtained. Verify if property falls under Urban Land Ceiling regulations. Analyze document history for any fraudulent patterns. For RERA properties, check registration status. Be alert to common real estate frauds in Maharashtra.`
          : `प्रश्नांची उत्तरे देताना महाराष्ट्र जमीन महसूल संहिता, 1966 आणि रिअल इस्टेट (नियमन आणि विकास) कायदा, 2016 च्या आवश्यकता लक्षात ठेवा. शेतजमिनीसाठी, योग्य एनए (बिगर शेती) परवानग्या मिळाल्या आहेत का ते तपासा. मालमत्ता शहरी जमीन कमाल नियमांतर्गत येते का ते तपासा. कागदपत्रांच्या इतिहासाचे विश्लेषण करा. रेरा मालमत्तांसाठी, नोंदणी स्थिती तपासा. महाराष्ट्रातील सामान्य रिअल इस्टेट फसवणुकीबद्दल सावध रहा.`;

      const languageResponse =
        language === "english"
          ? "Make sure the response is concise and highlight important points. Focus only on answering property-related questions."
          : "प्रतिसाद संक्षिप्त असल्याची खात्री करा आणि महत्त्वाच्या मुद्द्यांवर प्रकाश टाका. केवळ मालमत्तेशी संबंधित प्रश्नांची उत्तरे देण्यावर लक्ष केंद्रित करा.";

      const fullPrompt = `${prompt}
      
      Property Information:
      ${JSON.stringify(propertyInfo, null, 2)}
      
      ${mahaPolicyContext}
      
      ${languageResponse}`;

      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: text },
      ]);
    } catch (error) {
      console.error("Error generating chat response:", error);
      const errorMessage =
        language === "english"
          ? "An error occurred. Please try again later."
          : "त्रुटी आली आहे. कृपया नंतर पुन्हा प्रयत्न करा.";

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }, [chatPrompt, language, propertyData]);

  const startNewChat = useCallback(() => {
    setChatMessages([]);
    setChatPrompt("");
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "english" ? "marathi" : "english"));
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        onClick={() => {
          setIsOpen(!isOpen);
          const button = document.getElementById("chat-button");
          button?.classList.add("scale-effect");
          setTimeout(() => button?.classList.remove("scale-effect"), 300);
        }}
        asChild
      >
        <div
          id="chat-button"
          className="gradient-button fixed right-0 bottom-0 z-50 m-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-transform"
        >
          {isOpen ? (
            <RxCross2 className="animate-rotate-in text-2xl text-white transition-transform" />
          ) : (
            <BsFillChatSquareTextFill className="text-2xl text-white transition-transform" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="h-[70vh] w-96 overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="leading-tight font-light">
              {language === "english"
                ? "PROPERTY ASSISTANT"
                : "मालमत्ता सहाय्यक"}
            </h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={
                  language === "english"
                    ? "Switch to Marathi"
                    : "इंग्रजीवर स्विच करा"
                }
                className="h-8 w-8"
              >
                <Globe className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={startNewChat}
                className="bg-muted h-8 border text-xs"
              >
                {language === "english" ? "New Chat" : "नवीन चॅट"}
              </Button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="scrollbar flex-grow overflow-y-auto"
          >
            {chatMessages.length === 0 ? (
              <EmptyScreen setChatPrompt={setChatPrompt} language={language} />
            ) : (
              chatMessages.map((message, index) => (
                <ChatItem key={index} message={message} />
              ))
            )}
          </div>

          <div className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                generateChatResponse();
              }}
            >
              <div className="flex items-end space-x-2">
                <div className="flex-grow">
                  <Textarea
                    placeholder={
                      language === "english"
                        ? "Ask about this property..."
                        : "या मालमत्तेबद्दल विचारा..."
                    }
                    className="scrollbar min-h-[38px] w-full resize-none px-3 py-3 text-[13px] placeholder:text-gray-400 focus-within:outline-none"
                    value={chatPrompt}
                    onChange={(e) => setChatPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isGenerating && chatPrompt.trim()) {
                          generateChatResponse();
                        }
                      }
                    }}
                    disabled={isGenerating}
                    rows={1}
                    style={{
                      maxHeight: "114px",
                      overflowY: "auto",
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className="gradient-button text-primary h-[44px] w-[44px] flex-shrink-0 rounded-md p-0 disabled:cursor-not-allowed"
                  disabled={isGenerating || !chatPrompt.trim()}
                >
                  <ArrowUpRight className="text-primary" size={16} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBot;

const EmptyScreen = ({
  setChatPrompt,
  language,
}: {
  setChatPrompt: (prompt: string) => void;
  language: "english" | "marathi";
}) => {
  const exampleMessagesEnglish = [
    "Is this property free from legal disputes?",
    "What is the seller's history?",
    "Are all documents verified?",
    "Tell me about NA permissions",
    "Is the property RERA registered?",
  ];

  const exampleMessagesMarathi = [
    "ही मालमत्ता कायदेशीर वादांपासून मुक्त आहे का?",
    "विक्रेत्याचा इतिहास काय आहे?",
    "सर्व कागदपत्रे सत्यापित आहेत का?",
    "एनए परवानग्यांबद्दल मला सांगा",
    "मालमत्ता रेरा नोंदणीकृत आहे का?",
  ];

  const exampleMessages =
    language === "english" ? exampleMessagesEnglish : exampleMessagesMarathi;

  return (
    <div className="text-foreground mx-auto px-4">
      <div className="flex w-full flex-col items-center justify-center rounded-md p-4">
        <p className="mb-4 text-center leading-normal">
          {language === "english" ? (
            <>
              Welcome to{" "}
              <span className="text-primary opacity-100">
                Property Assistant
              </span>
              ! How can I help you today?
            </>
          ) : (
            <>
              आपले{" "}
              <span className="text-primary opacity-100">मालमत्ता सहाय्यक</span>{" "}
              मध्ये स्वागत आहे! मी आज आपली कशी मदत करू शकतो?
            </>
          )}
        </p>
        <p className="text-primary mb-4 text-[15px] leading-normal">
          {language === "english"
            ? "Try asking about:"
            : "याबद्दल विचारून पहा:"}
        </p>
        <div className="flex flex-col items-start justify-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setChatPrompt(message)}
              className="h-auto w-full justify-start border-[0.5px] p-2 text-xs opacity-80"
            >
              <ArrowRightIcon className="text-muted-foreground mr-2 h-3 w-3" />
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="group relative flex items-start py-3 pr-2">
      <div className="bg-background -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border select-none">
        {message.role === "user" ? (
          <FaUser className="h-4 w-4" />
        ) : (
          <BsStars className="h-4 w-4" />
        )}
      </div>
      <div className="ml-3 flex-1 space-y-1 overflow-hidden px-1 text-[13px]">
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  );
};
