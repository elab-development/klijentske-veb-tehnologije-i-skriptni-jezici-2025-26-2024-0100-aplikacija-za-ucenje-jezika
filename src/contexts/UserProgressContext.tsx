import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

import { predefinedUserProgress } from '../data/userProgress';
import {
  createEmptyUserProgress,
  normalizeUserProgress,
  UserProgressManager,
  type UserProgress,
} from '../types/UserProgress';

interface UserProgressContextValue {
  userProgressList: UserProgress[];
  getUserProgress: (userId: number) => UserProgress;
  startLearningLanguage: (
    userId: number,
    languageId: string,
    currentLessonId?: string,
  ) => void;
  completeLesson: (
    userId: number,
    languageId: string,
    lessonId: string,
    nextLessonId?: string,
  ) => void;
}

const saveUserProgressList = (userProgressList: UserProgress[]) => {
  localStorage.setItem(
    'lingoflow_user_progress',
    JSON.stringify(userProgressList),
  );
};

const mergeWithPredefinedUserProgress = (
  storedUserProgressList: UserProgress[],
) => {
  const userProgressMap = new Map<number, UserProgress>();

  predefinedUserProgress.forEach((userProgress) => {
    userProgressMap.set(
      userProgress.userId,
      normalizeUserProgress(userProgress),
    );
  });

  storedUserProgressList.forEach((userProgress) => {
    userProgressMap.set(
      userProgress.userId,
      normalizeUserProgress(userProgress),
    );
  });

  return Array.from(userProgressMap.values());
};

const getStoredUserProgressList = () => {
  const storedUserProgress = localStorage.getItem('lingoflow_user_progress');

  if (!storedUserProgress) {
    saveUserProgressList(predefinedUserProgress);
    return predefinedUserProgress;
  }

  try {
    const mergedUserProgressList = mergeWithPredefinedUserProgress(
      JSON.parse(storedUserProgress) as UserProgress[],
    );

    saveUserProgressList(mergedUserProgressList);

    return mergedUserProgressList;
  } catch {
    localStorage.removeItem('lingoflow_user_progress');
    saveUserProgressList(predefinedUserProgress);
    return predefinedUserProgress;
  }
};

const UserProgressContext = createContext<UserProgressContextValue | null>(
  null,
);

export const UserProgressProvider = ({ children }: PropsWithChildren) => {
  const [userProgressList, setUserProgressList] = useState<UserProgress[]>(
    getStoredUserProgressList,
  );

  const getUserProgress = (userId: number) =>
    userProgressList.find((userProgress) => userProgress.userId === userId) ??
    createEmptyUserProgress(userId);

  const updateUserProgress = (updatedUserProgress: UserProgress) => {
    const hasUserProgress = userProgressList.some(
      (userProgress) => userProgress.userId === updatedUserProgress.userId,
    );

    const nextUserProgressList = hasUserProgress
      ? userProgressList.map((userProgress) =>
          userProgress.userId === updatedUserProgress.userId
            ? updatedUserProgress
            : userProgress,
        )
      : [...userProgressList, updatedUserProgress];

    setUserProgressList(nextUserProgressList);
    saveUserProgressList(nextUserProgressList);
  };

  const startLearningLanguage = (
    userId: number,
    languageId: string,
    currentLessonId?: string,
  ) => {
    const updatedUserProgress = new UserProgressManager(
      getUserProgress(userId),
    ).startLearningLanguage(languageId, currentLessonId);

    updateUserProgress(updatedUserProgress);
  };

  const completeLesson = (
    userId: number,
    languageId: string,
    lessonId: string,
    nextLessonId?: string,
  ) => {
    const updatedUserProgress = new UserProgressManager(
      getUserProgress(userId),
    ).completeLesson(languageId, lessonId, nextLessonId);

    updateUserProgress(updatedUserProgress);
  };

  return (
    <UserProgressContext.Provider
      value={{
        userProgressList,
        getUserProgress,
        startLearningLanguage,
        completeLesson,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const userProgressContext = useContext(UserProgressContext);

  if (!userProgressContext) {
    throw new Error(
      'useUserProgress mora da se koristi unutar UserProgressProvider komponente.',
    );
  }

  return userProgressContext;
};
