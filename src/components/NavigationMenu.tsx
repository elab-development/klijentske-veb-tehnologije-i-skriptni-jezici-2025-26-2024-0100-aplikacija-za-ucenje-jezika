import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Home, Languages, LogOut, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../contexts/AuthContext';

const NavigationMenu = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const userInitial = currentUser?.name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    toast.success('Uspešno ste se odjavili.');
    navigate('/login');
  };

  return (
    <aside className='sticky top-0 z-40 border-b-2 border-violet-100 bg-white shadow-sm shadow-indigo-100 md:fixed md:left-0 md:top-0 md:flex md:h-screen md:w-60 md:flex-col md:border-b-0 md:border-r-2'>
      <div className='flex items-center justify-between gap-4 border-violet-100 px-5 py-4 md:block md:border-b-2 md:px-6 md:py-7'>
        <div className='flex items-center gap-3 md:block'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-white md:hidden'>
            <BookOpen aria-hidden='true' className='h-5 w-5' />
          </div>
          <p className='font-display text-xl tracking-normal text-indigo-600 md:text-2xl'>
            LinguaFlow
          </p>
        </div>
      </div>

      <nav className='flex gap-2 overflow-x-auto px-4 pb-4 md:flex-1 md:flex-col md:overflow-visible md:px-3 md:py-4'>
        <NavLink
          className={({ isActive }) =>
            [
              'flex min-w-24 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition md:min-w-0 md:justify-start',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:bg-violet-50 hover:text-indigo-950',
            ].join(' ')
          }
          end
          to='/'
        >
          <Home aria-hidden='true' className='h-5 w-5 shrink-0' />
          <span>Početna</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            [
              'flex min-w-24 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition md:min-w-0 md:justify-start',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:bg-violet-50 hover:text-indigo-950',
            ].join(' ')
          }
          to='/profile'
        >
          <UserRound aria-hidden='true' className='h-5 w-5 shrink-0' />
          <span>Profil</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            [
              'flex min-w-24 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition md:min-w-0 md:justify-start',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:bg-violet-50 hover:text-indigo-950',
            ].join(' ')
          }
          to='/languages'
        >
          <Languages aria-hidden='true' className='h-5 w-5 shrink-0' />
          <span>Jezici</span>
        </NavLink>
      </nav>

      {currentUser && (
        <div className='border-t-2 border-violet-100 px-4 py-4 md:px-3'>
          <NavLink
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-xl px-4 py-3 transition',
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-violet-50',
              ].join(' ')
            }
            to='/profile'
          >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-sm font-black text-white'>
              {userInitial}
            </div>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-black text-indigo-950'>
                {currentUser.name}
              </p>
              <p className='truncate text-xs font-bold text-amber-500'>
                {currentUser.email}
              </p>
            </div>
          </NavLink>

          <button
            className='mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm font-extrabold text-indigo-950 transition hover:bg-violet-100 active:scale-95'
            onClick={handleLogout}
            type='button'
          >
            <LogOut aria-hidden='true' className='h-4 w-4' />
            Odjavi se
          </button>
        </div>
      )}
    </aside>
  );
};

export default NavigationMenu;
