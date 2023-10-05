const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full m-10 p-10">
      <div
        className="relative inline-block m-1 p-1 h-8 w-8 text-6xl animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_3s_linear_infinite]"
        role="status"
      >
        <div className="absolute -top-20 -left-4 w-24 h-24 bg-blue-200 filter blur-xl mix-blend-multiply opacity-60"></div>
        <div className="absolute -top-20 -right-4 w-24 h-24 bg-yellow-200 filter blur-xl mix-blend-multiply opacity-60"></div>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
