import { useState } from "react";
export const ControlledHealthBar = ({
  hp = 100,
  maxHp = 100,
  color = "red",
}) => {
  // const maxHp = 100;
  // const [hp, setHp] = useState(maxHp);
  const barWidth = (hp / maxHp) * 100;

  const colorMap = {
    red: "bg-red-600",
    blue: "bg-blue-600",
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
      {/* <button
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
        onClick={() => {
          const damage = Math.floor(Math.random() * maxHp);
          setHp(Math.max(0, hp - damage));
        }}
      >
        Hit Random
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        onClick={() => setHp(maxHp)}
      >
        Reset
      </button> */}
    </div>
  );
};
