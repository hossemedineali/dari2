import React, { memo } from "react";

export type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const Tooltip: React.FC<TooltipProps> = memo((props) => {
  return (
    <span className="group relative">
      <span className="pointer-events-none absolute -top-0 rigth-4/6 -translate-x-[105%] whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:top-[30%] before:left-[95%]  before:-translate-x-[-100%] before:border-4 before:border-transparent before:border-l-black before:content-[''] group-hover:opacity-100">
        {props.text}
      </span>

      {props.children}
    </span>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;