import React from 'react';

const Card = ({ post, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div>
        <strong className="text-blue-500 text-lg">{post.Course}</strong>
        <p className="text-gray-700">{post.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-sm btn-info"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-error"
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
