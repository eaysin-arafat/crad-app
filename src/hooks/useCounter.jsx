import { useState, useEffect } from "react";

export const Inc = (number) => {
  const [countIncrease, setCountIncrease] = useState(0);

  useEffect(() => {
    const handleIncrease = (num) => {
      setCountIncrease(countIncrease + num);
    };

    handleIncrease(number);
  }, [setCountIncrease]);

  return countIncrease;
};

export const Dec = (number) => {
  const [countDecrease, setCountDecrease] = useState(0);

  useEffect(() => {
    const handleDecrease = (num) => {
      setCountDecrease(countDecrease - num);
    };

    handleDecrease(number);
  }, [setCountDecrease]);

  return countDecrease;
};
