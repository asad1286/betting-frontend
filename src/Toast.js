import React from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function Toast() {
  return (
    <div>
      {/* Your other components */}
      <ToastContainer /> {/* This will display the toast notifications */}
    </div>
  );
}

export default Toast;
