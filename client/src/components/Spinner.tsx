const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-20 h-20 border-8 border-t-cyan-500 border-gray-300 rounded-full animate-spin dark:border-gray-600 dark:border-t-cyan-400"></div>
    </div>
  );
};

export default Spinner;
