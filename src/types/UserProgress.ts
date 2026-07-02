export interface UserLanguageProgress {
  languageId: string;
  completedLessonIds: string[];
  currentLessonId?: string;
}

export interface UserProgress {
  userId: number;
  languages: UserLanguageProgress[];
}

type LegacyUserProgress = Partial<UserProgress> & {
  userId: number;
};

export const createEmptyUserProgress = (userId: number): UserProgress => ({
  userId,
  languages: [],
});

export const normalizeUserProgress = (
  userProgress: LegacyUserProgress,
): UserProgress => ({
  userId: userProgress.userId,
  languages: userProgress.languages ?? [],
});

export class UserProgressManager {
  userProgress: UserProgress;

  constructor(userProgress: UserProgress) {
    this.userProgress = userProgress;
  }

  getLearningLanguageIds() {
    return this.userProgress.languages.map(
      (languageProgress) => languageProgress.languageId,
    );
  }

  isLearningLanguage(languageId: string) {
    return this.getLearningLanguageIds().includes(languageId);
  }

  getLanguageProgress(languageId: string) {
    return this.userProgress.languages.find(
      (languageProgress) => languageProgress.languageId === languageId,
    );
  }

  getCompletedLessonIds(languageId: string) {
    return this.getLanguageProgress(languageId)?.completedLessonIds ?? [];
  }

  getCompletedLessonCount(languageId?: string) {
    if (languageId) {
      return this.getCompletedLessonIds(languageId).length;
    }

    return this.userProgress.languages.reduce(
      (totalCompletedLessons, languageProgress) =>
        totalCompletedLessons + languageProgress.completedLessonIds.length,
      0,
    );
  }

  hasCompletedLesson(languageId: string, lessonId: string) {
    return this.getCompletedLessonIds(languageId).includes(lessonId);
  }

  getProgressPercent(languageId: string, totalLessons: number) {
    if (totalLessons <= 0) {
      return 0;
    }

    return Math.round(
      (this.getCompletedLessonCount(languageId) / totalLessons) * 100,
    );
  }

  startLearningLanguage(languageId: string, currentLessonId?: string) {
    const hasLanguageProgress = Boolean(this.getLanguageProgress(languageId));

    if (hasLanguageProgress) {
      return this.userProgress;
    }

    return {
      ...this.userProgress,
      languages: [
        ...this.userProgress.languages,
        {
          languageId,
          completedLessonIds: [],
          currentLessonId,
        },
      ],
    };
  }

  completeLesson(
    languageId: string,
    lessonId: string,
    nextLessonId?: string,
  ) {
    const nextUserProgress = this.startLearningLanguage(
      languageId,
      nextLessonId ?? lessonId,
    );

    return {
      ...nextUserProgress,
      languages: nextUserProgress.languages.map((languageProgress) => {
        if (languageProgress.languageId !== languageId) {
          return languageProgress;
        }

        if (languageProgress.completedLessonIds.includes(lessonId)) {
          return languageProgress;
        }

        return {
          ...languageProgress,
          completedLessonIds: [
            ...languageProgress.completedLessonIds,
            lessonId,
          ],
          currentLessonId: nextLessonId,
        };
      }),
    };
  }
}
