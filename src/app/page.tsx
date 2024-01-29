'use client'
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { common } from '@mui/material/colors';

export default function Home() {
  const [initialRender, setInitialRender] = useState(true);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: common.black,
    fontSize: '20px',
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

  const DivTotal = styled('div')({
    position: 'fixed',
    bottom: '16px',
    left: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  });

  const handleResetClick = () => {
    setCount(0);
    window.localStorage.setItem('count', `0`);
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      const newCount = count + 1;
      setCount(newCount);
      setTotalCount((prevTotalCount) => prevTotalCount + 1);
      window.localStorage.setItem('count', `${newCount}`);
      window.localStorage.setItem('totalCount', `${totalCount + 1}`);
    }, 300);
  };

  useEffect(() => {
    if (initialRender) {
      const storedCount = window.localStorage.getItem('count');
      const storedTotalCount = window.localStorage.getItem('totalCount');
      if (storedCount) {
        setCount(parseInt(storedCount, 10) || 0);
      }
      if (storedTotalCount) {
      setTotalCount(parseInt(storedTotalCount, 10) || 0);
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
      <DivTotal>
        <div style={{font: '18px'}}>Total Count: {totalCount}</div>
      </DivTotal>
    </main>
  );
}

