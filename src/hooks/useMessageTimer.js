import { useEffect, useState } from 'react';

export default function useMessageTimer(messageText, timeout = 1500) {
  const [message, setMessage] = useState(messageText);

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage('');
      }, timeout);
    }
    return () => clearTimeout(timer);
  }, [message, timeout]);

  return [message, setMessage];
}
