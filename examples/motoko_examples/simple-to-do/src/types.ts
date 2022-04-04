import { nat } from 'azle';

export type ToDo = {
  id: nat;
  description: string;
  completed: boolean;
};
