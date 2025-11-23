type Category = {
  id: string;
  name: string;
  image: string;
  createdAt: number;
};

type Lesson = {
  id: string;
  name: string;
  createdAt: number;
};

type Question = {
  id: string;
  lessonId: string;
  title: string;
  choices: string[];
  answer: string;
  externalResources: string[];
};

export type { Lesson, Category, Question };
