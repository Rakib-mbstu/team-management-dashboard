import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function DeleteButton({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
    onClick();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-400 rounded-md hover:bg-red-100 hover:text-red-800 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:bg-red-200 focus:text-red-900 active:bg-red-300 transition-all duration-200 ease-in-out"
        title="Remove from this team only"
      >
        <MdDelete size={16} />
        <span>Delete</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteButton;
