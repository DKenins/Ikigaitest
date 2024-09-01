"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Category = "passion" | "vocation" | "mission" | "profession";
type Subcategory =
  | "CreativeArts"
  | "IntellectualPursuits"
  | "PhysicalActivities"
  | "ProblemSolving"
  | "Leadership"
  | "InterpersonalSkills"
  | "CommunityBuilding"
  | "EducationMentorship"
  | "SocialCauses"
  | "BusinessEntrepreneurship"
  | "SpecializedKnowledge";

type ReportContent = {
  title: string;
  content: string;
};

const getIkigaiReport = (category: Category, isSecondary: boolean = false): ReportContent => {
  const elementType = isSecondary ? 'secondary' : 'dominant';
  const reports: Record<Category, ReportContent> = {
    passion: {
      title: "Passion",
      content:
        `Your ${elementType} Ikigai element is Passion. You thrive when engaging in activities that ignite your creativity and allow you to express yourself. Pursuing careers or hobbies that align with your passions, such as art, music, or writing, can bring you deep fulfillment. Consider also integrating your passions into your daily life by setting aside time for creative projects or exploring new artistic outlets.`,
    },
    vocation: {
      title: "Vocation",
      content:
        `Your ${elementType} Ikigai element is Vocation. You excel in areas where you can apply your skills and expertise to solve problems and achieve mastery. Careers that challenge your intellect and require a high level of proficiency, such as engineering, IT, or specialized trades, will be highly satisfying for you. Seek out opportunities for continuous learning and skill development to stay engaged and motivated.`,
    },
    mission: {
      title: "Mission",
      content:
        `Your ${elementType} Ikigai element is Mission. You are driven by a sense of purpose and a desire to make a positive impact on the world. Careers in social work, education, or community development may be particularly rewarding for you. Your ability to connect with others and contribute to meaningful causes will lead to a fulfilling and purpose-driven life. Consider ways to integrate your mission into both your professional and personal life.`,
    },
    profession: {
      title: "Profession",
      content:
        `Your ${elementType} Ikigai element is Profession. You are motivated by professional success and the pursuit of tangible goals. Careers in business, entrepreneurship, or leadership roles where you can apply your skills and drive to achieve significant outcomes will suit you well. Focus on setting clear objectives and building a strong network to advance your career. Balancing your professional ambitions with personal fulfillment will be key to long-term happiness.`,
    },
  };

  return reports[category];
};

const formatSubcategoryLabel = (label: string): string => {
  return label.replace(/([A-Z])/g, ' $1').trim();
};

const ResultsPage = () => {
  const [scores, setScores] = useState<Record<Category, Record<Subcategory, number>>>({
    passion: {
      CreativeArts: 0,
      IntellectualPursuits: 0,
      PhysicalActivities: 0,
      ProblemSolving: 0,
      Leadership: 0,
      InterpersonalSkills: 0,
      CommunityBuilding: 0,
      EducationMentorship: 0,
      SocialCauses: 0,
      BusinessEntrepreneurship: 0,
      SpecializedKnowledge: 0
    },
    vocation: {
      ProblemSolving: 0,
      Leadership: 0,
      SpecializedKnowledge: 0,
      CreativeArts: 0,
      IntellectualPursuits: 0,
      PhysicalActivities: 0,
      InterpersonalSkills: 0,
      CommunityBuilding: 0,
      EducationMentorship: 0,
      SocialCauses: 0,
      BusinessEntrepreneurship: 0
    },
    mission: {
      InterpersonalSkills: 0,
      CommunityBuilding: 0,
      EducationMentorship: 0,
      SocialCauses: 0,
      CreativeArts: 0,
      IntellectualPursuits: 0,
      PhysicalActivities: 0,
      ProblemSolving: 0,
      Leadership: 0,
      BusinessEntrepreneurship: 0,
      SpecializedKnowledge: 0
    },
    profession: {
      BusinessEntrepreneurship: 0,
      SpecializedKnowledge: 0,
      Leadership: 0,
      CreativeArts: 0,
      IntellectualPursuits: 0,
      PhysicalActivities: 0,
      ProblemSolving: 0,
      InterpersonalSkills: 0,
      CommunityBuilding: 0,
      EducationMentorship: 0,
      SocialCauses: 0
    },
  });
  return reports[category][subcategory];
};

const ResultsPage = () => {
  const [scores, setScores] = useState<Record<Category, Record<Subcategory, number>>>({});
  const [dominantCategory, setDominantCategory] = useState<Category | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<Category | null>(null);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("ikigaiScores") || "{}");
    setScores(storedScores);

    const categoryTotals: Record<Category, number> = {
      passion: 0,
      vocation: 0,
      mission: 0,
      profession: 0,
    };

    for (const cat of Object.keys(storedScores) as Category[]) {
      categoryTotals[cat] = Object.values(storedScores[cat]).reduce(
        (acc: number, val: number) => acc + val,
        0
      );
    }

    const sortedCategories = Object.keys(categoryTotals).sort(
      (a, b) => categoryTotals[b as Category] - categoryTotals[a as Category]
    );
    setDominantCategory(sortedCategories[0] as Category);
    setSecondaryCategory(sortedCategories[1] as Category);
  }, []);

  if (!dominantCategory || !secondaryCategory) return null;

  const dominantSubcategory = Object.keys(scores[dominantCategory]).reduce((a, b) =>
    scores[dominantCategory][a as Subcategory] > scores[dominantCategory][b as Subcategory] ? a : b
  ) as Subcategory;
  const secondarySubcategory = Object.keys(scores[secondaryCategory]).reduce((a, b) =>
    scores[secondaryCategory][a as Subcategory] > scores[secondaryCategory][b as Subcategory] ? a : b
  ) as Subcategory;

  const dominantReport = getIkigaiReport(dominantCategory, dominantSubcategory);
  const secondaryReport = getIkigaiReport(secondaryCategory, secondarySubcategory);

  const mainCategoryData = {
    labels: Object.keys(categoryTotals).map((label) =>
      label.charAt(0).toUpperCase() + label.slice(1)
    ),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#F87171", "#60A5FA", "#34D399", "#FBBF24"],
        hoverBackgroundColor: ["#F87171", "#60A5FA", "#34D399", "#FBBF24"],
      },
    ],
  };

  const subCategoryData = {
    labels: Object.keys(scores[dominantCategory]).map((label) =>
      label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .charAt(0)
        .toUpperCase() + label.slice(1)
    ),
    datasets: [
      {
        data: Object.values(scores[dominantCategory]),
        backgroundColor: ["#F87171", "#60A5FA", "#34D399", "#FBBF24"],
        hoverBackgroundColor: ["#F87171", "#60A5FA", "#34D399", "#FBBF24"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-8">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Ikigai Results</h1>

        <p className="text-xl text-gray-600 mb-8 text-center font-bold">
          Dominant Element: {dominantReport.title}
        </p>
        <p className="text-md text-gray-600 mb-6">{dominantReport.content}</p>

        <p className="text-xl text-gray-600 mb-8 text-center font-bold">
          Secondary Element: {secondaryReport.title}
        </p>
        <p className="text-md text-gray-600 mb-6">{secondaryReport.content}</p>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4 text-center">Action Plan:</h3>
        <ul className="list-disc list-inside text-gray-600 mb-8">
          <li>
            Explore career opportunities aligned with{" "}
            <strong>{dominantReport.title}</strong> and <strong>{secondaryReport.title}</strong>.
          </li>
          <li>
            Further your education in areas that resonate with{" "}
            <strong>{dominantReport.title}</strong> and <strong>{secondaryReport.title}</strong>.
          </li>
        </ul>
      </div>

      <div className="flex justify-center items-center space-x-12">
        <div className="w-1/2">
          <Pie data={mainCategoryData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="w-1/2">
          <Pie data={subCategoryData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;