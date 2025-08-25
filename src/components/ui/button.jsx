import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(({ className, type = "button", ...props }, ref) => (
  <button
    type={type}
    className={cn(
    //   "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-white px-4 py-2 ",
      className
    )}
    ref={ref}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };
