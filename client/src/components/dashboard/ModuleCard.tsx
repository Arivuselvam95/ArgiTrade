import React from "react";
import { Link } from "wouter";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  bgColorFrom: string;
  bgColorTo: string;
  linkPath: string;
  linkColor: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  bgColorFrom,
  bgColorTo,
  linkPath,
  linkColor
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`h-40 bg-gradient-to-r ${bgColorFrom} ${bgColorTo} flex items-center justify-center`}>
        <i className={`${icon} text-5xl text-white`}></i>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        <Link href={linkPath}>
          <a className={`inline-flex items-center ${linkColor} font-medium`}>
            Access Module
            <i className="ri-arrow-right-line ml-1"></i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;
