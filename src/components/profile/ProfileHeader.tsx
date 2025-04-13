
import React from 'react';
import { User } from '@/services/db';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <Avatar className="h-24 w-24 mr-6">
        <AvatarImage src={user.avatar} />
        <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <div className="mt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
