"use client";

import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  buttons = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        role="button"
        aria-label="Close Modal"
      />

      {/* Modal */}
      <div className="bg-white max-h-[90vh] w-[95%] max-w-4xl scrollbar-custom overflow-y-auto p-6 rounded-lg shadow-lg relative" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div>
          {title && (
            <h2 id="modal-title" className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
              {title}
            </h2>
          )}
          <div className="text-sm sm:text-base">{children}</div>
        </div>

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center sm:justify-center lg:justify-center mt-6">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`px-6 py-3 rounded-md text-white text-sm sm:text-base transition-colors w-full sm:w-auto ${
                  button.variant === "danger"
                    ? "bg-red-500 hover:bg-red-600"
                    : button.variant === "secondary"
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-[#00A6E6] hover:bg-[#0081B4]"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;