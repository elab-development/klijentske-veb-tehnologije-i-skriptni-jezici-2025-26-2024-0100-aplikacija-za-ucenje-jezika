import { Link } from 'react-router-dom';

const Languages = () => {
  return (
    <div className='py-20 flex flex-col gap-4'>
      <Link to='/languages/english'>English</Link>
      <Link to='/languages/german'>German</Link>
    </div>
  );
};

export default Languages;
