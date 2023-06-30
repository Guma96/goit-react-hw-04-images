import { useState } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import './App.css';
import { getGallery } from '../fetchImages/fetchImages';
import Searchbar from './Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  const handleSubmit = async inputData => {
    setPage(1);
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        setStatus('pending');
        const { totalHits, hits } = await getGallery(inputData, page);
        if (hits.length < 1) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setItems(hits);
          setInputData(inputData);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };

  const onNextPage = async () => {
    setStatus('pending');

    try {
      const { hits } = await getGallery(inputData, page + 1);
      setItems(prevState => [...prevState, ...hits]);
      setPage(prevPage => prevPage + 1);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {status === 'idle' && <p>Enter a search term to find images.</p>}
      {status === 'pending' && (
        <>
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={onNextPage} />}
        </>
      )}
      {status === 'rejected' && (
        <p>Something went wrong. Please try again later.</p>
      )}
      {status === 'resolved' && (
        <>
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={onNextPage} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
