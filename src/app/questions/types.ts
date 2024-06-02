export type Answer = { [questionId: number]: boolean };
export type Question = {
  id: number;
  question: string;
};

type Pair<T> = [T, T];
export type Contradiction = {
  id: number;
  contradiction: Pair<{ questionId: number; answer: boolean }>;
};

export type ContradictionResult = {
  id: number;
  contradiction: Pair<{ questionId: number; answer: boolean }>;
  nervous: boolean;
};
