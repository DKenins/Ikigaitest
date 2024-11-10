"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProgressBar: React.FC<{ currentQuestion: number; totalQuestions: number }> = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${i < currentQuestion ? "bg-blue-500" : "bg-blue-200"}`}
          />
        ))}
      </div>
      <p className="text-center text-blue-200 mt-2">
        Question {currentQuestion + 1} of {totalQuestions}
      </p>
    </div>
  );
};

const PersonalityTest = () => {
  const questions = [
    {
      question: "When you have some free time, you prefer to:",
      options: [
        { label: "Read a book or dive into a documentary", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Go for a run or hit the gym", category: 'passion', subcategory: 'PhysicalActivities' },
        { label: "Finally tackle that DIY project that's been bugging you.", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Catch up with friends over coffee", category: 'mission', subcategory: 'InterpersonalSkills' },
      ],
    },
    // Add other questions here...
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<{ label: string; category: string; subcategory: string } | null>(null);
  const totalQuestions = questions.length;
  const router = useRouter();

  const handleSubmit = () => {
    if (selectedOption) {
      const storedScores = JSON.parse(localStorage.getItem("ikigaiScores") || "{}");
      const updatedScores = { ...storedScores };

      // Update the scores based on the selected option
      updatedScores[selectedOption.category][selectedOption.subcategory] += 1;

      localStorage.setItem("ikigaiScores", JSON.stringify(updatedScores));
      setSelectedOption(null);
      setCurrentQuestion((prev) => prev + 1);

      if (currentQuestion === totalQuestions - 1) {
        const dominant = "DominantCategory"; // Replace with actual logic to determine dominant category
        const secondary = "SecondaryCategory"; // Replace with actual logic to determine secondary category
        router.push(`/results?dominant=${dominant}&secondary=${secondary}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
      <div className="bg-blue-800 bg-opacity-60 backdrop-blur-md rounded-lg p-4 mt-4 w-full shadow-lg border border-blue-600">
        <h1 className="text-2xl font-bold text-center text-blue-100 mb-4">{questions[currentQuestion]?.question}</h1>
        <div className="grid grid-cols-1 gap-4">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-800 text-blue-100 font-medium py-2 px-4 rounded-lg transition duration-50 ease-in-out transform hover:scale-105"
              onClick={() => setSelectedOption(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default PersonalityTest;