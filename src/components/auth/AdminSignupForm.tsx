
import React from 'react';

const AdminSignupForm: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
      <p className="text-yellow-800 text-sm">
        Admin accounts have access to system-wide features including transaction monitoring and user management. 
        Admin registration requires approval.
      </p>
    </div>
  );
};

export default AdminSignupForm;
