import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";

export const Input = forwardRef(
  ({ className, icon: Icon, id, name, ...props }, ref) => {
    const defaultId = React.useId();
    const inputId = id || defaultId;
    const inputName = name || inputId;

    return (
      <div className="relative w-full">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-500" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          name={inputName}
          className={cn(
            "w-full rounded-2xl bg-white border border-slate-200 px-5 py-3.5 text-base text-slate-900 placeholder-slate-400 shadow-sm",
            "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all",
            Icon && "pl-12",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
