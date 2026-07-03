import { BookOpen, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

import { languageCatalog } from '../data/languages';
import {
  UserProgressManager,
  type UserProgress,
} from '../types/UserProgress';

interface UserLanguagesProgressProps {
  userProgress: UserProgress;
  title?: string;
  emptyMessage?: string;
}

const UserLanguagesProgress = ({
  userProgress,
  title = 'Jezici koje pohađate',
  emptyMessage = 'Još uvek ne pohađate nijedan jezik.',
}: UserLanguagesProgressProps) => {
  const progressManager = new UserProgressManager(userProgress);
  const learningLanguageIds = progressManager.getLearningLanguageIds();

  return (
    <section>
      <div className='mb-5 flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600'>
          <Languages aria-hidden='true' className='h-5 w-5' />
        </div>
        <h2 className='font-display text-2xl tracking-normal text-indigo-950'>
          {title}
        </h2>
      </div>

      {learningLanguageIds.length === 0 ? (
        <div className='rounded-2xl border border-violet-100 bg-white p-6 shadow-sm shadow-indigo-100'>
          <p className='text-sm font-bold text-gray-500'>{emptyMessage}</p>
        </div>
      ) : (
        <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {learningLanguageIds.map((languageId) => {
            const language = languageCatalog.getLanguageById(languageId);

            if (!language) {
              return null;
            }

            const completedLessons = progressManager.getCompletedLessonCount(
              language.id,
            );
            const totalLessons = language.getLessonCount();
            const progressPercent = progressManager.getProgressPercent(
              language.id,
              totalLessons,
            );

            return (
              <Link
                className='rounded-2xl border border-violet-100 bg-white p-6 shadow-sm shadow-indigo-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100'
                key={language.id}
                to={`/languages?language=${language.id}`}
              >
                <div className='mb-5 flex items-start justify-between gap-4'>
                  <div>
                    <p className='font-display text-2xl tracking-normal text-indigo-600'>
                      {language.name}
                    </p>
                    <p className='mt-1 text-sm font-bold text-gray-500'>
                      {language.nativeName}
                    </p>
                  </div>
                  <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase text-amber-600'>
                    {language.shortCode}
                  </span>
                </div>

                <div className='mb-3 flex items-center justify-between text-sm font-extrabold'>
                  <span className='text-indigo-950'>Progress</span>
                  <span className='text-indigo-600'>{progressPercent}%</span>
                </div>

                <div className='h-3 overflow-hidden rounded-full bg-violet-100'>
                  <div
                    className='h-full rounded-full bg-linear-to-r from-indigo-600 to-violet-500 transition-all'
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className='mt-5 flex items-center gap-2 text-sm font-extrabold text-gray-500'>
                  <BookOpen aria-hidden='true' className='h-4 w-4' />
                  {completedLessons}/{totalLessons} završenih lekcija
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UserLanguagesProgress;
