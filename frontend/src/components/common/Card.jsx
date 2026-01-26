const Card = ({ children, className = '', hover = false, onClick }) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:border-gray-200 cursor-pointer' : '';
  
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
};

const CardBody = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

const CardFooter = ({ children, className = '' }) => {
  return <div className={`p-6 border-t border-gray-200 ${className}`}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
