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

export type { Lesson, Category };
