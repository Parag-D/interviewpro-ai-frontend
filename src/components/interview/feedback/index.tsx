import { Loader2Icon } from "lucide-react";

const StrengthsComponent = ({ strengths }: { strengths: string[] }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Strengths:</h2>
      <ul>
        {Object.values(strengths)?.map((strength, index) => (
          <li key={index}>{strength}</li>
        ))}
      </ul>
    </div>
  );
};

// @ts-ignore
const AreasForImprovementComponent = ({ areasForImprovement }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Areas for Improvement:</h2>
      <ul>
        {Object.values(areasForImprovement).map((area, index) => (
          // @ts-ignore
          <li key={index}>{area}</li>
        ))}
      </ul>
    </div>
  );
};

// @ts-ignore
const SuggestionsComponent = ({ suggestions }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Suggestions:</h2>
      <ul>
        {Object.values(suggestions).map((suggestion, index) => (
          // @ts-ignore
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

// @ts-ignore
const OverallRatingComponent = ({ overallRating }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Overall Rating:</h2>
      <p>Technical Skills: {overallRating.technical_skills}</p>
      <p>Interpersonal Skills: {overallRating.interpersonal_skills}</p>
    </div>
  );
};

// @ts-ignore
const Feedback = ({ feedback }) => {
  console.log(feedback);

  if (!Object.keys(feedback).length) {
    return (
      <div className="text-center mt-5 text-xl flex justify-center items-center">
        <Loader2Icon className="w-5 h-5 animate-spin mr-2" />
        Please wait for few minutes, we are analyzing your interview.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 mx-40">
      {feedback.strengths && (
        <StrengthsComponent strengths={feedback.strengths} />
      )}
      {feedback.areas_for_improvement && (
        <AreasForImprovementComponent
          areasForImprovement={feedback.areas_for_improvement}
        />
      )}
      {feedback.suggestions && (
        <SuggestionsComponent suggestions={feedback.suggestions} />
      )}
      {feedback.overall_rating && (
        <OverallRatingComponent overallRating={feedback.overall_rating} />
      )}
    </div>
  );
};

export default Feedback;
