"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

interface CustomProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  color?: "green" | "yellow" | "red";
  height?: "sm" | "md" | "lg";
}

const CustomProgress = React.forwardRef<HTMLDivElement, CustomProgressProps>(
  ({ className, value = 0, color, height = "md", ...props }, ref) => {
    // Get color based on value if not explicitly provided
    const calculatedColor =
      color || (value > 85 ? "green" : value > 70 ? "yellow" : "red");

    // Get height based on size
    const heightClass =
      height === "sm" ? "h-2" : height === "lg" ? "h-4" : "h-3";

    // Get background color based on calculated color
    const bgClass =
      calculatedColor === "green"
        ? "bg-green-600"
        : calculatedColor === "yellow"
          ? "bg-yellow-600"
          : "bg-red-600";

    return (
      <div
        ref={ref}
        className={cn(
          "bg-secondary relative w-full overflow-hidden rounded-full",
          heightClass,
          className,
        )}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 transition-all", bgClass)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    );
  },
);

CustomProgress.displayName = "CustomProgress";

export { CustomProgress };
