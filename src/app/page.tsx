'use client'
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { common } from '@mui/material/colors';

export default function Home() {
  const [initialRender, setInitialRender] = useState(true);
  const [count, setCount] = useState(0);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: common.black,
    fontSize: '12px',
    width: '100%',
    height: '100vh',
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: common.white,
    },
  }));

  const ResetButton = styled(Button)({
    position: 'fixed',
    bottom: '16px',
    right: '16px',
  });

  const handleResetClick = () => {
    setCount(0);
    window.localStorage.setItem('count', `0`);
  };

  const handleButtonClick = () => {
    // Delay the update of the count by 1000 milliseconds (1 second)
    setTimeout(() => {

      setCount((prevCount) => prevCount + 1);
      window.localStorage.setItem('count', `${count+1}`);
    }, 300);
  };

  useEffect(() => {
    if(initialRender){
      const count = window.localStorage.getItem('count')
      if(count){
        setCount(parseInt(count) ?? 0);
      }
      setInitialRender(false);
    }
  }, [initialRender]);

  return (
    <main className="">
      <ColorButton id='button' variant="contained" onClick={handleButtonClick}>
      {count === 0 ? 'Click Here' : `${count}`}
      </ColorButton>
      <ResetButton variant="outlined" onClick={handleResetClick}>
        Reset
      </ResetButton>
    </main>
  );
}

