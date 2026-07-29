import React from 'react';
import { DashboardCardProps } from '../../Interfaces/Props/DashboardCardProps ';

const DashboardCard = ({ label, value,color, sub }: DashboardCardProps) => {
  return (
     <div key={label} className="bg-white rounded-lg p-4 shadow-sm border border-black/5">
            <div className="text-xs text-gray-500 font-medium mb-1">{label}</div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-400 mt-1">{sub}</div>
          </div>
  );
};

export default DashboardCard;
