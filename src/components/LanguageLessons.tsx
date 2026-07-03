import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Play,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import type { Language } from '../types/Language';

interface LanguageLessonsProps {
  language: Language;
  completedLessonIds: string[];
  isLearningLanguage: boolean;
  currentLessonId?: string;
  onStartLanguage?: () => void;
}

const lessonsPerPage = 5;

const LanguageLessons = ({
  language,
  completedLessonIds,
  currentLessonId,
  isLearningLanguage,
  onStartLanguage,
}: LanguageLessonsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.max(
    1,
    Math.ceil(language.lessons.length / lessonsPerPage),
  );
  const pageNumbers = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index + 1),
    [pageCount],
  );
  const firstLessonIndex = (currentPage - 1) * lessonsPerPage;
  const visibleLessons = language.lessons.slice(
    firstLessonIndex,
    firstLessonIndex + lessonsPerPage,
  );

  return (
    <section className='mt-10'>
      <div className='mb-5 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm shadow-indigo-100 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-sm font-black uppercase text-indigo-400'>
            Izabrani jezik
          </p>
          <h2 className='font-display mt-1 text-3xl tracking-normal text-indigo-600'>
            {language.name}
          </h2>
          <p className='mt-2 text-sm font-bold text-gray-500'>
            {language.lessons.length} lekcija za vežbanje.
          </p>
        </div>

        {!isLearningLanguage && onStartLanguage && (
          <button
            className='flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95'
            onClick={onStartLanguage}
            type='button'
          >
            <Play aria-hidden='true' className='h-4 w-4' />
            Započni učenje
          </button>
        )}
      </div>

      <div className='space-y-4'>
        {visibleLessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isCurrent = currentLessonId === lesson.id && !isCompleted;
          const lessonActionLabel = isCompleted
            ? 'Ponovi'
            : isLearningLanguage
              ? 'Radi lekciju'
              : 'Otvori';

          return (
            <Link
              className={[
                'flex flex-col gap-4 rounded-2xl border-2 bg-white p-5 shadow-sm shadow-indigo-100 md:flex-row md:items-center',
                'transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100',
                isCompleted
                  ? 'border-emerald-100'
                  : isCurrent
                    ? 'border-indigo-200'
                    : 'border-violet-100',
              ].join(' ')}
              key={lesson.id}
              to={`/languages/${language.id}/lessons/${lesson.id}`}
            >
              <div
                className={[
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg',
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-600'
                    : isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-violet-100 text-gray-400',
                ].join(' ')}
              >
                {lesson.order}
              </div>

              <div className='min-w-0 flex-1'>
                <h3 className='text-base font-black text-indigo-950'>
                  {lesson.title}
                </h3>
                <p className='mt-1 text-sm font-bold text-gray-500'>
                  {lesson.description}
                </p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  <span className='rounded-full bg-violet-100 px-3 py-1 text-xs font-extrabold text-indigo-600'>
                    {lesson.getQuestionCount()} pitanja
                  </span>
                </div>
              </div>

              <div className='flex shrink-0 flex-col gap-2 md:items-end'>
                <div
                  className={[
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold',
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-600'
                      : isCurrent
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-violet-100 text-gray-500',
                  ].join(' ')}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 aria-hidden='true' className='h-4 w-4' />
                      Završeno
                    </>
                  ) : (
                    <>
                      <Circle aria-hidden='true' className='h-4 w-4' />
                      {isLearningLanguage ? 'Treba završiti' : 'Nije započeto'}
                    </>
                  )}
                </div>
                <span className='flex items-center gap-1 text-sm font-extrabold text-indigo-600'>
                  {lessonActionLabel}
                  <ArrowRight aria-hidden='true' className='h-4 w-4' />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {pageCount > 1 && (
        <nav
          aria-label='Paginacija lekcija'
          className='mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm shadow-indigo-100 sm:flex-row'
        >
          <p className='text-sm font-extrabold text-gray-500'>
            Strana {currentPage} od {pageCount}
          </p>

          <div className='flex items-center gap-2'>
            <button
              aria-label='Prethodna strana'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-40'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              type='button'
            >
              <ChevronLeft aria-hidden='true' className='h-5 w-5' />
            </button>

            {pageNumbers.map((pageNumber) => (
              <button
                aria-current={currentPage === pageNumber ? 'page' : undefined}
                className={[
                  'flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-black transition',
                  currentPage === pageNumber
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-violet-100 text-indigo-600 hover:bg-indigo-100',
                ].join(' ')}
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                type='button'
              >
                {pageNumber}
              </button>
            ))}

            <button
              aria-label='Sledeća strana'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-40'
              disabled={currentPage === pageCount}
              onClick={() =>
                setCurrentPage((page) => Math.min(pageCount, page + 1))
              }
              type='button'
            >
              <ChevronRight aria-hidden='true' className='h-5 w-5' />
            </button>
          </div>
        </nav>
      )}
    </section>
  );
};

export default LanguageLessons;
