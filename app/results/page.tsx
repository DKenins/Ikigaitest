'use client';

import { useEffect, useState } from 'react';

const ResultsPage = () => {
  const [scores, setScores] = useState({
    passion: 0,
    vocation: 0,
    mission: 0,
    profession: 0,
  });

  useEffect(() => {
    const finalScores = JSON.parse(localStorage.getItem('ikigaiScores') || '{}');
    setScores(finalScores);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-heading text-gray-800 mb-4">Your Ikigai Results</h1>
        <p>Passion: {scores.passion}</p>
        <p>Vocation: {scores.vocation}</p>
        <p>Mission: {scores.mission}</p>
        <p>Profession: {scores.profession}</p>
      </div>
    </div>
  );
};

export default ResultsPage;
