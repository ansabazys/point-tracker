import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, handleButton }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent body scroll when modal is open
    } else {
      document.body.style.overflow = "auto"; // Allow body scroll when modal is closed
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-md w-96   transform transition-all ease-in-out duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Modal Body */}
        <div className="p-4 basis-full ">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end w-full   border-t">
          <button
            onClick={onClose}
            className="px-6 py-4 bg-white w-full border-r rounded-bl-md  " >
            Cancel
          </button>
          <button
            onClick={handleButton}
            className="px-6 py-2 w-full bg-white  overflow-hidden rounded-br-md "
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
