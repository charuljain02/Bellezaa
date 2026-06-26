const GlowScoreCard = ({ score }) => {
  return (
    <div className="border rounded-xl p-6 shadow text-center">

      <h2 className="text-2xl font-bold">
        Glow Score
      </h2>

      <h1 className="text-5xl mt-4">
        {score}
      </h1>

    </div>
  );
};

export default GlowScoreCard;