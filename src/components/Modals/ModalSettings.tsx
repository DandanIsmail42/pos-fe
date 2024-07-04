import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Profile from "../Settings/Profile";
import Address from "../Settings/Address/Address";

interface ModalInterface {
  onClose: () => void;
}

const ModalSettings: React.FC<ModalInterface> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const {
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    setActiveTab(0); // Reset active tab when modal is closed
    onClose();
  };

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={handleBackgroundClick}
      />
      <div
        className={`bg-white rounded-lg p-6 mx-auto w-1/2 h-auto overflow-y-auto relative`}
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
        <div className="flex">
          <h2 className="font-semibold text-xl">Settings</h2>
        </div>
        <div className="mt-4">
          <ul className="flex">
            <li
              className={`mr-6 cursor-pointer ${
                activeTab === 0
                  ? "border-b border-orange-500 w-14"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(0)}
            >
              Profile
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === 1
                  ? "border-b border-orange-500 w-14"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(1)}
            >
              Alamat
            </li>
          </ul>
          <div className="mt-4">
            {activeTab === 0 && <Profile />}
            {activeTab === 1 && (
              <div>
                {/* Konten untuk Tab 2 */}
                <Address />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSettings;
