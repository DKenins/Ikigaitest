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

type ReportContent = {
  title: string;
  content: string;
};

type Reports = {
  [key in Category]: {
    [key in Subcategory]: ReportContent;
  };
};

const getIkigaiReport = (category: Category, subcategory: Subcategory): ReportContent => {
  const reports: Reports = {
    passion: {
      CreativeArts: {
        title: 'Creative Arts',
        content: 'You thrive in creative environments where you can express your imagination and artistic talents. Consider careers in the arts, design, music, or writing.',
      },
      IntellectualPursuits: {
        title: 'Intellectual Pursuits',
        content: 'You enjoy deep thinking, learning, and exploring complex ideas. Consider careers in research, academia, or any field that allows for intellectual exploration.',
      },
      PhysicalActivities: {
        title: 'Physical Activities',
        content: 'You find fulfillment in physical activity and challenges. Careers in sports, fitness, or outdoor activities may be a good fit for you.',
      },
      ProblemSolving: { title: '', content: '' },
      Leadership: { title: '', content: '' },
      InterpersonalSkills: { title: '', content: '' },
      CommunityBuilding: { title: '', content: '' },
      EducationMentorship: { title: '', content: '' },
      SocialCauses: { title: '', content: '' },
      BusinessEntrepreneurship: { title: '', content: '' },
      SpecializedKnowledge: { title: '', content: '' },
    },
    vocation: {
      ProblemSolving: {
        title: 'Problem Solving',
        content: 'You excel at analyzing situations and finding logical solutions. Careers in engineering, IT, data analysis, or any field that requires strong problem-solving skills are ideal for you.',
      },
      Leadership: {
        title: 'Leadership',
        content: 'You have a natural ability to lead and inspire others. Consider careers in management, business leadership, or entrepreneurship.',
      },
      SpecializedKnowledge: {
        title: 'Specialized Knowledge',
        content: 'You value expertise and mastery of specific skills. Look for careers in fields that require deep specialized knowledge, such as medicine, law, or engineering.',
      },
      CreativeArts: { title: '', content: '' },
      IntellectualPursuits: { title: '', content: '' },
      PhysicalActivities: { title: '', content: '' },
      InterpersonalSkills: { title: '', content: '' },
      CommunityBuilding: { title: '', content: '' },
      EducationMentorship: { title: '', content: '' },
      SocialCauses: { title: '', content: '' },
      BusinessEntrepreneurship: { title: '', content: '' },
    },
    mission: {
      InterpersonalSkills: {
        title: 'Interpersonal Skills',
        content: 'You are skilled in communication and building relationships. Careers in counseling, social work, or any role that involves helping others may be fulfilling for you.',
      },
      CommunityBuilding: {
        title: 'Community Building',
        content: 'You are passionate about bringing people together and fostering community. Consider careers in community development, nonprofit work, or social entrepreneurship.',
      },
      EducationMentorship: {
        title: 'Education & Mentorship',
        content: 'You find fulfillment in teaching and guiding others. Careers in education, mentoring, or coaching may be a good fit for you.',
      },
      SocialCauses: {
        title: 'Social Causes',
        content: 'You are driven by a desire to make the world a better place. Consider careers in advocacy, nonprofit work, or any role that focuses on social justice.',
      },
      CreativeArts: { title: '', content: '' },
      IntellectualPursuits: { title: '', content: '' },
      PhysicalActivities: { title: '', content: '' },
      ProblemSolving: { title: '', content: '' },
      Leadership: { title: '', content: '' },
      BusinessEntrepreneurship: { title: '', content: '' },
      SpecializedKnowledge: { title: '', content: '' },
    },
    profession: {
      BusinessEntrepreneurship: {
        title: 'Business & Entrepreneurship',
        content: 'You are motivated by the challenge of building and growing businesses. Consider careers in business, entrepreneurship, or any field where you can apply your business acumen.',
      },
      SpecializedKnowledge: {
        title: 'Specialized Knowledge',
        content: 'You value expertise and mastery of specific skills. Look for careers in fields that require deep specialized knowledge, such as medicine, law, or engineering.',
      },
      Leadership: {
        title: 'Leadership',
        content: 'You have a natural ability to lead and inspire others. Consider careers in management, business leadership, or entrepreneurship.',
      },
      CreativeArts: { title: '', content: '' },
      IntellectualPursuits: { title: '', content: '' },
      PhysicalActivities: { title: '', content: '' },
      ProblemSolving: { title: '', content: '' },
      InterpersonalSkills: { title: '', content: '' },
      CommunityBuilding: { title: '', content: '' },
      EducationMentorship: { title: '', content: '' },
      SocialCauses: { title: '', content: '' },
    },
  };

  return reports[category][subcategory];
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

    // Sum the scores for each main category
    for (const category of Object.keys(storedScores) as Category[]) {
      categoryTotals[category] = Object.values(storedScores[category]).reduce(
        (acc: number, val: number) => acc + val,
        0
      );
    }

    // Determine the dominant and secondary categories
    const sortedCategories = Object.keys(categoryTotals).sort(
      (a, b) => categoryTotals[b as Category] - categoryTotals[a as Category]
    );
    setDominantCategory(sortedCategories[0] as Category);
    setSecondaryCategory(sortedCategories[1] as Category);
  }, []);

  if (!dominantCategory || !secondaryCategory) return null;

  // Find the subcategories with the highest score within the dominant and secondary categories
  const dominantSubcategory = Object.keys(scores[dominantCategory]).reduce((a, b) =>
    scores[dominantCategory][a as Subcategory] > scores[dominantCategory][b as Subcategory] ? a : b
  ) as Subcategory;

  const secondarySubcategory = Object.keys(scores[secondaryCategory]).reduce((a, b) =>
    scores[secondaryCategory][a as Subcategory] > scores[secondaryCategory][b as Subcategory] ? a : b
  ) as Subcategory;

  // Get the reports for the dominant and secondary elements
  const dominantReport = getIkigaiReport(dominantCategory, dominantSubcategory);
  const secondaryReport = getIkigaiReport(secondaryCategory, secondarySubcategory);

  // Prepare the data for the pie chart based on the dominant category
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
