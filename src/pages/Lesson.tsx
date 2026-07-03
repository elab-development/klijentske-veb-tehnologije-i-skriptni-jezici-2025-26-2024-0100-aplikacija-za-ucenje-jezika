import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleCheck,
  CircleX,
  Flag,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  useState,
  type FormEvent,
} from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { languages } from '../data/languages';
import type {
  Language as LanguageModel,
  Lesson as LessonModel,
  LessonQuestion,
} from '../types/Language';
import { validateWordTranslationAnswer } from '../services/translationApi';
import { UserProgressManager } from '../types/UserProgress';

interface QuestionResult {
  correctAnswer: string;
  expectedAnswers: string[];
  isCorrect: boolean;
  selectedOptionId?: string;
  submittedAnswer: string;
  validationSource?: 'api' | 'fallback';
}

type FinishStatus = 'repeated' | 'saved';

interface LessonContentProps {
  currentUserId: number;
  language: LanguageModel;
  lesson: LessonModel;
}

const normalizeAnswer = (answer: string) =>
  answer
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const getQuestionTypeLabel = (question: LessonQuestion) => {
  if (question.type === 'multipleChoice') {
    return 'Višestruki izbor';
  }

  if (question.type === 'fillBlank') {
    return 'Dopuni rečenicu';
  }

  return 'Prevod reči';
};

const getCorrectAnswer = (question: LessonQuestion) => {
  if (question.type === 'multipleChoice') {
    return (
      question.options.find((option) => option.id === question.correctOptionId)
        ?.text ?? ''
    );
  }

  return question.correctAnswer;
};

const getAnswerShapeHint = (answer: string) => {
  const words = answer.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return 'Obratite pažnju na značenje pitanja i već poznate reči iz lekcije.';
  }

  if (words.length > 1) {
    return `Odgovor ima ${words.length} reči i počinje slovom "${words[0][0]}".`;
  }

  return `Odgovor ima ${words[0].length} slova i počinje slovom "${words[0][0]}".`;
};

const getQuestionHint = (question: LessonQuestion) => {
  if (question.hint) {
    return question.hint;
  }

  if (question.type === 'multipleChoice') {
    return 'Uporedite značenje svake ponuđene opcije sa rečju iz pitanja.';
  }

  return getAnswerShapeHint(getCorrectAnswer(question));
};

const LessonContent = ({
  currentUserId,
  language,
  lesson,
}: LessonContentProps) => {
  const navigate = useNavigate();
  const { completeLesson, getUserProgress } = useUserProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({});
  const [questionResults, setQuestionResults] = useState<
    Record<string, QuestionResult>
  >({});
  const [visibleHintIds, setVisibleHintIds] = useState<string[]>([]);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finishStatus, setFinishStatus] = useState<FinishStatus | null>(null);

  const questionCount = lesson.getQuestionCount();
  const safeQuestionIndex = Math.min(
    questionIndex,
    Math.max(questionCount - 1, 0),
  );
  const currentQuestion = lesson.questions[safeQuestionIndex];
  const currentResult = currentQuestion
    ? questionResults[currentQuestion.id]
    : undefined;
  const currentHint = currentQuestion ? getQuestionHint(currentQuestion) : '';
  const isHintVisible = currentQuestion
    ? visibleHintIds.includes(currentQuestion.id)
    : false;
  const textAnswer = currentQuestion
    ? (currentResult?.submittedAnswer ?? answerDrafts[currentQuestion.id] ?? '')
    : '';
  const answeredQuestionCount = Object.keys(questionResults).length;
  const correctAnswerCount = Object.values(questionResults).filter(
    (result) => result.isCorrect,
  ).length;
  const lessonProgressPercent =
    questionCount > 0
      ? Math.round((answeredQuestionCount / questionCount) * 100)
      : 0;

  if (!currentQuestion) {
    return <Navigate replace to='/languages' />;
  }

  const userProgress = getUserProgress(currentUserId);
  const progressManager = new UserProgressManager(userProgress);
  const wasLessonCompleted = progressManager.hasCompletedLesson(
    language.id,
    lesson.id,
  );
  const nextLesson = language.getLessonByOrder(lesson.order + 1);
  const backToLessonsPath = `/languages?language=${language.id}`;
  const nextLessonPath = nextLesson
    ? `/languages/${language.id}/lessons/${nextLesson.id}`
    : backToLessonsPath;

  const updateTextAnswer = (value: string) => {
    setAnswerDrafts((currentDrafts) => ({
      ...currentDrafts,
      [currentQuestion.id]: value,
    }));
  };

  const saveQuestionResult = (result: QuestionResult) => {
    setQuestionResults((currentResults) => ({
      ...currentResults,
      [currentQuestion.id]: result,
    }));
  };

  const toggleHint = () => {
    setVisibleHintIds((currentVisibleHintIds) =>
      currentVisibleHintIds.includes(currentQuestion.id)
        ? currentVisibleHintIds.filter(
            (visibleHintId) => visibleHintId !== currentQuestion.id,
          )
        : [...currentVisibleHintIds, currentQuestion.id],
    );
  };

  const handleMultipleChoice = (optionId: string) => {
    if (currentQuestion.type !== 'multipleChoice' || currentResult) {
      return;
    }

    const selectedOption = currentQuestion.options.find(
      (option) => option.id === optionId,
    );
    const correctAnswer = getCorrectAnswer(currentQuestion);

    saveQuestionResult({
      correctAnswer,
      expectedAnswers: [correctAnswer],
      isCorrect: optionId === currentQuestion.correctOptionId,
      selectedOptionId: optionId,
      submittedAnswer: selectedOption?.text ?? '',
    });
  };

  const handleTextAnswer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      currentQuestion.type === 'multipleChoice' ||
      currentResult ||
      isCheckingAnswer
    ) {
      return;
    }

    const submittedAnswer = textAnswer.trim();

    if (!submittedAnswer) {
      toast.error('Unesite odgovor pre provere.');
      return;
    }

    const correctAnswer = getCorrectAnswer(currentQuestion);

    if (currentQuestion.type === 'wordTranslation') {
      setIsCheckingAnswer(true);

      try {
        const validationResult = await validateWordTranslationAnswer({
          fallbackAnswer: correctAnswer,
          question: currentQuestion,
          submittedAnswer,
          targetLanguageCode: language.shortCode,
        });

        saveQuestionResult({
          correctAnswer,
          expectedAnswers: validationResult.expectedAnswers,
          isCorrect: validationResult.isCorrect,
          submittedAnswer,
          validationSource: validationResult.source,
        });
      } finally {
        setIsCheckingAnswer(false);
      }

      return;
    }

    saveQuestionResult({
      correctAnswer,
      expectedAnswers: [correctAnswer],
      isCorrect:
        normalizeAnswer(submittedAnswer) === normalizeAnswer(correctAnswer),
      submittedAnswer,
    });
  };

  const handlePreviousQuestion = () => {
    setQuestionIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const handleFinishLesson = () => {
    setFinishStatus(wasLessonCompleted ? 'repeated' : 'saved');
    completeLesson(currentUserId, language.id, lesson.id, nextLesson?.id);
    setIsFinished(true);

    if (wasLessonCompleted) {
      toast.success('Ponovili ste lekciju.');
      return;
    }

    toast.success('Lekcija je završena i progress je sačuvan.');
  };

  const handleNextQuestion = () => {
    if (!currentResult) {
      toast.error('Prvo odgovorite na trenutno pitanje.');
      return;
    }

    if (safeQuestionIndex === questionCount - 1) {
      handleFinishLesson();
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
  };

  const handleRepeatLesson = () => {
    setQuestionIndex(0);
    setAnswerDrafts({});
    setQuestionResults({});
    setVisibleHintIds([]);
    setIsFinished(false);
    setFinishStatus(null);
  };

  const renderFillBlankSentence = () => {
    if (currentQuestion.type !== 'fillBlank') {
      return null;
    }

    const [beforeBlank, afterBlank] = currentQuestion.sentence.split('____');

    return (
      <div className='mb-6 rounded-2xl bg-violet-50 p-5 text-lg font-extrabold leading-9 text-indigo-950'>
        {beforeBlank}
        <input
          className={[
            'mx-2 inline-block w-40 rounded-xl border-2 px-4 py-2 text-center text-base font-extrabold outline-none transition',
            currentResult
              ? currentResult.isCorrect
                ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                : 'border-rose-400 bg-rose-50 text-rose-700'
              : 'border-indigo-300 bg-white text-indigo-950 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100',
          ].join(' ')}
          disabled={Boolean(currentResult)}
          onChange={(event) => updateTextAnswer(event.target.value)}
          placeholder='___'
          type='text'
          value={textAnswer}
        />
        {afterBlank}
      </div>
    );
  };

  return (
    <main className='min-h-screen bg-violet-50 px-6 py-8 text-indigo-950 md:px-8'>
      <div className='mx-auto max-w-4xl'>
        <header className='mb-8 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm shadow-indigo-100'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
            <button
              className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-violet-100 text-indigo-600 transition hover:border-indigo-300 hover:bg-violet-50 active:scale-95'
              onClick={() => navigate(backToLessonsPath)}
              type='button'
            >
              <ArrowLeft aria-hidden='true' className='h-5 w-5' />
              <span className='sr-only'>Nazad na lekcije</span>
            </button>

            <div className='min-w-0 flex-1'>
              <p className='text-sm font-black uppercase text-indigo-400'>
                {language.name} · Lekcija {lesson.order}
              </p>
              <h1 className='font-display mt-1 text-3xl tracking-normal text-indigo-600'>
                {lesson.title}
              </h1>
              <div className='mt-4 h-3 overflow-hidden rounded-full bg-violet-100'>
                <div
                  className='h-full rounded-full bg-linear-to-r from-indigo-600 to-violet-500 transition-all'
                  style={{ width: `${lessonProgressPercent}%` }}
                />
              </div>
              <p className='mt-2 text-sm font-extrabold text-gray-500'>
                Pitanje {safeQuestionIndex + 1} od {questionCount} ·{' '}
                {answeredQuestionCount} odgovoreno
              </p>
            </div>
          </div>
        </header>

        {isFinished ? (
          <section className='rounded-3xl border-2 border-violet-100 bg-white p-8 text-center shadow-sm shadow-indigo-100'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600'>
              <Flag aria-hidden='true' className='h-8 w-8' />
            </div>
            <h2 className='font-display mt-5 text-4xl tracking-normal text-indigo-600'>
              Lekcija završena!
            </h2>
            <p className='mx-auto mt-3 max-w-lg text-sm font-bold text-gray-500'>
              Progress je upisan za korisnika i možete nastaviti sa sledećom
              lekcijom ili se vratiti na pregled jezika.
            </p>

            <div className='mt-7 grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl bg-violet-50 p-5'>
                <p className='font-display text-3xl tracking-normal text-indigo-600'>
                  {correctAnswerCount}/{questionCount}
                </p>
                <p className='mt-1 text-sm font-extrabold text-gray-500'>
                  tačnih odgovora
                </p>
              </div>
              <div className='rounded-2xl bg-violet-50 p-5'>
                <p className='font-display text-3xl tracking-normal text-emerald-600'>
                  {finishStatus === 'repeated' ? 'Ponovljeno' : 'Sačuvano'}
                </p>
                <p className='mt-1 text-sm font-extrabold text-gray-500'>
                  status lekcije
                </p>
              </div>
            </div>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center'>
              <Link
                className='flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95'
                to={backToLessonsPath}
              >
                <ArrowLeft aria-hidden='true' className='h-4 w-4' />
                Vrati se na lekcije
              </Link>
              {nextLesson && (
                <Link
                  className='flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-amber-100 transition hover:brightness-110 active:scale-95'
                  to={nextLessonPath}
                >
                  Sledeća lekcija
                  <ArrowRight aria-hidden='true' className='h-4 w-4' />
                </Link>
              )}
              <button
                className='flex items-center justify-center gap-2 rounded-full bg-violet-100 px-6 py-3 text-sm font-extrabold text-indigo-950 transition hover:bg-violet-200 active:scale-95'
                onClick={handleRepeatLesson}
                type='button'
              >
                <RotateCcw aria-hidden='true' className='h-4 w-4' />
                Ponovi lekciju
              </button>
            </div>
          </section>
        ) : (
          <>
            <div className='mb-6 flex justify-center gap-2'>
              {lesson.questions.map((question, index) => {
                const result = questionResults[question.id];
                const isCurrent = index === safeQuestionIndex;

                return (
                  <span
                    className={[
                      'h-3 w-3 rounded-full transition',
                      result?.isCorrect
                        ? 'bg-emerald-500'
                        : result
                          ? 'bg-rose-500'
                          : isCurrent
                            ? 'scale-125 bg-indigo-600'
                            : 'bg-violet-200',
                    ].join(' ')}
                    key={question.id}
                  />
                );
              })}
            </div>

            <section className='rounded-3xl border-2 border-violet-100 bg-white p-6 shadow-sm shadow-indigo-100 md:p-9'>
              <span className='mb-6 inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-600'>
                {getQuestionTypeLabel(currentQuestion)}
              </span>

              <h2 className='font-display text-3xl leading-tight tracking-normal text-indigo-950'>
                {currentQuestion.question}
              </h2>

              {currentHint && (
                <div className='mt-5'>
                  <button
                    className='inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-700 transition hover:bg-amber-200 active:scale-95'
                    onClick={toggleHint}
                    type='button'
                  >
                    <Lightbulb aria-hidden='true' className='h-4 w-4' />
                    {isHintVisible ? 'Sakrij hint' : 'Prikaži hint'}
                  </button>

                  {isHintVisible && (
                    <div className='mt-3 rounded-2xl border-2 border-amber-100 bg-amber-50 p-4 text-sm font-bold text-amber-800'>
                      {currentHint}
                    </div>
                  )}
                </div>
              )}

              {currentQuestion.type === 'multipleChoice' && (
                <div className='mt-8 grid gap-3 md:grid-cols-2'>
                  {currentQuestion.options.map((option, index) => {
                    const isSelected =
                      currentResult?.selectedOptionId === option.id;
                    const isCorrectOption =
                      option.id === currentQuestion.correctOptionId;

                    return (
                      <button
                        className={[
                          'flex items-center gap-3 rounded-2xl border-2 p-4 text-left text-sm font-extrabold transition',
                          currentResult
                            ? isCorrectOption
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                              : isSelected
                                ? 'border-rose-300 bg-rose-50 text-rose-700'
                                : 'border-violet-100 bg-white text-gray-400'
                            : 'border-violet-100 bg-white text-indigo-950 hover:border-indigo-300 hover:bg-violet-50',
                        ].join(' ')}
                        disabled={Boolean(currentResult)}
                        key={option.id}
                        onClick={() => handleMultipleChoice(option.id)}
                        type='button'
                      >
                        <span
                          className={[
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black',
                            currentResult && isCorrectOption
                              ? 'bg-emerald-500 text-white'
                              : currentResult && isSelected
                                ? 'bg-rose-500 text-white'
                                : 'bg-violet-100 text-indigo-600',
                          ].join(' ')}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === 'wordTranslation' && (
                <form className='mt-8' onSubmit={handleTextAnswer}>
                  <div className='mb-6 rounded-2xl bg-indigo-50 px-6 py-8 text-center'>
                    <p className='font-display text-4xl tracking-normal text-indigo-600'>
                      {currentQuestion.sourceWord}
                    </p>
                  </div>
                  <input
                    className={[
                      'mb-4 w-full rounded-2xl border-2 px-5 py-4 text-base font-extrabold outline-none transition',
                      currentResult
                        ? currentResult.isCorrect
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                          : 'border-rose-400 bg-rose-50 text-rose-700'
                        : 'border-violet-100 bg-violet-50 text-indigo-950 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100',
                    ].join(' ')}
                    disabled={Boolean(currentResult) || isCheckingAnswer}
                    onChange={(event) => updateTextAnswer(event.target.value)}
                    placeholder='Unesite odgovor'
                    type='text'
                    value={textAnswer}
                  />
                  {!currentResult && (
                    <button
                      className='flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
                      disabled={!textAnswer.trim() || isCheckingAnswer}
                      type='submit'
                    >
                      <CheckCircle2 aria-hidden='true' className='h-4 w-4' />
                      {isCheckingAnswer
                        ? 'Proveravam preko API-ja...'
                        : 'Proveri odgovor'}
                    </button>
                  )}
                </form>
              )}

              {currentQuestion.type === 'fillBlank' && (
                <form className='mt-8' onSubmit={handleTextAnswer}>
                  {renderFillBlankSentence()}
                  {!currentResult && (
                    <button
                      className='flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
                      disabled={!textAnswer.trim() || isCheckingAnswer}
                      type='submit'
                    >
                      <CheckCircle2 aria-hidden='true' className='h-4 w-4' />
                      Proveri odgovor
                    </button>
                  )}
                </form>
              )}

              {currentResult && (
                <div
                  className={[
                    'mt-6 flex items-start gap-3 rounded-2xl border-2 p-4 text-sm font-extrabold',
                    currentResult.isCorrect
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700',
                  ].join(' ')}
                >
                  {currentResult.isCorrect ? (
                    <CircleCheck aria-hidden='true' className='mt-0.5 h-5 w-5' />
                  ) : (
                    <CircleX aria-hidden='true' className='mt-0.5 h-5 w-5' />
                  )}
                  <span>
                    {currentResult.isCorrect ? (
                      <>
                        Tačno! Možete preći na sledeće pitanje.
                        {currentResult.validationSource === 'api' &&
                          ' Prevod je proveren preko MyMemory API-ja.'}
                      </>
                    ) : (
                      <>
                        Nije tačno. Tačan odgovor je:{' '}
                        {currentResult.correctAnswer}.
                        {currentResult.validationSource === 'fallback' &&
                          ' API trenutno nije dostupan, pa je korišćen lokalni odgovor.'}
                      </>
                    )}
                  </span>
                </div>
              )}

              <div className='mt-8 flex items-center justify-between gap-3'>
                <button
                  className='flex items-center gap-2 rounded-full bg-violet-100 px-5 py-3 text-sm font-extrabold text-indigo-950 transition hover:bg-violet-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50'
                  disabled={safeQuestionIndex === 0 || isCheckingAnswer}
                  onClick={handlePreviousQuestion}
                  type='button'
                >
                  <ArrowLeft aria-hidden='true' className='h-4 w-4' />
                  Prethodno
                </button>

                <button
                  className='flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50'
                  disabled={!currentResult || isCheckingAnswer}
                  onClick={handleNextQuestion}
                  type='button'
                >
                  {safeQuestionIndex === questionCount - 1
                    ? 'Završi lekciju'
                    : 'Sledeće'}
                  <ArrowRight aria-hidden='true' className='h-4 w-4' />
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

const Lesson = () => {
  const { languageId, lessonId } = useParams<{
    languageId: string;
    lessonId: string;
  }>();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  const language = languages.find(
    (availableLanguage) => availableLanguage.id === languageId,
  );
  const lesson = language?.getLessonById(lessonId ?? '');

  if (!language || !lesson || lesson.questions.length === 0) {
    return <Navigate replace to='/languages' />;
  }

  return (
    <LessonContent
      currentUserId={currentUser.id}
      key={`${language.id}-${lesson.id}`}
      language={language}
      lesson={lesson}
    />
  );
};

export default Lesson;
