import type { User } from '../types/User';

export const predefinedUsers: User[] = [
  {
    id: 1,
    name: 'Nikola Petrović',
    email: 'nikola@lingoflow.com',
    password: 'nikola123',
    learningLanguages: ['Engleski', 'Nemacki'],
  },
  {
    id: 2,
    name: 'Mina Jovanović',
    email: 'mina@lingoflow.com',
    password: 'mina123',
    learningLanguages: ['Nemacki'],
  },
  {
    id: 3,
    name: 'Marko Ilić',
    email: 'marko@lingoflow.com',
    password: 'marko123',
    learningLanguages: ['Engleski'],
  },
  {
    id: 4,
    name: 'Miljana Stojanović',
    email: 'miljana@lingoflow.com',
    password: 'miljana123',
    learningLanguages: ['Engleski', 'Nemacki'],
  },
];
