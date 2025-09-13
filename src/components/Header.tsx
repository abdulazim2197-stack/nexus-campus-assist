import { useState, useEffect } from 'react';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-campus-card backdrop-blur-sm rounded-xl p-6 shadow-campus-card relative mb-8">
      <div className="absolute top-6 right-6 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
        {currentDate}
      </div>
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
          Intelligent Campus Information System
        </h1>
        <p className="text-xl text-campus-text-muted max-w-2xl mx-auto">
          Your AI-powered assistant for campus-related queries and services
        </p>
      </div>
    </header>
  );
};

export default Header;