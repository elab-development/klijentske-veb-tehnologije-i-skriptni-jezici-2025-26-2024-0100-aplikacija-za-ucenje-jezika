import type { UserProgress } from '../types/UserProgress';

export const predefinedUserProgress: UserProgress[] = [
  {
    userId: 1,
    languages: [
      {
        languageId: 'english',
        completedLessonIds: [
          'english-greetings',
          'english-family',
          'english-numbers',
        ],
        currentLessonId: 'english-colors',
      },
      {
        languageId: 'german',
        completedLessonIds: ['german-greetings'],
        currentLessonId: 'german-family',
      },
    ],
  },
  {
    userId: 2,
    languages: [
      {
        languageId: 'german',
        completedLessonIds: [
          'german-greetings',
          'german-family',
          'german-numbers',
          'german-colors',
        ],
        currentLessonId: 'german-food',
      },
      {
        languageId: 'spanish',
        completedLessonIds: ['spanish-greetings', 'spanish-family'],
        currentLessonId: 'spanish-numbers',
      },
    ],
  },
  {
    userId: 3,
    languages: [
      {
        languageId: 'english',
        completedLessonIds: [
          'english-greetings',
          'english-family',
          'english-numbers',
          'english-colors',
          'english-food',
          'english-animals',
        ],
        currentLessonId: 'english-home',
      },
    ],
  },
  {
    userId: 4,
    languages: [],
  },
];
