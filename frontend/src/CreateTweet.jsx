import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addTweet} from './store/tweet';

const CreateTweet = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTweet = {
      id: nanoid(),
      message,
    };
    dispatch(addTweet(newTweet));
    reset();
  };

  const reset = () => {
    setMessage('');
  };

  return (
    <div className='inputBox'>
      <h1>Create Tweet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder='Message'
          name='message'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default CreateTweet;