import { useState, type SyntheticEvent } from 'react';
import {
  BarChart3,
  Flame,
  Globe2,
  Languages,
  LockKeyhole,
  Mail,
  Rocket,
  Trophy,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Unesite email adresu i lozinku pre prijave.');
      return;
    }

    toast.success(`Korisnik ${email} je uspešno ulogovan.`);
  };

  return (
    <main className='min-h-screen bg-violet-50 text-indigo-950'>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            border: '1px solid #e5e3ff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(79,70,229,0.18)',
            color: '#1e1b4b',
            fontWeight: 700,
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f59e0b',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <div className='grid min-h-screen lg:grid-cols-2'>
        <section className='relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-pink-500 px-12 py-14 lg:flex lg:flex-col lg:items-center lg:justify-center'>
          <div className='absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white opacity-10' />
          <div className='absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white opacity-10' />

          <div className='relative z-10 text-center'>
            <h1 className='flex items-center justify-center gap-3 text-5xl font-black tracking-tight text-white'>
              <Globe2 aria-hidden='true' className='h-12 w-12' />
              LinguaFlow
            </h1>

            <div className='mt-12 flex max-w-md flex-wrap justify-center gap-4'>
              <span className='flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-extrabold text-white shadow-sm'>
                <Languages aria-hidden='true' className='h-4 w-4' />
                Engleski
              </span>
              <span className='flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-extrabold text-white shadow-sm'>
                <Languages aria-hidden='true' className='h-4 w-4' />
                Nemački
              </span>
              <span className='flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-extrabold text-white shadow-sm'>
                <Trophy aria-hidden='true' className='h-4 w-4' />
                Bedževi
              </span>
              <span className='flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-extrabold text-white shadow-sm'>
                <Flame aria-hidden='true' className='h-4 w-4' />
                Streak
              </span>
              <span className='flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-extrabold text-white shadow-sm'>
                <BarChart3 aria-hidden='true' className='h-4 w-4' />
                Statistika
              </span>
            </div>
          </div>
        </section>

        <section className='flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10'>
          <div className='w-full max-w-md'>
            <div className='mb-8'>
              <h2 className='flex items-center gap-3 text-3xl font-black tracking-tight text-indigo-600'>
                Dobrodošli!
              </h2>
              <p className='mt-2 text-sm text-gray-500'>
                Prijavite se i nastavite sa učenjem
              </p>
            </div>

            <form className='space-y-5' onSubmit={handleLogin}>
              <div>
                <label
                  className='mb-2 block text-sm font-extrabold text-indigo-950'
                  htmlFor='login-email'
                >
                  Email adresa
                </label>
                <div className='relative'>
                  <Mail
                    aria-hidden='true'
                    className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-300'
                  />
                  <input
                    className='w-full rounded-xl border-2 border-violet-100 bg-violet-50 py-3 pl-12 pr-4 text-sm text-indigo-950 outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
                    id='login-email'
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Unesite email adresu'
                    type='email'
                    value={email}
                  />
                </div>
              </div>

              <div>
                <label
                  className='mb-2 block text-sm font-extrabold text-indigo-950'
                  htmlFor='login-password'
                >
                  Lozinka
                </label>
                <div className='relative'>
                  <LockKeyhole
                    aria-hidden='true'
                    className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-300'
                  />
                  <input
                    className='w-full rounded-xl border-2 border-violet-100 bg-violet-50 py-3 pl-12 pr-4 text-sm text-indigo-950 outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
                    id='login-password'
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Unesite lozinku'
                    type='password'
                    value={password}
                  />
                </div>
              </div>

              <button
                className='mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-br from-indigo-600 to-indigo-500 px-9 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:brightness-110 active:scale-95'
                type='submit'
              >
                <Rocket aria-hidden='true' className='h-5 w-5' />
                Prijavi se
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
