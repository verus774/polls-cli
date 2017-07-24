export interface IResult {
  _id?: string;
  poll: {
    id: string;
    title: string;
  };
  results: {
    questionId: string;
    questionText: string;
    answer: string;
    count: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
