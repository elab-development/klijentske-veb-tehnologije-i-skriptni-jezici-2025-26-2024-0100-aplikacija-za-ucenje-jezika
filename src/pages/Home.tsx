import { CheckCircle2 } from 'lucide-react';

import UserLanguagesProgress from '../components/UserLanguagesProgress';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { UserProgressManager } from '../types/UserProgress';

const Home = () => {
  const { currentUser } = useAuth();
  const { getUserProgress } = useUserProgress();

  if (!currentUser) {
    return null;
  }

  const userProgress = getUserProgress(currentUser.id);
  const progressManager = new UserProgressManager(userProgress);
  const completedLessonsCount = progressManager.getCompletedLessonCount();

  return (
    <main className='min-h-screen bg-violet-50 px-6 py-8 text-indigo-950 md:px-8'>
      <section className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-violet-600 to-pink-500 p-8 text-white shadow-xl shadow-indigo-200 md:p-12'>
        <div className='absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white opacity-10' />
        <div className='absolute -bottom-24 left-1/2 h-80 w-80 rounded-full bg-white opacity-10' />

        <div className='relative z-10 max-w-2xl'>
          <p className='text-sm font-extrabold text-white/80'>
            Dobrodošli nazad, {currentUser.name}
          </p>
          <h1 className='font-display mt-3 text-4xl leading-tight tracking-normal md:text-5xl'>
            Nastavite sa učenjem svojim tempom.
          </h1>
          <p className='mt-4 max-w-lg text-base font-bold leading-7 text-white/80'>
            Kratak pregled jezika koje pohađate i lekcija koje ste već
            završili.
          </p>

          <div className='mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/25 bg-white/15 px-5 py-4 backdrop-blur'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600'>
              <CheckCircle2 aria-hidden='true' className='h-6 w-6' />
            </div>
            <div>
              <p className='font-display text-3xl leading-none'>
                {completedLessonsCount}
              </p>
              <p className='mt-1 text-sm font-extrabold text-white/80'>
                završenih lekcija
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='mt-8'>
        <UserLanguagesProgress userProgress={userProgress} />
      </div>
    </main>
  );
};

export default Home;
