import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

interface HeadlineProps extends ComponentProps<"div"> {
  title: string;
  description: string;
  redirect?:  ReactNode
}

export const Headline = ({ title, description, redirect, ...props }: HeadlineProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[6px] flex-col" {...props}>
        <h1 className="text-base leading-6 font-semibold">{title}</h1>
        <p className="text-[14px] text-graphite">{description}</p>
      </div>
     {redirect}
    </div>
  );
};
