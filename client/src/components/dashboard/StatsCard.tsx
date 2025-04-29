import React from "react";

interface StatsCardProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  value,
  trend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${iconBgColor} ${iconColor}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-xl font-semibold text-slate-800">{value}</h3>
          {trend && (
            <p className={`text-sm ${trend.isPositive ? "text-green-600" : "text-red-600"} flex items-center mt-1`}>
              <i className={`${trend.isPositive ? "ri-arrow-up-line" : "ri-arrow-down-line"} mr-1`}></i>
              {trend.value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
