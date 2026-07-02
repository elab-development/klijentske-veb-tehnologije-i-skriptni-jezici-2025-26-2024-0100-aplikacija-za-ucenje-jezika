import { useParams } from 'react-router-dom';

const Language = () => {
  const { id } = useParams();

  return <div>Language: {id}</div>;
};

export default Language;
