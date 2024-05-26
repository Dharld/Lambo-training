/* eslint-disable react/prop-types */
const Overlay = ({ isVisible, onClose, children }) => {
  const handleClickOverlay = () => {
    onClose();
  };

  const handleClickContent = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        !isVisible ? "hidden" : ""
      } backdrop-blur`}
      onClick={handleClickOverlay}
    >
      <div onClick={handleClickContent} className="relative">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
