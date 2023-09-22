const loading = () => {
  return (
    <div className=" w-3/4 flex items-center h-screen mx-auto m-15 p-10 ">
      <div
        className={`h-5 w-5 bg-current rounded-full mr-3 animate-bounce text-7xl`}
      ></div>
      <div
        className={`h-5 w-5 bg-gray-500 rounded-full mr-3 animate-ping`}
      ></div>
      <div className="h-5 w-5 bg-current rounded-full animate-bounce"></div>
    </div>
  );
};

export default loading;
