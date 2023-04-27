import React from 'react';
import Backdrop from './Backdrop';

export default function ConfirmModal({ confirmText, onConfirm, onCancel }) {
  return (
    <Backdrop onClick={onCancel}>
      <div
        className="flex flex-col w-80 md:w-96 h-44 p-4 bg-white rounded shadow-md absolute inset-0 m-auto"
        role="presentation"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className="flex h-32 text-red-600 font-bold text-lg justify-center items-center">
          <p>{confirmText}</p>
        </div>
        <div className="flex flex-auto justify-end">
          <button
            type="button"
            className="border border-darkslategray text-darkslategray rounded w-16 py-1 font-bold"
            onClick={onCancel}
          >
            取消
          </button>
          <button
            type="button"
            className="bg-darkslategray text-white rounded w-16 py-1 ml-4 font-bold"
            onClick={onConfirm}
          >
            確定
          </button>
        </div>
      </div>
    </Backdrop>
  );
}
