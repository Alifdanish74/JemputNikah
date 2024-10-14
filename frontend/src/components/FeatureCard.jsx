/* eslint-disable react/prop-types */
function FeatureCard({ icon, title, description, direction }) {
  return (
    <>
      {direction === "left" ? (
        // Left feature layout
        <div className="grid grid-cols-[4fr_1fr] gap-10 items-center p-4 pl-8 bg-white rounded-lg shadow-md">
          <div className="text-left pl-3">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-3xl">
            {icon}
          </div>
        </div>
      ) : (
        // Right feature layout
        <div className="grid grid-cols-[1fr_2fr] items-center p-4 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-3xl">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default FeatureCard;
