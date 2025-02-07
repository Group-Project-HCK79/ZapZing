import { useState } from "react";
export const ControlledHealthBar = ({
  hp ,
  maxHp,
  color
}) => {
  const barWidth = (hp / maxHp) * 100;

  const colorMap = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    yellow: "bg-yellow-600",
    green: "bg-green-600",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-72 h-6 p-1 bg-gray-300 rounded-md text-white text-xs">
        <div
          className={`${colorMap[color]} h-3 transition-all duration-500 ease-out`}
          style={{ width: `${barWidth}%` }}
        ></div>
        <div className="absolute top-1 left-0 right-0 text-center">
          {hp} / {maxHp}
        </div>
      </div>
    </div>
  );
};
