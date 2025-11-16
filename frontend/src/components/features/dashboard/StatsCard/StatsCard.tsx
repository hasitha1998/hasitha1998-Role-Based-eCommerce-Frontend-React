// src/components/features/dashboard/StatsCard/StatsCard.tsx

import React from 'react';
import { Card, CardBody } from '@/components/ui';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  return (
    <Card hover>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            )}
          </div>

          <div className={`w-16 h-16 rounded-full ${colorClasses[color]} flex items-center justify-center text-white`}>
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};