const GridCard = ({ children, className = '' }) => (
  <div className="w-full lg:w-1/2">
    <div
      className={`my-4 md:mx-4 shadow p-6 rounded-md bg-white group hover:shadow-md ${className}`}
    >
      {children}
    </div>
  </div>
);

export default GridCard;
