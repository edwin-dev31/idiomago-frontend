// src/components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          "w-full h-10 px-5 rounded-full bg-[#E3EFF2] text-[#1B3B48] placeholder:text-[#1B3B48]/60 shadow-md border-none focus:outline-none focus:ring-2 focus:ring-[#1B3B48]",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
