import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "css-primary": "bg-[#3A81C5] text-white hover:bg-[#2E679E] rounded-[8px] focus:outline-2 focus:outline-transparent focus:shadow-[0_0_0_2px_rgba(58,129,197,0.3)] text-xs",
        "css-secondary": "bg-transparent text-[#3A81C5] border border-[#3A81C5] hover:bg-[#3A81C5]/10 rounded-[8px] focus:outline-2 focus:outline-transparent focus:shadow-[0_0_0_2px_rgba(58,129,197,0.3)] text-xs",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "css-primary": "h-[31px] px-3 py-1.5",
        "css-secondary": "h-[32px] px-3 py-0",
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
    const isCssPrimary = className?.includes("css-primary");
    const isCssSecondary = className?.includes("css-secondary");
    
    let variantToUse = variant;
    if (isCssPrimary) variantToUse = "css-primary";
    if (isCssSecondary) variantToUse = "css-secondary";
    
    // 根據變體自動選擇對應的size
    let sizeToUse = size;
    if (variantToUse === "css-primary") sizeToUse = "css-primary";
    if (variantToUse === "css-secondary") sizeToUse = "css-secondary";
    
    const finalClassName = className
      ?.replace("css-primary", "")
      ?.replace("css-secondary", "")
      ?.trim() || "";

    // 計算最終的 className
    const combinedClassName = cn(
      buttonVariants({ 
        variant: variantToUse, 
        size: sizeToUse, 
        className: finalClassName 
      })
    );
    
    if (asChild) {
      return (
        <Slot 
          className={combinedClassName} 
          ref={ref} 
          {...props} 
        />
      );
    }
    
    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
