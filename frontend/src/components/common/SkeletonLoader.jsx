import React from 'react';

// Base Skeleton Component
export const Skeleton = ({ className = '', animate = true }) => {
  return (
    <div 
      className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
    />
  );
};

// Visa Package Card Skeleton
export const VisaPackageSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse">
        <div className="absolute top-4 left-4">
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex justify-between items-end pt-4">
          <div className="space-y-1">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Tour Package Card Skeleton (Grid View)
export const TourPackageSkeleton = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row">
        {/* Image Skeleton */}
        <div className="md:w-80 h-64 md:h-auto bg-gray-200 animate-pulse" />
        
        {/* Content Skeleton */}
        <div className="p-6 flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex justify-between items-end mt-auto">
            <div className="space-y-1">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200 animate-pulse">
        <div className="absolute top-4 left-4">
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Skeleton className="w-32 h-8 rounded-lg" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>

        {/* Title & Location */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Includes */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Price & Button */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

// Loading Banner (for slow loads)
export const LoadingBanner = ({ message = "Fetching latest data..." }) => {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// Skeleton Grid (renders multiple skeletons)
export const VisaPackageSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <VisaPackageSkeleton key={idx} />
      ))}
    </div>
  );
};

export const TourPackageSkeletonGrid = ({ count = 6, viewMode = 'grid' }) => {
  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <TourPackageSkeleton key={idx} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default Skeleton;
