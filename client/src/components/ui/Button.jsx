import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-50";
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-secondary text-slate-900 shadow-soft hover:shadow-soft-hover focus:ring-primary",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-cream-50 hover:border-slate-300 focus:ring-slate-300 shadow-sm",
    ghost: "text-slate-600 hover:text-primary hover:bg-primary/5",
    danger:
      "bg-rose-500 text-slate-900 hover:bg-rose-600 focus:ring-rose-500 shadow-sm",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {" "}
      {children}{" "}
    </motion.button>
  );
};
