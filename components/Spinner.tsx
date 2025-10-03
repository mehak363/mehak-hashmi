
import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-500 dark:border-slate-400"></div>
  </div>
);

export default Spinner;
