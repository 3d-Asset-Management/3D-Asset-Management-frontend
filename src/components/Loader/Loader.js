import './Loader.css';
import { useState, useEffect } from 'react';

export default function Loader() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const delayDurations = {
      25: 2000,
      50: 2000,
      75: 100000,
      85: 100000,
      99: 1000,
    };

    const incrementPercentage = (current) => {
      if (current < 99) {
        const next = current + 1;

        if (delayDurations[next]) {
          setTimeout(() => {
            setPercentage(next);
            incrementPercentage(next);
          }, delayDurations[next]);
        } else {
          setPercentage(next);
          setTimeout(() => incrementPercentage(next), 100);
        }
      }
    };

    incrementPercentage(0);
  }, []);

  return (
    <div className="loader-container">
      <span className="loader"></span>
      <div className="loader-percentage">{percentage}%</div>
    </div>
  );
}
