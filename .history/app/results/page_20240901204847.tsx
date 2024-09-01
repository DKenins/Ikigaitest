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

const getIkigaiReport = (category: Category): ReportContent => {
  const reports: Record<Category, ReportContent> = {
    passion: {
      title: "Passion",
      content:
        "Your dominant Ikigai element is Passion. You are driven by creativity and the pursuit of activities that you love. Consider careers or hobbies that allow you to express your creative talents and follow your passions.",
    },
    vocation: {
      title: "Vocation",
      content:
        "Your dominant Ikigai element is Vocation. You excel at what you do and find satisfaction in mastering your skills. Consider careers that allow you to use your specialized knowledge and problem-solving abilities.",
    },
    mission: {
      title: "Mission",
      content:
        "Your dominant Ikigai element is Mission. You are driven by a desire to contribute to the greater good and make a positive impact on others. Consider careers or activities that allow you to serve and help others.",
    },
    profession: {
      title: "Profession",
      content:
        "Your dominant Ikigai element is Profession. You are motivated by achieving professional success and recognition. Consider careers that offer opportunities for growth, leadership, and advancement.",
    },
  };

  return reports[category];
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
      SpecializedKnowledge: 0,
    },
    vocation: {
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
      SpecializedKnowledge: 0,
    },
    mission: {
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
      SpecializedKnowledge: 0,
    },
    profession: {
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
      SpecializedKnowledge: 0,
    },
  });

  const [dominantCategory, setDominantCategory] = useState<Category | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<Category | null>(null);

  useEffect(() => {
    const storedScores = JSON.parse(
      localStorage.getItem("ikigaiScores") || "{}"
    ) as Record<Category, Record<Subcategory, number>>;
    setScores(storedScores);

    const categoryTotals: Record<Category, number> = {
      passion: 0,
      vocation: 0,
      mission: 0,
      profession: 0,
    };

    // Calculate total scores for each main category
    for (const category in categoryTotals) {
      categoryTotals[category as Category] = Object.values(
        storedScores[category as Category]
      ).reduce((acc: number, val: number) => acc + val, 0);
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

  // Data for pie chart based on the dominant category's subcategories
  const data = {
    labels: Object.keys(scores[dominantCategory]),
    datasets: [
      {
        data: Object.values(scores[dominantCategory]),
        backgroundColor: ["#0466c8", "#023e7d", "#001845", "#001233"],
        hoverBackgroundColor: ["#0f85fa", "#4ba3fb", "#87c2fd", "#c3e0fe"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Ikigai Results
        </h1>

        <p className="text-xl text-gray-600 mb-8 text-center font-bold">
          Dominant Element: {dominantReport.title}
        </p>
        <p className="text-md text-gray-600 mb-6">{dominantReport.content}</p>

        <p className="text-xl text-gray-600 mb-8 text-center font-bold">
          Secondary Element: {secondaryReport.title}
        </p>
        <p className="text-md text-gray-600 mb-6">{secondaryReport.content}</p>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">
          Action Plan:
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            Explore career opportunities aligned with {dominantReport.title} and{" "}
            {secondaryReport.title}.
          </li>
          <li>
            Further your education in areas that resonate with{" "}
            {dominantReport.title} and {secondaryReport.title}.
          </li>
        </ul>

        <div className="mt-8">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
