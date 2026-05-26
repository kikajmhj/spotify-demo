import { useParams } from 'react-router';

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();

  return (
    <div>Search With Keyword Page: {keyword}</div>
  );
};

export default SearchWithKeywordPage;
