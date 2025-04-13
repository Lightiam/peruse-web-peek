
import React from 'react';
import { DeveloperUser } from '@/services/db';

interface DeveloperProfileViewProps {
  user: DeveloperUser;
}

const DeveloperProfileView = ({ user }: DeveloperProfileViewProps) => {
  return (
    <div className="mb-6 bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Developer Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Skills</p>
          <p className="text-gray-700">{user.skills || "No skills listed"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Hourly Rate</p>
          <p className="text-gray-700">${user.hourlyRate || "0"}/hour</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Available for Chat</p>
          <p className="text-gray-700">{user.availableForChat ? "Yes" : "No"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Completed Projects</p>
          <p className="text-gray-700">{user.completedProjects || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfileView;
