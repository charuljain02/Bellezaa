import QuizResult from "../models/QuizResult.js";

export const submitQuiz = async (req, res) => {
  try {

    const {
      sleepHours,
      waterIntake,
      sunscreenUsage,
      stressLevel,
      workoutFrequency,
      routineConsistency,
    } = req.body;

    let score = 0;

    score += Math.min(sleepHours * 5, 40);
    score += Math.min(waterIntake * 2, 20);

    if (sunscreenUsage) score += 10;

    score += workoutFrequency * 2;
    score += routineConsistency * 2;

    score -= stressLevel * 2;

    score = Math.max(0, Math.min(score, 100));

    const result = await QuizResult.create({
      userId: req.user._id,
      sleepHours,
      waterIntake,
      sunscreenUsage,
      stressLevel,
      workoutFrequency,
      routineConsistency,
      glowScore: score,
    });

    res.status(201).json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
export const getQuizHistory = async (req, res) => {
  try {

    const history = await QuizResult.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};