"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";

type Category = "passion" | "vocation" | "mission" | "profession";
type Subcategory = "CreativeArts" | "IntellectualPursuits" | "PhysicalActivities" | "ProblemSolving" | "Leadership" | "InterpersonalSkills" | "CommunityBuilding" | "EducationMentorship" | "SocialCauses" | "BusinessEntrepreneurship" | "SpecializedKnowledge";

const initializeScores = () => {
  return {
    passion: { CreativeArts: 0, IntellectualPursuits: 0, PhysicalActivities: 0 },
    vocation: { ProblemSolving: 0, Leadership: 0, SpecializedKnowledge: 0 },
    mission: { InterpersonalSkills: 0, CommunityBuilding: 0, EducationMentorship: 0, SocialCauses: 0 },
    profession: { BusinessEntrepreneurship: 0, SpecializedKnowledge: 0, Leadership: 0 },
  };
};

const getIkigaiReport = (category: Category, isSecondary: boolean = false) => {
  const elementType = isSecondary ? "secondary" : "dominant";
  const reports: Record<Category, { title: string; content: string }> = {
    passion: { title: "Passion", content: `Your ${elementType} Ikigai element is Passion.` },
    vocation: { title: "Vocation", content: `Your ${elementType} Ikigai element is Vocation.` },
    mission: { title: "Mission", content: `Your ${elementType} Ikigai element is Mission.` },
    profession: { title: "Profession", content: `Your ${elementType} Ikigai element is Profession.` },
  };
  return reports[category];
};

const ResultsPage = () => {
  const [scores, setScores] = useState<Record<Category, Record<Subcategory, number>>>(initializeScores());
  const [dominantCategory, setDominantCategory] = useState<Category | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<Category | null>(null);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("ikigaiScores") || "{}");
    if (storedScores && typeof storedScores === "object") {
      setScores(storedScores);
    }

    const categoryTotals: Record<Category, number> = { passion: 0, vocation: 0, mission: 0, profession: 0 };
    for (const category in categoryTotals) {
      categoryTotals[category as Category] = Object.values(scores[category as Category]).reduce((acc, val) => acc + (val || 0), 0);
    }

    const sortedCategories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b as Category] - categoryTotals[a as Category]);
    setDominantCategory(sortedCategories[0] as Category);
    setSecondaryCategory(sortedCategories[1] as Category);
  }, [scores]);

  if (!dominantCategory || !secondaryCategory) return null;

  const dominantReport = getIkigaiReport(dominantCategory);
  const secondaryReport = getIkigaiReport(secondaryCategory, true);

  const mainCategoryData = [
    { name: "Passion", value: scores.passion.CreativeArts + scores.passion.IntellectualPursuits + scores.passion.PhysicalActivities },
    { name: "Vocation", value: scores.vocation.ProblemSolving + scores.vocation.Leadership + scores.vocation.SpecializedKnowledge },
    { name: "Mission", value: scores.mission.InterpersonalSkills + scores.mission.CommunityBuilding + scores.mission.EducationMentorship + scores.mission.SocialCauses },
    { name: "Profession", value: scores.profession.BusinessEntrepreneurship + scores.profession.SpecializedKnowledge + scores.profession.Leadership },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 space-y-6">
          <h1 className="text-5xl font-semibold text-blue-800 tracking-wide font-sans">Results Overview</h1>
          <p className="text-blue-500 mt-1 text-xl">A Glimpse into Your Ikigai</p>

          <div className="text-gray-700 text-lg font-semibold bg-blue-50 p-4 rounded-lg space-y-4">
            <p>{dominantReport.content}</p>
            <p>{secondaryReport.content}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Dominant Category: {dominantReport.title}</h3>
              <p>{mainCategoryData.find(data => data.name === dominantReport.title)?.value.toString() || "0"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Secondary Category: {secondaryReport.title}</h3>
              <p>{mainCategoryData.find(data => data.name === secondaryReport.title)?.value.toString() || "0"}</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={mainCategoryData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {mainCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;

