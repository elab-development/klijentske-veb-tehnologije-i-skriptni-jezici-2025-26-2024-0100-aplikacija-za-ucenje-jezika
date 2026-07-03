export type LanguageShortCode = 'en' | 'de' | 'es';

export type LessonQuestionType =
  | 'multipleChoice'
  | 'fillBlank'
  | 'wordTranslation';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface BaseLessonQuestion {
  id: string;
  type: LessonQuestionType;
  question: string;
  hint?: string;
}

export interface MultipleChoiceQuestion extends BaseLessonQuestion {
  type: 'multipleChoice';
  options: QuestionOption[];
  correctOptionId: string;
}

export interface FillBlankQuestion extends BaseLessonQuestion {
  type: 'fillBlank';
  sentence: string;
  correctAnswer: string;
}

export interface WordTranslationQuestion extends BaseLessonQuestion {
  type: 'wordTranslation';
  sourceWord: string;
  correctAnswer: string;
}

export type LessonQuestion =
  | MultipleChoiceQuestion
  | FillBlankQuestion
  | WordTranslationQuestion;

export interface LessonData {
  id: string;
  title: string;
  description: string;
  order: number;
  questions: LessonQuestion[];
}

export interface LanguageData {
  id: string;
  name: string;
  shortCode: LanguageShortCode;
  nativeName: string;
  lessons: LessonData[];
}

export class Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  questions: LessonQuestion[];

  constructor(data: LessonData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.order = data.order;
    this.questions = data.questions;
  }

  getQuestionCount() {
    return this.questions.length;
  }

  getQuestionsByType(type: LessonQuestionType) {
    return this.questions.filter((question) => question.type === type);
  }
}

export class Language {
  id: string;
  name: string;
  shortCode: LanguageShortCode;
  nativeName: string;
  lessons: Lesson[];

  constructor(data: LanguageData) {
    this.id = data.id;
    this.name = data.name;
    this.shortCode = data.shortCode;
    this.nativeName = data.nativeName;
    this.lessons = data.lessons.map((lesson) => new Lesson(lesson));
  }

  getLessonCount() {
    return this.lessons.length;
  }

  getLessonById(lessonId: string) {
    return this.lessons.find((lesson) => lesson.id === lessonId);
  }

  getLessonByOrder(order: number) {
    return this.lessons.find((lesson) => lesson.order === order);
  }
}

export class LanguageCatalog {
  languages: Language[];

  constructor(languages: Language[]) {
    this.languages = languages;
  }

  getAllLanguages() {
    return this.languages;
  }

  getLanguageById(languageId: string) {
    return this.languages.find((language) => language.id === languageId);
  }

  getLanguageByShortCode(shortCode: LanguageShortCode) {
    return this.languages.find((language) => language.shortCode === shortCode);
  }

  getLessonsByLanguageId(languageId: string) {
    return this.getLanguageById(languageId)?.lessons ?? [];
  }

  getLesson(languageId: string, lessonId: string) {
    return this.getLanguageById(languageId)?.getLessonById(lessonId);
  }
}
