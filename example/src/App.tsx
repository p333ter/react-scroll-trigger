import ScrollTrigger from '@ppasmik/react-scroll-trigger';
import React, { useState } from 'react';

const DemoSection = ({ color, index }: { color: string; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setIsVisible(true)}
      onExit={() => setIsVisible(false)}
    >
      <div
        style={{
          height: '100vh',
          backgroundColor: color,
          opacity: isVisible ? 1 : 0.3,
          transition: 'opacity 0.5s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
        }}
      >
        Section {index}
      </div>
    </ScrollTrigger>
  );
};

const App = () => {
  const colors = ['#2ecc71', '#3498db', '#9b59b6', '#e74c3c'];

  return (
    <div>
      {colors.map((color, index) => (
        <DemoSection key={color} color={color} index={index + 1} />
      ))}
    </div>
  );
};

export default App;
