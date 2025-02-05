import { useState } from "react";

export function PlayerCard({team}) {
    const [isChecked, setIsChecked] = useState(false);

    const checkHandler = () => {
      console.log(isChecked);
      setIsChecked(!isChecked)
    };

  return (
    <>
      <div className="card card-compact bg-base-100 w-fit shadow-xl ">
        <figure>
          <img
            className="rounded-full h-80 w-80"
            src={localStorage.getItem("avatar")}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Join as {team}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <label>Ready</label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={checkHandler}
              className="checkbox checkbox-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}
