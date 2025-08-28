import CountdownTimer from "./CountdownTimer";
const Count = () => {
  return (
    <div className="text-center">
      <p className="font-bold text-lg">Promo Akan Berakhir Dalam : </p>
      <CountdownTimer hours={0} minutes={9} seconds={0} />
    </div>
  );
};

export default Count;
