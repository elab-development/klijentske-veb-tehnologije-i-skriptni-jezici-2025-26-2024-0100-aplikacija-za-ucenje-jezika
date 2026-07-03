import { Languages as LanguagesIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import LanguageLessons from '../components/LanguageLessons';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { languages } from '../data/languages';
import { UserProgressManager } from '../types/UserProgress';

const Languages = () => {
  const { currentUser } = useAuth();
  const { getUserProgress, startLearningLanguage } = useUserProgress();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!currentUser) {
    return null;
  }

  const selectedLanguageId = searchParams.get('language') ?? languages[0]?.id;
  const selectedLanguage =
    languages.find((language) => language.id === selectedLanguageId) ??
    languages[0];

  const userProgress = getUserProgress(currentUser.id);
  const progressManager = new UserProgressManager(userProgress);
  const selectedLanguageProgress = selectedLanguage
    ? progressManager.getLanguageProgress(selectedLanguage.id)
    : undefined;
  const isLearningSelectedLanguage = selectedLanguage
    ? progressManager.isLearningLanguage(selectedLanguage.id)
    : false;

  const handleSelectLanguage = (languageId: string) => {
    setSearchParams({ language: languageId });
  };

  const handleStartLanguage = () => {
    if (!selectedLanguage) {
      return;
    }

    startLearningLanguage(
      currentUser.id,
      selectedLanguage.id,
      selectedLanguage.lessons[0]?.id,
    );
    toast.success(`Počeli ste da učite ${selectedLanguage.name}.`);
  };

  return (
    <main className='min-h-screen bg-violet-50 px-6 py-8 text-indigo-950 md:px-8'>
      <section>
        <div className='mb-5 flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600'>
            <LanguagesIcon aria-hidden='true' className='h-5 w-5' />
          </div>
          <div>
            <h1 className='font-display text-3xl tracking-normal text-indigo-950'>
              Jezici
            </h1>
            <p className='mt-1 text-sm font-bold text-gray-500'>
              Izaberite jezik i pogledajte lekcije.
            </p>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {languages.map((language) => {
            const isSelected = selectedLanguage?.id === language.id;
            const isLearningLanguage = progressManager.isLearningLanguage(
              language.id,
            );
            const completedLessons = progressManager.getCompletedLessonCount(
              language.id,
            );
            const progressPercent = progressManager.getProgressPercent(
              language.id,
              language.getLessonCount(),
            );

            return (
              <button
                className={[
                  'rounded-2xl border-2 bg-white p-5 text-left shadow-sm shadow-indigo-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100',
                  isSelected
                    ? 'border-indigo-500'
                    : 'border-violet-100 hover:border-indigo-200',
                ].join(' ')}
                key={language.id}
                onClick={() => handleSelectLanguage(language.id)}
                type='button'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h2 className='font-display text-2xl tracking-normal text-indigo-600'>
                      {language.name}
                    </h2>
                    <p className='mt-1 text-sm font-bold text-gray-500'>
                      {language.nativeName}
                    </p>
                  </div>
                  <span
                    className={[
                      'rounded-full px-3 py-1 text-xs font-black uppercase',
                      isLearningLanguage
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-violet-100 text-indigo-600',
                    ].join(' ')}
                  >
                    {isLearningLanguage ? 'Pohađate' : language.shortCode}
                  </span>
                </div>

                <div className='mt-5 flex items-center justify-between text-sm font-extrabold'>
                  <span className='text-gray-500'>
                    {completedLessons}/{language.getLessonCount()} lekcija
                  </span>
                  <span className='text-indigo-600'>{progressPercent}%</span>
                </div>

                <div className='mt-3 h-3 overflow-hidden rounded-full bg-violet-100'>
                  <div
                    className='h-full rounded-full bg-linear-to-r from-indigo-600 to-violet-500 transition-all'
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedLanguage && (
        <LanguageLessons
          completedLessonIds={
            selectedLanguageProgress?.completedLessonIds ?? []
          }
          currentLessonId={selectedLanguageProgress?.currentLessonId}
          isLearningLanguage={isLearningSelectedLanguage}
          key={selectedLanguage.id}
          language={selectedLanguage}
          onStartLanguage={handleStartLanguage}
        />
      )}
    </main>
  );
};

export default Languages;
