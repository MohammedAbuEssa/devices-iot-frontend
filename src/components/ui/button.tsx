import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 hover:shadow-md active:shadow-sm dark:bg-red-500 dark:hover:bg-red-600",
        outline:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:border-gray-500",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
        success: "bg-green-600 text-white hover:bg-green-700 hover:shadow-md active:shadow-sm dark:bg-green-500 dark:hover:bg-green-600",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-md active:shadow-sm dark:bg-yellow-400 dark:hover:bg-yellow-500",
        info: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600",
        noBg: "bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
