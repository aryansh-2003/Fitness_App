import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-black uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-red-600 shadow-xl shadow-black/10 hover:shadow-red-600/30 hover:-translate-y-1",
        destructive: "bg-red-600 text-white hover:bg-black shadow-xl shadow-red-600/20 hover:shadow-black/20 hover:-translate-y-1",
        outline: "border-2 border-black/10 bg-white text-black hover:border-black shadow-sm hover:-translate-y-1",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        ghost: "hover:bg-black/5 hover:text-black text-gray-500",
        link: "text-red-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 rounded-lg px-4",
        lg: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
