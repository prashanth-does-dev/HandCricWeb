import { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(event : any) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('create-something', { name: "Navneet" }, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}