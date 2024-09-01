"use client";

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for the categories and subcategories
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

// Define the structure of the report object
type ReportContent = {
  title: string;
  content: string;
};

type Reports = Record<Category, Record<Subcategory, ReportContent>>;

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
      ProblemSolving: {
        title: 'Problem Solving',
        content: 'You have a knack for approaching challenges with creative solutions, making you suitable for careers that require innovative thinking.',
      },
      Leadership: {
        title: 'Leadership',
        content: 'You are naturally inclined to lead others and enjoy the responsibility of guiding teams toward achieving their goals.',
      },
      InterpersonalSkills: {
        title: 'Interpersonal Skills',
        content: 'You excel in communication and building strong relationships, making roles in HR, counseling, or social work a good fit.',
      },
      CommunityBuilding: {
        title: 'Community Building',
        content: 'Your passion for bringing people together and fostering community ties could lead you to a fulfilling career in community development or social work.',
      },
      EducationMentorship: {
        title: 'Education & Mentorship',
        content: 'You find fulfillment in teaching and guiding others. Careers in education, mentoring, or coaching may be a good fit for you.',
      },
      SocialCauses: {
        title: 'Social Causes',
        content: 'You are driven by a desire to make the world a better place. Consider careers in advocacy, nonprofit work, or any role that focuses on social justice.',
      },
      BusinessEntrepreneurship: {
        title: 'Business & Entrepreneurship',
        content: 'You are motivated by the challenge of building and growing businesses. Consider careers in business, entrepreneurship, or any field where you can apply your business acumen.',
      },
      SpecializedKnowledge: {
        title: 'Specialized Knowledge',
        content: 'You value expertise and mastery of specific skills. Look for careers in fields that require deep specialized knowledge, such as medicine, law, or engineering.',
      }
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
      CreativeArts: {
        title: 'Creative Arts',
        content: 'Your creativity also lends itself well to solving problems in unique ways, making you suited for roles that require both artistic talent and analytical thinking.',
      },
      IntellectualPursuits: {
        title: 'Intellectual Pursuits',
        content: 'You enjoy tackling intellectual challenges and excel in environments where critical thinking is required.',
      },
      PhysicalActivities: {
        title: 'Physical Activities',
        content: 'You bring a practical approach to problem-solving that often involves physical tasks or challenges.',
      },
      InterpersonalSkills: {
        title: 'Interpersonal Skills',
        content: 'You effectively use your interpersonal skills to mediate and resolve conflicts, making you ideal for leadership and management roles.',
      },
      CommunityBuilding: {
        title: 'Community Building',
        content: 'You have the ability to solve community-related issues by engaging in activities that strengthen ties within the community.',
      },
      EducationMentorship: {
        title: 'Education & Mentorship',
        content: 'You excel in teaching problem-solving techniques, making you well-suited for mentoring roles.',
      },
      SocialCauses: {
        title: 'Social Causes',
        content: 'You apply logical thinking to social causes, identifying effective solutions for community issues.',
      },
      BusinessEntrepreneurship: {
        title: 'Business & Entrepreneurship',
        content: 'Your problem-solving skills are particularly valuable in the business world, where innovation is key to success.',
      }
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
      CreativeArts: {
        title: 'Creative Arts',
        content: 'You channel your creativity into social causes, helping to inspire and educate others through your work.',
      },
      IntellectualPursuits: {
        title: 'Intellectual Pursuits',
        content: 'You use your intellectual capabilities to advocate for and educate others about social issues.',
      },
      PhysicalActivities: {
        title: 'Physical Activities',
        content: 'You involve yourself in physical activities that promote social change, such as charity runs or community clean-ups.',
      },
      ProblemSolving: {
        title: 'Problem Solving',
        content: 'You tackle social issues with a logical approach, finding effective solutions to community problems.',
      },
      Leadership: {
        title: 'Leadership',
        content: 'You lead social initiatives with confidence, guiding others to achieve community goals.',
      },
      BusinessEntrepreneurship: {
        title: 'Business & Entrepreneurship',
        content: 'You use your business acumen to drive social change through entrepreneurship and innovation.',
      },
      SpecializedKnowledge: {
        title: 'Specialized Knowledge',
        content: 'Your expertise in a specific area is valuable in educating and mentoring others to bring about social change.',
      }
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
      CreativeArts: {
        title: 'Creative Arts',
        content: 'Your creativity can drive innovation in your profession, leading to new opportunities and career growth.',
      },
      IntellectualPursuits: {
        title: 'Intellectual Pursuits',
        content: 'Your intellectual curiosity and ability to solve complex problems make you a valuable asset in your profession.',
      },
      PhysicalActivities: {
        title: 'Physical Activities',
        content: 'Your profession may involve physical activities that require discipline and dedication, such as in sports or fitness training.',
      },
      ProblemSolving: {
        title: 'Problem Solving',
        content: 'You apply your problem-solving skills to overcome professional challenges, leading to career advancement.',
      },
      InterpersonalSkills: {
        title: 'Interpersonal Skills',
        content: 'Your ability to communicate and build relationships is a key asset in your professional life, aiding in collaboration and leadership.',
      },
      CommunityBuilding: {
        title: 'Community Building',
        content: 'Your profession may involve building and maintaining strong communities, whether in a business or social context.',
      },
      EducationMentorship: {
        title: 'Education & Mentorship',
        content: 'You find fulfillment in mentoring others in your profession, helping them to grow and succeed.',
      },
      SocialCauses: {
        title: 'Social Causes',
        content: 'Your profession may align with social causes, allowing you to make a difference in the world through your work.',
      }
    },
  };

  // Ensure TypeScript understands that the provided keys are valid
  return reports[category][subcategory];
};

// Your other component code...

export default ResultsPage;
