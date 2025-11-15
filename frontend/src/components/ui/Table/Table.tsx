// src/components/ui/Table/Table.tsx

import React from 'react';

export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className="overflow-x-auto">
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHead: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <thead className={`bg-gray-50 ${className}`}>{children}</thead>
);

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
);

export const TableRow: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => (
  <tr 
    className={`${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </tr>
);

export const TableHeader: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <th
    className={`
      px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
      ${className}
    `}
  >
    {children}
  </th>
);

export const TableCell: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}>
    {children}
  </td>
);