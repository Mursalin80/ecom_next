import React from "react";

export const TextArea = ({ lable, name, rows = 3 }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {lable}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          rows={rows}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Write a few sentences about yourself.
      </p>
    </div>
  );
};
