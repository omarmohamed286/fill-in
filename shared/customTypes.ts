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

type ExternalResource = {
  id: string;
  title: string;
  url: string;
};

type Question = {
  id: string;
  lessonId: string;
  title: string;
  choices: string[];
  answer: string;
  explanation?: string;
  code?: string;
  externalResources: ExternalResource[];
};

export type { Lesson, Category, Question };
