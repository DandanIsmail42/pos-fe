import React, { useState } from "react";

interface ModalProps {
  header: string;
  width: string;
  height: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  header,
  width,
  height,
  onClose,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      // Close the modal only if the background overlay is clicked
      handleClose();
    }
  };

  return isOpen ? (
    <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={handleBackgroundClick}
      />
      <div
        className={`bg-white rounded-lg p-6 mx-auto ${width} ${height} overflow-y-auto relative`}
      >
        <div className="absolute top-0 right-0 p-2">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between">
          <h2 className="font-semibold font-serif text-xl">{header}</h2>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
