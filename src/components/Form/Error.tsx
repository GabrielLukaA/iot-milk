import { ComponentProps } from "react"

interface ErrorProps extends ComponentProps<'span'>{}

export const Error = (props:ErrorProps) => {
  return (
    <span className=" text-error text-sm" {...props} />

  )
}