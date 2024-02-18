import { ComponentProps } from "react"

interface WrapperProps extends ComponentProps<'div'>{}

export const Wrapper = (props:WrapperProps) => {
  return (
    <div className="shadow-default w-[448px] flex flex-col rounded-lg p-6" {...props} />
  )
}