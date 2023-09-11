import { range } from "lodash";

const Rating = ({ details, rating, numOfReviews }) => {
  return (
    <>
      {/*        <!-- Component: Rating Card Basic --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <div className="flex flex-col items-center gap-2">
            {/*              <!-- Title --> */}
            {details && (
              <h4 className="font-bold text-slate-700">Customer reviews</h4>
            )}
            {/*              <!-- Rating --> */}
            <span className="flex items-center gap-1 rounded text-sm text-slate-500">
              {[1, 2, 3, 4, 5].map((value) => (
                <svg
                  key={value}
                  className={`w-6 h-6 fill-current ${
                    rating >= value ? "text-amber-400" : "text-gray-400"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}

              <span
                className={`
                  ${
                    rating < 3.8
                      ? "text-red-600 border-red-800  "
                      : "text-green-600 border-green-800 "
                  }
                  underline font-semibold`}
              >
                {rating}
              </span>
            </span>
            {/*              <!-- Helper text --> */}
            {details && (
              <span className="text-xs leading-6 text-slate-400">
                based on {numOfReviews} user ratings
              </span>
            )}
          </div>
        </div>
      </div>
      {/*        <!-- End Rating Card Basic --> */}
    </>
  );
};

export default Rating;
