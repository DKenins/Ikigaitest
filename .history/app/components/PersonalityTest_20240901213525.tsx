"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface Option {
  label: string;
  category: Category;
  subcategory: Subcategory;
}

interface Question {
  question: string;
  options: Option[];
}

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
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
  const router = useRouter();


  const questions: Question[] = [
    {
      question: "You have an entire week off with no responsibilities or obligations. What would you be most excited to do?",
      options: [
        { label: "Create art, music, or write a book", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Engage in intellectual pursuits like reading or researching", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Plan and execute a challenging physical activity like hiking or sports", category: 'passion', subcategory: 'PhysicalActivities' },
        { label: "Take an online course to improve your specialized skills", category: 'profession', subcategory: 'SpecializedKnowledge' },
      ],
    },
    {
      question: "At work, you are asked to solve a problem that requires your expertise. How do you approach it?",
      options: [
        { label: "Develop a creative solution that no one has thought of", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Analyze the problem using a logical step-by-step approach", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Lead the team by organizing the tasks and managing progress", category: 'vocation', subcategory: 'Leadership' },
        { label: "Collaborate with colleagues to find a solution that benefits everyone", category: 'mission', subcategory: 'InterpersonalSkills' },
      ],
    },
    {
      question: "You’re planning an event for your community. What role do you naturally take on?",
      options: [
        { label: "Creating the intellectual framework for discussions or lectures", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Managing the budget and overseeing operations", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "Coordinating volunteers and ensuring the event has a positive community impact", category: 'mission', subcategory: 'CommunityBuilding' },
        { label: "Planning logistics and solving practical challenges", category: 'vocation', subcategory: 'ProblemSolving' },
      ],
    },
    {
      question: "What gives you the most satisfaction at the end of a workday?",
      options: [
        { label: "Achieving a key business or professional milestone", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "Having completed a creative project", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Leading a successful team effort", category: 'vocation', subcategory: 'Leadership' },
        { label: "Making an impact on someone's life through mentorship", category: 'mission', subcategory: 'EducationMentorship' },
      ],
    },
    {
      question: "A close friend asks for advice on how to find fulfillment in their career. What do you recommend?",
      options: [
        { label: "Follow your passion and pursue creative projects that make you happy", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Set clear goals and work hard to achieve professional success", category: 'profession', subcategory: 'Leadership' },
        { label: "Focus on mastering a skill that makes you invaluable in your field", category: 'vocation', subcategory: 'SpecializedKnowledge' },
        { label: "Find a way to give back to your community and help others", category: 'mission', subcategory: 'CommunityBuilding' },
      ],
    },
    {
      question: "How do you prefer to spend your free time?",
      options: [
        { label: "Volunteering or helping others in your community", category: 'mission', subcategory: 'CommunityBuilding' },
        { label: "Working on intellectual hobbies like solving puzzles or learning something new", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Working on personal projects that challenge your skills", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Improving your physical abilities through sports or fitness activities", category: 'passion', subcategory: 'PhysicalActivities' },
      ],
    },
    {
      question: "When collaborating with a team, what role do you naturally gravitate towards?",
      options: [
        { label: "The leader who sets the direction and keeps the team on track", category: 'vocation', subcategory: 'Leadership' },
        { label: "The problem solver who finds practical solutions", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "The creative thinker who comes up with unique ideas", category: 'passion', subcategory: 'CreativeArts' },
        { label: "The supportive team player who encourages others", category: 'mission', subcategory: 'InterpersonalSkills' },
      ],
    },
    {
      question: "You’re leading a new project at work. What excites you most about it?",
      options: [
        { label: "The opportunity to explore new ideas and express your creativity", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Solving challenging problems and improving processes", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Making an impact by supporting a meaningful cause", category: 'mission', subcategory: 'SocialCauses' },
        { label: "Advancing your career or achieving business success", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
      ],
    },
    {
      question: "You’ve just been asked to lead a community initiative. What excites you the most?",
      options: [
        { label: "Developing a plan to solve the most pressing community issues", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Using creativity to engage the community in new ways", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Running the initiative effectively and ensuring it reaches its goals", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "Bringing people together and fostering a strong sense of community", category: 'mission', subcategory: 'CommunityBuilding' },
      ],
    },
    {
      question: "What motivates you to excel at your work?",
      options: [
        { label: "Achieving professional success and recognition", category: 'profession', subcategory: 'Leadership' },
        { label: "The opportunity to be creative and produce original work", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Making an impact through educating or mentoring others", category: 'mission', subcategory: 'EducationMentorship' },
        { label: "The satisfaction of solving complex problems", category: 'vocation', subcategory: 'ProblemSolving' },
      ],
    },
    {
      question: "You have the opportunity to mentor someone new in your field. What advice would you focus on?",
      options: [
        { label: "Encourage them to explore their intellectual potential", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Help them understand the value of giving back to the community", category: 'mission', subcategory: 'EducationMentorship' },
        { label: "Guide them in achieving success in their career", category: 'profession', subcategory: 'Leadership' },
        { label: "Teach them how to analyze and solve problems efficiently", category: 'vocation', subcategory: 'ProblemSolving' },
      ],
    },
    {
      question: "How do you usually approach a new learning opportunity?",
      options: [
        { label: "By considering how it will enhance your career or business skills", category: 'profession', subcategory: 'SpecializedKnowledge' },
        { label: "By exploring creative or artistic methods", category: 'passion', subcategory: 'CreativeArts' },
        { label: "By focusing on how it can help others or the community", category: 'mission', subcategory: 'EducationMentorship' },
        { label: "By diving deep into problem-solving techniques and approaches", category: 'vocation', subcategory: 'ProblemSolving' },
      ],
    },
    {
      question: "When facing a significant challenge, how do you react?",
      options: [
        { label: "Lead others with confidence to overcome the obstacle", category: 'vocation', subcategory: 'Leadership' },
        { label: "Find creative and original ways to address the challenge", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Use specialized knowledge to apply proven methods to solve the challenge", category: 'profession', subcategory: 'SpecializedKnowledge' },
        { label: "Work collaboratively to find a solution that benefits everyone", category: 'mission', subcategory: 'InterpersonalSkills' },
      ],
    },
    {
      question: "You’re organizing a fundraiser for a cause you care about. What is your role?",
      options: [
        { label: "Handling the logistics and ensuring everything runs smoothly", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Organizing the creative activities or entertainment", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Overseeing the finances and driving fundraising success", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "Bringing people together to create a sense of community and purpose", category: 'mission', subcategory: 'CommunityBuilding' },
      ],
    },
    {
      question: "What type of project do you find most fulfilling?",
      options: [
        { label: "A creative project where you can express your imagination", category: 'passion', subcategory: 'CreativeArts' },
        { label: "A challenging intellectual project that pushes your problem-solving skills", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "A project that advances your professional or business goals", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "A project that directly benefits others in your community", category: 'mission', subcategory: 'SocialCauses' },
      ],
    },
    {
      question: "When organizing a large event, which part excites you the most?",
      options: [
        { label: "Solving the logistical challenges and ensuring everything runs smoothly", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Designing the creative visuals and themes", category: 'passion', subcategory: 'CreativeArts' },
        { label: "Managing the budget and financial aspects", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "Bringing people together for a greater purpose", category: 'mission', subcategory: 'CommunityBuilding' },
      ],
    },
    {
      question: "What activity makes you feel most energized and fulfilled?",
      options: [
        { label: "Engaging in physical activities like sports or exercise", category: 'passion', subcategory: 'PhysicalActivities' },
        { label: "Tackling complex intellectual challenges", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Taking on leadership roles that challenge me professionally", category: 'profession', subcategory: 'Leadership' },
        { label: "Mentoring others and sharing knowledge", category: 'mission', subcategory: 'EducationMentorship' },
      ],
    },
    {
      question: "If you could start a new initiative tomorrow, what would it be focused on?",
      options: [
        { label: "A creative project, such as starting a new blog or art project", category: 'passion', subcategory: 'CreativeArts' },
        { label: "A business venture that challenges me to grow professionally", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "A community project that brings people together", category: 'mission', subcategory: 'CommunityBuilding' },
        { label: "A complex technical project that pushes my problem-solving skills", category: 'vocation', subcategory: 'ProblemSolving' },
      ],
    },
    {
      question: "When planning for the future, what is your biggest priority?",
      options: [
        { label: "Growing my career and achieving business success", category: 'profession', subcategory: 'BusinessEntrepreneurship' },
        { label: "Pursuing intellectual or creative projects that fulfill me personally", category: 'passion', subcategory: 'IntellectualPursuits' },
        { label: "Helping others through education or mentorship", category: 'mission', subcategory: 'EducationMentorship' },
        { label: "Continuously developing problem-solving skills to tackle new challenges", category: 'vocation', subcategory: 'ProblemSolving' },
      ],
    },
    {
      question: "What do you enjoy most about your hobbies?",
      options: [
        { label: "The challenge of pushing my physical limits through sports", category: 'passion', subcategory: 'PhysicalActivities' },
        { label: "Finding new ways to approach and solve complex problems", category: 'vocation', subcategory: 'ProblemSolving' },
        { label: "Organizing and leading group activities or teams", category: 'profession', subcategory: 'Leadership' },
        { label: "Knowing that my hobbies contribute to helping others", category: 'mission', subcategory: 'SocialCauses' },
      ],
    },
  ];
 
  const handleSubmit = () => {
    if (selectedOption) {
      const { category, subcategory } = selectedOption;
      setScores((prevScores) => ({
        ...prevScores,
        [category]: {
          ...prevScores[category],
          [subcategory]: prevScores[category][subcategory] + 1,
        },
      }));

      setSelectedOption(null);
      setCurrentQuestion((prev) => prev + 1);

      if (currentQuestion === questions.length - 1) {
        localStorage.setItem("ikigaiScores", JSON.stringify(scores));
        router.push("/results");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Discover Your Ikigai
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          {questions[currentQuestion]?.question}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`p-6 border rounded-lg flex items-center justify-center text-lg font-medium transition-transform transform hover:scale-105 ${
                selectedOption?.label === option.label
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-600 transition-colors"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Submit"}
        </button>

        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 h-full rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
