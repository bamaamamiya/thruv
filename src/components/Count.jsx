import CountdownTimer from "./set/CountdownTimer";
const Count = () => {
  return (
    <div className="text-center">
      <br />
      <p className="font-bold text-lg">Promo Akan Berakhir Dalam : </p>
      <br />
      <CountdownTimer hours={0} minutes={9} seconds={0} />
      <br />
    </div>
  );
};

export default Count;
