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
        "Your dominant Ikigai element is Passion. You thrive when engaging in activities that ignite your creativity and allow you to express yourself. Pursuing careers or hobbies that align with your passions, such as art, music, or writing, can bring you deep fulfillment. Consider also integrating your passions into your daily life by setting aside time for creative projects or exploring new artistic outlets.",
    },
    vocation: {
      title: "Vocation",
      content:
        "Your dominant Ikigai element is Vocation. You excel in areas where you can apply your skills and expertise to solve problems and achieve mastery. Careers that challenge your intellect and require a high level of proficiency, such as engineering, IT, or specialized trades, will be highly satisfying for you. Seek out opportunities for continuous learning and skill development to stay engaged and motivated.",
    },
    mission: {
      title: "Mission",
      content:
        "Your dominant Ikigai element is Mission. You are driven by a sense of purpose and a desire to make a positive impact on the world. Careers in social work, education, or community development may be particularly rewarding for you. Your ability to connect with others and contribute to meaningful causes will lead to a fulfilling and purpose-driven life. Consider ways to integrate your mission into both your professional and personal life.",
    },
    profession: {
      title: "Profession",
      content:
        "Your dominant Ikigai element is Profession. You are motivated by professional success and the pursuit of tangible goals. Careers in business, entrepreneurship, or leadership roles where you can apply your skills and drive to achieve significant outcomes will suit you well. Focus on setting clear objectives and building a strong network to advance your career. Balancing your professional ambitions with personal fulfillment will be key to long-term happiness.",
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

  // Data for pie chart for main categories
  const mainCategoryData = {
    labels: Object.keys(scores),
    datasets: [
      {
        data: Object.keys(scores).map(category =>
          Object.values(scores[category as Category]).reduce((a, b) => a + b, 0)
        ),
        backgroundColor: ["#0466c8", "#023e7d", "#001845", "#001233"],
        hoverBackgroundColor: ["#0f85fa", "#4ba3fb", "#87c2fd", "#c3e0fe"],
      },
    ],
  };

  // Data for pie chart based on the dominant category's subcategories
  const subcategoryData = {
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
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full mb-8">
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
      </div>

      {/* Pie Chart for Main Categories */}
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Main Category Distribution
        </h3>
        <Pie data={mainCategoryData} />
      </div>

      {/* Pie Chart for Subcategories of Dominant Category */}
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {dominantReport.title} Subcategories
        </h3>
        <Pie data={subcategoryData} />
      </div>
    </div>
  );
};

export default ResultsPage;
