import { ReactNode } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface FeatureCardProps {
  name: string;
  description: string;
  icon: ReactNode;
}

export default function FeatureCard({
  name,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <CardContainer className="inter-var w-[400px]">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border gap-2 ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {icon}
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {undefined}
        </CardItem>
        <div className="flex justify-between items-center mt-20"></div>
      </CardBody>
    </CardContainer>
  );
}
