'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Category = 'passion' | 'vocation' | 'mission' | 'profession';

interface Option {
  label: string;
  category: Category;
}

interface Question {
  question: string;
  options: Option[];
}

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Category | null>(null);
  const [scores, setScores] = useState<Record<Category, number>>({
    passion: 0,
    vocation: 0,
    mission: 0,
    profession: 0,
  });
  const router = useRouter();

  const questions: Question[] = [
    {
      question: "What do you enjoy doing in your free time?",
      options: [
        { label: "Creating art or music", category: 'passion' },
        { label: "Solving complex puzzles or problems", category: 'vocation' },
        { label: "Volunteering or helping others", category: 'mission' },
        { label: "Developing new skills or learning", category: 'profession' },
      ],
    },
    {
      question: "What makes you feel most fulfilled?",
      options: [
        { label: "Expressing yourself creatively", category: 'passion' },
        { label: "Achieving mastery in a skill", category: 'vocation' },
        { label: "Making a positive impact on others", category: 'mission' },
        { label: "Being recognized for your professional achievements", category: 'profession' },
      ],
    },
    {
      question: "Which of these would you most enjoy as a career?",
      options: [
        { label: "Being a professional artist or musician", category: 'passion' },
        { label: "Working as a specialist in a technical field", category: 'vocation' },
        { label: "Leading a nonprofit organization", category: 'mission' },
        { label: "Starting your own business", category: 'profession' },
      ],
    },
    {
      question: "What type of activities make you lose track of time?",
      options: [
        { label: "Engaging in creative projects", category: 'passion' },
        { label: "Solving intricate challenges", category: 'vocation' },
        { label: "Helping others with their problems", category: 'mission' },
        { label: "Planning and organizing tasks", category: 'profession' },
      ],
    },
    {
      question: "How do others typically describe you?",
      options: [
        { label: "Creative and imaginative", category: 'passion' },
        { label: "Logical and analytical", category: 'vocation' },
        { label: "Empathetic and caring", category: 'mission' },
        { label: "Ambitious and driven", category: 'profession' },
      ],
    },
    {
      question: "What motivates you to get out of bed in the morning?",
      options: [
        { label: "The opportunity to create something new", category: 'passion' },
        { label: "The chance to use and improve your skills", category: 'vocation' },
        { label: "The ability to make a difference", category: 'mission' },
        { label: "The potential for professional success", category: 'profession' },
      ],
    },
    {
      question: "Which of these issues are you most passionate about?",
      options: [
        { label: "Promoting art and culture", category: 'passion' },
        { label: "Advancing technology and innovation", category: 'vocation' },
        { label: "Social justice and equality", category: 'mission' },
        { label: "Economic development and entrepreneurship", category: 'profession' },
      ],
    },
    {
      question: "What kind of work environment do you thrive in?",
      options: [
        { label: "A space that encourages creativity", category: 'passion' },
        { label: "A structured environment with clear goals", category: 'vocation' },
        { label: "A collaborative environment focused on helping others", category: 'mission' },
        { label: "A competitive environment with opportunities for growth", category: 'profession' },
      ],
    },
    {
      question: "What role do you often take on in group projects?",
      options: [
        { label: "The creative visionary", category: 'passion' },
        { label: "The problem solver", category: 'vocation' },
        { label: "The team supporter", category: 'mission' },
        { label: "The leader or organizer", category: 'profession' },
      ],
    },
    {
      question: "What do you believe the world needs more of?",
      options: [
        { label: "Creative expression", category: 'passion' },
        { label: "Innovative solutions", category: 'vocation' },
        { label: "Compassion and empathy", category: 'mission' },
        { label: "Economic opportunities", category: 'profession' },
      ],
    },
    {
      question: "Which of these describes your approach to problem-solving?",
      options: [
        { label: "Thinking outside the box", category: 'passion' },
        { label: "Using logic and analysis", category: 'vocation' },
        { label: "Considering the impact on others", category: 'mission' },
        { label: "Focusing on practical outcomes", category: 'profession' },
      ],
    },
    {
      question: "What type of feedback do you value the most?",
      options: [
        { label: "Praise for creativity", category: 'passion' },
        { label: "Recognition of your expertise", category: 'vocation' },
        { label: "Appreciation for your kindness", category: 'mission' },
        { label: "Acknowledgment of your achievements", category: 'profession' },
      ],
    },
    {
      question: "Which of these roles would you find most fulfilling?",
      options: [
        { label: "An artist or musician", category: 'passion' },
        { label: "A scientist or engineer", category: 'vocation' },
        { label: "A social worker or activist", category: 'mission' },
        { label: "An entrepreneur or executive", category: 'profession' },
      ],
    },
    {
      question: "How do you prefer to spend your weekends?",
      options: [
        { label: "Engaging in creative hobbies", category: 'passion' },
        { label: "Learning something new or practicing skills", category: 'vocation' },
        { label: "Volunteering or spending time with loved ones", category: 'mission' },
        { label: "Working on personal projects or goals", category: 'profession' },
      ],
    },
    {
      question: "What do you consider your greatest strength?",
      options: [
        { label: "Creativity", category: 'passion' },
        { label: "Analytical thinking", category: 'vocation' },
        { label: "Empathy", category: 'mission' },
        { label: "Ambition", category: 'profession' },
      ],
    },
    {
      question: "What type of projects do you find most rewarding?",
      options: [
        { label: "Artistic or creative projects", category: 'passion' },
        { label: "Complex and challenging projects", category: 'vocation' },
        { label: "Projects that help others", category: 'mission' },
        { label: "Projects that have a tangible outcome", category: 'profession' },
      ],
    },
    {
      question: "How do you handle stress?",
      options: [
        { label: "Channeling it into creative outlets", category: 'passion' },
        { label: "Breaking down the problem logically", category: 'vocation' },
        { label: "Seeking support from others", category: 'mission' },
        { label: "Focusing on achieving your goals", category: 'profession' },
      ],
    },
    {
      question: "What kind of goals do you set for yourself?",
      options: [
        { label: "Goals related to self-expression", category: 'passion' },
        { label: "Goals related to skill development", category: 'vocation' },
        { label: "Goals related to helping others", category: 'mission' },
        { label: "Goals related to career advancement", category: 'profession' },
      ],
    },
    {
      question: "What gives you a sense of purpose?",
      options: [
        { label: "Expressing yourself and creating something meaningful", category: 'passion' },
        { label: "Using your skills to solve problems", category: 'vocation' },
        { label: "Making a positive difference in the world", category: 'mission' },
        { label: "Achieving professional success and recognition", category: 'profession' },
      ],
    },
    {
      question: "What kind of legacy do you want to leave behind?",
      options: [
        { label: "A legacy of creativity and innovation", category: 'passion' },
        { label: "A legacy of expertise and knowledge", category: 'vocation' },
        { label: "A legacy of compassion and kindness", category: 'mission' },
        { label: "A legacy of success and influence", category: 'profession' },
      ],
    },
  ];

  useEffect(() => {
    if (currentQuestion === questions.length) {
      // Save scores to localStorage and navigate to results page
      localStorage.setItem('ikigaiScores', JSON.stringify(scores));
      router.push('/results');
    }
  }, [currentQuestion, scores, router]);

  const handleOptionChange = (category: Category) => {
    setSelectedOption(category);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setScores((prevScores) => ({
        ...prevScores,
        [selectedOption]: prevScores[selectedOption] + 1,
      }));
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completed, results should show up
        alert('Quiz completed! Display results here.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-heading text-gray-800 mb-4">Personality Test</h1>
        <p className="text-gray-600 mb-6">{questions[currentQuestion]?.question}</p>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionChange(option.category)}
              className={`p-4 border rounded-lg flex items-center justify-center text-gray-800 ${
                selectedOption === option.category ? 'border-blue-500' : 'border-gray-300'
              } hover:bg-blue-50 text-center`}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PersonalityTest;