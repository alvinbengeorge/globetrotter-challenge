import React from 'react';
import { CheckCircle, XCircle, List } from 'lucide-react';

interface ScoreCardProps {
  correctCount: number;
  incorrectCount: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ correctCount, incorrectCount }) => {
  return (
    <div className="scorecard bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <List className="w-5 h-5 mr-2 text-blue-500" />
        Score Card
      </h2>
    <div className="text-gray-600 mb-4 grid grid-cols-2 gap-4">
      <div className="flex items-center">
        <span className="font-medium text-gray-800">Score:</span>
        <span className="ml-2 text-blue-500 font-semibold">{correctCount}</span>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-gray-800">Questions:</span>
        <span className="ml-2 text-purple-500 font-semibold">10</span>
      </div>
    </div>
      <p className="text-gray-600 mb-2 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
        <span className="font-medium">Correct Answers: </span> {correctCount}
      </p>
      <p className="text-gray-600 flex items-center">
        <XCircle className="w-5 h-5 mr-2 text-red-500" />
        <span className="font-medium">Wrong Answers: </span> {incorrectCount}
      </p>
    </div>
  );
};

export default ScoreCard;
