import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HeadlineProps extends ComponentProps<"div"> {
  title: string;
  description: string;
  redirect?: ReactNode;
  classes?: string;
}

export const Headline = ({
  title,
  description,
  redirect,
  classes,
  ...props
}: HeadlineProps) => {
  const classname = twMerge("flex justify-between items-center", classes);
  return (
    <div className={classname}>
      <div className="flex gap-[6px] flex-col" {...props}>
        <h1 className="text-base leading-6 font-semibold">{title}</h1>
        <p className="text-[14px] text-graphite">{description}</p>
      </div>
      {redirect}
    </div>
  );
};
