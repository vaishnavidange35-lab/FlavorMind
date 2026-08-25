import React from "react";
import { cn } from "../../utils/cn.js";

export const Badge = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors";

  const variants = {
    default: "bg-white text-slate-600 border border-slate-200 shadow-sm",
    emerald: "bg-success/10 text-success border border-success/20",
    violet: "bg-info/10 text-info border border-info/20",
    amber: "bg-accent/20 text-secondary border border-accent/30",
    rose: "bg-rose-50 text-rose-500 border border-rose-200",
    primary: "bg-primary/10 text-primary border border-primary/20",
  };

  // Fallback to primary if old variant name passed
  const selectedVariant = variants[variant] || variants.primary;

  return (
    <span className={cn(baseStyles, selectedVariant, className)} {...props}>
      {children}
    </span>
  );
};
