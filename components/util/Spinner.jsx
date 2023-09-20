const Spinner = () => {
  return (
    <div className="flex items-center justify-center relative w-full">
      <div className="absolute -top-20 -left-4 w-36 h-36 bg-blue-200 filter blur-xl mix-blend-multiply opacity-50"></div>
      <div className="absolute -top-20 -right-4 w-36 h-36 bg-yellow-200 filter blur-xl mix-blend-multiply opacity-50"></div>
      <div
        className="inline-block m-1 p-1 h-8 w-8 text-6xl animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_3s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
          Loading...
        </span>
      </div>
      <div
        className="inline-block h-6 w-6 m-1 p-1 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_2s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
          Loading...
        </span>
      </div>
      <div
        className="inline-block h-4 w-4 m-1 p-1 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
