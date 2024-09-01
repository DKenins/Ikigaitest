"use client";

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Category = 'passion' | 'vocation' | 'mission' | 'profession';
type Subcategory =
  | 'CreativeArts'
  | 'IntellectualPursuits'
  | 'PhysicalActivities'
  | 'ProblemSolving'
  | 'Leadership'
  | 'InterpersonalSkills'
  | 'CommunityBuilding'
  | 'EducationMentorship'
  | 'SocialCauses'
  | 'BusinessEntrepreneurship'
  | 'SpecializedKnowledge';

const getIkigaiReport = (category: Category): { title: string; content: string } => {
  const reports = {
    passion: {
      title: 'Passion',
      content: 'Your passion drives you towards creative expression and activities that allow you to pursue what you love. Consider careers in the arts, design, or other creative industries.',
    },
    vocation: {
      title: 'Vocation',
      content: 'Your vocation is centered around your skills and expertise. You excel in areas that require specific skills and enjoy mastering these. Consider careers in technology, engineering, or specialized fields.',
    },
    mission: {
      title: 'Mission',
      content: 'Your mission is driven by your sense of purpose and desire to contribute to the world. You are passionate about making a positive impact and helping others. Careers in social work, non-profits, or community-oriented roles might be fulfilling for you.',
    },
    profession: {
      title: 'Profession',
      content: 'Your profession aligns with your ambitions and goals for success. You are motivated by achievements and career advancement. Consider careers in business, entrepreneurship, or leadership roles where you can be compensated for your expertise.',
    },
  };

  return reports[category];
};

const ResultsPage = () => {
  const [scores, setScores] = useState<Record<Category, Record<Subcategory, number>>>({});
  const [dominantCategory, setDominantCategory] = useState<Category | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<Category | null>(null);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('ikigaiScores') || '{}');
    setScores(storedScores);

    const categoryTotals: Record<Category, number> = {
      passion: 0,
      vocation: 0,
      mission: 0,
      profession: 0,
    };

    // Calculate total scores for each main category
    for (const category in categoryTotals) {
      categoryTotals[category as Category] = Object.values(storedScores[category as Category]).reduce(
        (acc: number, val: number) => acc + val,
        0
      );
    }

    // Determine dominant and secondary categories
    const sortedCategories = Object.keys(categoryTotals).sort(
      (a, b) => categoryTotals[b as Category] - categoryTotals[a as Category]
    );
    setDominantCategory(sortedCategories[0] as Category);
    setSecondaryCategory(sortedCategories[1] as Category);
  }, []);

  if (!dominantCategory || !secondaryCategory) return null;

  const dominantReport = getIkigaiReport(dominantCategory);
  const secondaryReport = getIkigaiReport(secondaryCategory);

  const data = {
    labels: Object.keys(scores[dominantCategory]),
    datasets: [
      {
        data: Object.values(scores[dominantCategory]),
        backgroundColor: ['#0466c8', '#023e7d', '#001845', '#001233'],
        hoverBackgroundColor: ['#0f85fa', '#4ba3fb', '#87c2fd', '#c3e0fe'],
      },
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Ikigai Results</h1>

        <p className="text-xl text-gray-600 mb-8 text-center font-bold">
          Dominant Element: {dominantReport.title}
        </p>
        <p className="text-md text-gray-600 mb-6">{dominantReport.content}</p>

        <p className="text-xl text-gray-600 mb-8 text-center font-bold">
          Secondary Element: {secondaryReport.title}
        </p>
        <p className="text-md text-gray-600 mb-6">{secondaryReport.content}</p>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Action Plan:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Explore career opportunities aligned with {dominantReport.title} and {secondaryReport.title}.</li>
          <li>Further your education in areas that resonate with {dominantReport.title} and {secondaryReport.title}.</li>
        </ul>

        <div className="mt-8">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
