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

const AreasForImprovementComponent = ({ areasForImprovement }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Areas for Improvement:</h2>
      <ul>
        {Object.values(areasForImprovement).map((area, index) => (
          <li key={index}>{area}</li>
        ))}
      </ul>
    </div>
  );
};

const SuggestionsComponent = ({ suggestions }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Suggestions:</h2>
      <ul>
        {Object.values(suggestions).map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

const OverallRatingComponent = ({ overallRating }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-2xl">Overall Rating:</h2>
      <p>Technical Skills: {overallRating.technical_skills}</p>
      <p>Interpersonal Skills: {overallRating.interpersonal_skills}</p>
    </div>
  );
};

const Feedback = ({ feedback }) => {
  console.log(feedback);

  if (!feedback) {
    return <div className="text-center mt-5 text-2xl">No feedback yet</div>;
  }

  return (
    <div className="flex flex-col space-y-5 mx-20">
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
