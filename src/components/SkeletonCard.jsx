import React from 'react';

export function SkeletonCard({ height = 120, className = '' }) {
  return (
    <div
      className={`skeleton rounded-2xl ${className}`}
      style={{ height, borderRadius: 16 }}
    />
  );
}

export function SkeletonText({ width = '100%', height = 16 }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: 8, marginBottom: 8 }}
    />
  );
}

export function SkeletonAvatar({ size = 40 }) {
  return (
    <div
      className="skeleton"
      style={{ width: size, height: size, borderRadius: '50%' }}
    />
  );
}

export default SkeletonCard;
