"use client";

import Head from "next/head";
import Link from "next/link";

import React, { useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Button } from "../ui/button";

export default function Faq() {
  const content = [
    {
      button: "What is it?",
      panel:
        "It is a free collaborative app whre we can version control our projects,connect with our contributors and much more.",
      uuid: "id1",
    },
    {
      button: "How can I get started?",
      panel: (
        <>
          First, you may need to{" "}
          <Link href="/auth/register">
            <Button
              variant="outline"
              className="w-[8rem] h-[2rem] text-lg text-primary border-primary border-2"
            >
              Register
            </Button>
          </Link>{" "}
          and then proceed from there.
        </>
      ),
      uuid: "id2",
    },
    {
      button: "How do I create a repo?",
      panel: "dummy text",
      uuid: "id3",
    },
    {
      button: "How can I chat with my project contributors?",
      panel: "dummy text",
      uuid: "id4",
    },
    {
      button: "Do you provide additional support?",
      panel: "dummy text",
      uuid: "id5",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const handleClick = (index: number) => {
    if (activeIndex === -1) setActiveIndex(index);
    else if (activeIndex !== index) setActiveIndex(index);
    else setActiveIndex(-1);
  };
  return (
    <>
      <main className=" relative px-[25px] xl:px-[280px] font-personal bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] h-full flex justify-center">
        <div className="shadow-[0px_26px_47px_-7px_rgba(0,0,0,0.45)] relative xl:overflow-hidden xl:flex xl:items-end h-[490px] xl:h-[510px] mt-[145px] xl:mt-[130px]  flex flex-col items-center bg-white w-full px-[25px] rounded-3xl">
          <div className="xl:w-[350px] xl:mr-[70px]  w-full">
            <h1 className="text-4xl text-center xl:text-left xl:text-5xl text-primary font-bold mb-[20px] xl:mb-[10px] mt-[50px] xl:mt-[72px]">
              FAQ
            </h1>
            <Accordion
              allowZeroExpanded
              className="overflow-hidden pb-[48px] xl:pb-0 w-full "
              preExpanded={["id2"]}
            >
              {content.map((contenido, indx) => (
                <AccordionItem
                  key={indx}
                  id={contenido.uuid}
                  uuid={contenido.uuid}
                  className="border-b-[1px] py-[15.7px]"
                >
                  <AccordionItemHeading
                    className=" "
                    onClick={() => handleClick(indx)}
                  >
                    <AccordionItemButton className="flex justify-between items-center">
                      <h1
                        className={
                          "text-[#4A4B5E] text-lg hover:text-primary " +
                          `${
                            activeIndex === indx ? "font-bold" : "font-normal"
                          }`
                        }
                      >
                        {contenido.button}
                      </h1>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="pt-[5px] ">
                    <p className="text-[#787887]">{contenido.panel}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </>
  );
}
