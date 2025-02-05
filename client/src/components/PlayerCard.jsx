export function PlayerCard() {
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
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
