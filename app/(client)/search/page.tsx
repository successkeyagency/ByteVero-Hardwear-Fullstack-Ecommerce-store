const SearchPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white px-6">
      <h1 className="text-5xl font-extrabold mb-6 animate-pulse drop-shadow-lg">
        🚧 Feature Not Available
      </h1>
      <p className="text-lg max-w-md text-center opacity-80 mb-8">
        Sorry, this feature is disabled in the demo version. Stay tuned for full access soon!
      </p>
      <div className="animate-bounce text-4xl">⚡</div>
    </div>
  );
};

export default SearchPage;
