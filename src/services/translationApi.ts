import type {
  LanguageShortCode,
  WordTranslationQuestion,
} from '../types/Language';

const MY_MEMORY_API_URL = 'https://api.mymemory.translated.net/get';
const SOURCE_LANGUAGE_CODE = 'sr';

interface MyMemoryResponseData {
  match?: number;
  translatedText?: string;
}

interface MyMemoryMatch {
  match?: number;
  translation?: string;
}

interface MyMemoryResponse {
  matches?: MyMemoryMatch[];
  responseData?: MyMemoryResponseData;
  responseDetails?: string;
  responseStatus?: number;
}

export interface WordTranslationValidationResult {
  expectedAnswers: string[];
  isCorrect: boolean;
  source: 'api' | 'fallback';
}

interface ValidateWordTranslationAnswerParams {
  fallbackAnswer: string;
  question: WordTranslationQuestion;
  submittedAnswer: string;
  targetLanguageCode: LanguageShortCode;
}

const normalizeTranslation = (value: string) =>
  value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();

const getUniqueAnswers = (answers: string[]) =>
  Array.from(
    new Set(
      answers
        .map((answer) => answer.trim())
        .filter((answer) => answer.length > 0),
    ),
  );

const isMatchingAnswer = (submittedAnswer: string, expectedAnswers: string[]) =>
  expectedAnswers.some(
    (expectedAnswer) =>
      normalizeTranslation(submittedAnswer) ===
      normalizeTranslation(expectedAnswer),
  );

const getApiTranslationCandidates = (response: MyMemoryResponse) =>
  getUniqueAnswers([
    response.responseData?.translatedText ?? '',
    ...(response.matches ?? []).map((match) => match.translation ?? ''),
  ]);

export const validateWordTranslationAnswer = async ({
  fallbackAnswer,
  question,
  submittedAnswer,
  targetLanguageCode,
}: ValidateWordTranslationAnswerParams): Promise<WordTranslationValidationResult> => {
  const fallbackAnswers = getUniqueAnswers([fallbackAnswer]);

  try {
    const searchParams = new URLSearchParams({
      langpair: `${SOURCE_LANGUAGE_CODE}|${targetLanguageCode}`,
      mt: '1',
      q: question.sourceWord,
    });
    const response = await fetch(`${MY_MEMORY_API_URL}?${searchParams}`);

    if (!response.ok) {
      throw new Error('MyMemory API nije vratio uspešan odgovor.');
    }

    const data = (await response.json()) as MyMemoryResponse;
    const expectedAnswers = getUniqueAnswers([
      ...getApiTranslationCandidates(data),
      ...fallbackAnswers,
    ]);

    if (expectedAnswers.length === 0) {
      throw new Error('MyMemory API nije vratio prevod.');
    }

    return {
      expectedAnswers,
      isCorrect: isMatchingAnswer(submittedAnswer, expectedAnswers),
      source: 'api',
    };
  } catch {
    return {
      expectedAnswers: fallbackAnswers,
      isCorrect: isMatchingAnswer(submittedAnswer, fallbackAnswers),
      source: 'fallback',
    };
  }
};
