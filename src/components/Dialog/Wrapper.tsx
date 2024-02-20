import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge";

interface WrapperProps extends ComponentProps<'div'>{}

export const Wrapper = (props:WrapperProps) => {
  const classname = twMerge("shadow-default w-[448px] flex flex-col rounded-lg p-6", props.className)
  return (
    <div  {...props} className={classname} />
  )
}