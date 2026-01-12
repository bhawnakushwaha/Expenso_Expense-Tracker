import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* Modal wrapper */}
      <div className="relative w-full max-w-md p-4">

        {/* Modal box */}
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg p-2 transition"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 1l6 6m0 0 6 6M7 7L1 13m6-6l6-6"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-5 max-h-[65vh] overflow-y-auto overflow-x-hidden">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;



