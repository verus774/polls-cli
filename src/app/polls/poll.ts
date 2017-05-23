import {ICategory} from '../categories/category';
export interface IPoll {
  _id?: string;
  title: string;
  description?: string;
  category: ICategory;
  active?: boolean;
  questions: {
    _id?: string;
    text: string;
    choices: string[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

const a: IPoll = {
  _id: '',
  title: '',
  description: '',
  category: {
    _id: ''
  },
  active: true,
  questions: [
    {
      _id: '',
      text: '',
      choices: ['', '']
    },
    {
      _id: '',
      text: '',
      choices: ['', '']
    }
  ],
  createdAt: '',
  updatedAt: ''
};
