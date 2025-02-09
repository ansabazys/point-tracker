import React from 'react';

const SkeletonLoader = ({ size = 'medium' }) => {
  let width, height;

  // Define size mappings
  switch (size) {
    case 'small':
      width = 'w-20'; // 5rem
      height = 'h-4'; // 1rem
      break;
    case 'medium':
      width = 'w-40'; // 10rem
      height = 'h-8'; // 2rem
      break;
    case 'large':
      width = 'w-full'; // 16rem
      height = 'h-12'; // 3rem
      break;
    default:
      width = 'w-40';
      height = 'h-8';
  }

  return (
    <p className={`${width} ${height} bg-gray-300 animate-pulse rounded-md`}></p>
  );
};

export default SkeletonLoader;
