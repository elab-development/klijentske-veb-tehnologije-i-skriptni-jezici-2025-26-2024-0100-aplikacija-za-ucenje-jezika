import { LogOut, UserRound } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import UserLanguagesProgress from '../components/UserLanguagesProgress';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { getUserProgress } = useUserProgress();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate replace to='/login' />;
  }

  const userProgress = getUserProgress(currentUser.id);

  const handleLogout = () => {
    logout();
    toast.success('Uspešno ste se odjavili.');
    navigate('/login');
  };

  return (
    <main className='min-h-screen bg-violet-50 px-6 py-12 text-indigo-950'>
      <section className='mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl shadow-indigo-100'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600'>
              <UserRound aria-hidden='true' className='h-7 w-7' />
            </div>
            <h1 className='font-display text-3xl text-indigo-600'>
              {currentUser.name}
            </h1>
            <p className='mt-2 text-sm font-bold text-gray-500'>
              {currentUser.email}
            </p>
          </div>

          <button
            className='flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95'
            onClick={handleLogout}
            type='button'
          >
            <LogOut aria-hidden='true' className='h-4 w-4' />
            Odjavi se
          </button>
        </div>

        <div className='mt-8'>
          <UserLanguagesProgress
            emptyMessage='Još uvek nemate izabranih jezika.'
            title='Jezici koje učite'
            userProgress={userProgress}
          />
        </div>
      </section>
    </main>
  );
};

export default Profile;
