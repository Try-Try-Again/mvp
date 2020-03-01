import React, { useState } from 'react';

const Display = () => {
  const [currentKey, setCurrentKey] = useState('B');
  document.onkeypress = (e) => {
    setCurrentKey(e.key);
  };

  return (
    <div>{ currentKey }</div>
  );
};

export default Display;
