import { ComponentProps } from "react";

interface HeadlineProps extends ComponentProps<'div'>{
  title:string,
  description:string
}

export const Headline = ({title,description,...props}:HeadlineProps) => {
  return (
    <div className="flex gap-[6px] flex-col" {...props}>
      <h1 className="text-base leading-6 font-semibold">{title}</h1>
      <p className="text-[14px] text-graphite">{description}</p>
    </div>
  );
};
