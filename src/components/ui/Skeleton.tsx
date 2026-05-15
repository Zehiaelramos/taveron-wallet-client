import React from 'react';

interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className = "" }) => {
  return (
    <div 
      className={`bg-white/5 animate-pulse rounded-xl ${className}`}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="h-52 w-full glass-dark p-8 rounded-3xl border border-white/5 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-start">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-16 h-6 rounded-lg" />
      </div>

      <div className="space-y-4">
        <Skeleton className="w-full h-8 rounded-lg" />
        <div className="flex justify-between items-end">
          <Skeleton className="w-24 h-5 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
