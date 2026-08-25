import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn.js";

export const GlassCard = ({
  children,
  className,
  interactive = false,
  ...props
}) => {
  const baseStyles =
    "rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-soft";

  const interactiveStyles = interactive
    ? "hover:bg-white hover:border-primary/30 hover:shadow-soft-hover cursor-pointer"
    : "";

  const Component = interactive ? motion.div : "div";
  const animationProps = interactive
    ? {
        whileHover: { y: -4 },
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }
    : {};

  return (
    <Component
      className={cn(baseStyles, interactiveStyles, className)}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};
