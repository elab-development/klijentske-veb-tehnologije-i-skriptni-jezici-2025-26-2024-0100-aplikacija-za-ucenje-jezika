import { CheckCircle2, Circle, Play } from 'lucide-react';

import type { Language } from '../types/Language';

interface LanguageLessonsProps {
  language: Language;
  completedLessonIds: string[];
  isLearningLanguage: boolean;
  currentLessonId?: string;
  onStartLanguage?: () => void;
}

const LanguageLessons = ({
  language,
  completedLessonIds,
  currentLessonId,
  isLearningLanguage,
  onStartLanguage,
}: LanguageLessonsProps) => (
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
      {language.lessons.map((lesson) => {
        const isCompleted = completedLessonIds.includes(lesson.id);
        const isCurrent = currentLessonId === lesson.id && !isCompleted;

        return (
          <article
            className={[
              'flex flex-col gap-4 rounded-2xl border-2 bg-white p-5 shadow-sm shadow-indigo-100 md:flex-row md:items-center',
              isCompleted
                ? 'border-emerald-100'
                : isCurrent
                  ? 'border-indigo-200'
                  : 'border-violet-100',
            ].join(' ')}
            key={lesson.id}
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
          </article>
        );
      })}
    </div>
  </section>
);

export default LanguageLessons;
