import React from 'react';

export function SkeletonBlock({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-md bg-gray-700/60 animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

function SkeletonSection({ children, className = '' }) {
  return (
    <section className={`w-full px-4 py-8 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-3xl">
        <SkeletonBlock className="mb-5 h-4 w-32 bg-green-500/20" />
        {children}
      </div>
    </section>
  );
}

function SkeletonCard({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 ${className}`}>
      {children}
    </div>
  );
}

function LoadingStatus({ label, children, className = '' }) {
  return (
    <div role="status" aria-label={label} aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

function PlaceholderLines({ count = 3, widths = ['w-full', 'w-5/6', 'w-2/3'] }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonBlock key={index} className={`h-3 ${widths[index % widths.length]}`} />
      ))}
    </div>
  );
}

function HomeSkeletonContent() {
  return (
    <>
      <section className="w-full px-4 pb-8 pt-8 sm:px-6 sm:py-12">
        <div className="mx-auto flex max-w-3xl flex-col-reverse items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex w-full flex-1 flex-col items-center sm:items-start">
            <SkeletonBlock className="mb-4 h-6 w-44 rounded-full" />
            <SkeletonBlock className="mb-3 h-9 w-64 max-w-full" />
            <SkeletonBlock className="mb-4 h-6 w-48" />
            <div className="mb-5 w-full max-w-md">
              <PlaceholderLines count={3} />
            </div>
            <div className="mb-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              <SkeletonBlock className="h-7 w-20 rounded-md" />
              <SkeletonBlock className="h-7 w-24 rounded-md" />
              <SkeletonBlock className="h-7 w-16 rounded-md" />
            </div>
            <div className="flex gap-3">
              <SkeletonBlock className="h-9 w-28 rounded-lg" />
              <SkeletonBlock className="h-9 w-24 rounded-lg" />
            </div>
          </div>
          <SkeletonBlock className="h-36 w-36 shrink-0 rounded-full sm:h-40 sm:w-40" />
        </div>
      </section>

      <SkeletonSection>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonCard key={index}>
              <SkeletonBlock className="mb-3 h-3 w-20" />
              <SkeletonBlock className="h-5 w-24 max-w-full" />
            </SkeletonCard>
          ))}
        </div>
        <SkeletonCard>
          <PlaceholderLines count={4} />
        </SkeletonCard>
      </SkeletonSection>

      <SkeletonSection>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }, (_, index) => (
            <SkeletonCard key={index}>
              <SkeletonBlock className="mb-3 h-4 w-48 max-w-full" />
              <SkeletonBlock className="mb-2 h-3 w-32" />
              <PlaceholderLines count={2} />
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>

      <SkeletonSection>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }, (_, index) => (
            <SkeletonCard key={index}>
              <SkeletonBlock className="mb-3 h-4 w-52 max-w-full" />
              <SkeletonBlock className="h-3 w-36" />
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>

      <SkeletonSection>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonCard key={index} className="overflow-hidden p-0">
              <SkeletonBlock className="h-36 rounded-none" />
              <div className="p-4">
                <SkeletonBlock className="mb-3 h-3 w-20" />
                <SkeletonBlock className="mb-2 h-4 w-40 max-w-full" />
                <PlaceholderLines count={2} />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>

      <SkeletonSection>
        <SkeletonCard>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }, (_, index) => (
              <SkeletonBlock key={index} className="h-7 w-20 rounded-md" />
            ))}
          </div>
        </SkeletonCard>
      </SkeletonSection>

      <SkeletonSection>
        <IntegrationSkeletonContent platform="codeforces" />
      </SkeletonSection>
      <SkeletonSection>
        <IntegrationSkeletonContent platform="leetcode" />
      </SkeletonSection>

      <SkeletonSection>
        <SkeletonCard>
          <div className="grid gap-3 sm:grid-cols-2">
            <SkeletonBlock className="h-10 rounded-lg" />
            <SkeletonBlock className="h-10 rounded-lg" />
            <SkeletonBlock className="h-24 rounded-lg sm:col-span-2" />
          </div>
          <SkeletonBlock className="mt-4 h-9 w-28 rounded-lg" />
        </SkeletonCard>
      </SkeletonSection>
    </>
  );
}

export function HomeSkeleton() {
  return (
    <LoadingStatus label="Loading portfolio content">
      <HomeSkeletonContent />
    </LoadingStatus>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <LoadingStatus
      label="Loading project details"
      className="w-full px-4 py-10 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <SkeletonBlock className="mb-5 h-4 w-32" />
        <SkeletonBlock className="mb-5 h-52 rounded-xl sm:h-72" />
        <SkeletonCard className="mb-3">
          <div className="mb-3 flex gap-2">
            <SkeletonBlock className="h-5 w-16 rounded-full" />
            <SkeletonBlock className="h-5 w-20 rounded-full" />
          </div>
          <SkeletonBlock className="mb-4 h-6 w-2/3 max-w-full" />
          <SkeletonBlock className="mb-4 h-4 w-1/2 max-w-full" />
          <div className="flex gap-2">
            <SkeletonBlock className="h-8 w-20 rounded-lg" />
            <SkeletonBlock className="h-8 w-24 rounded-lg" />
          </div>
        </SkeletonCard>
        <SkeletonCard className="mb-3">
          <SkeletonBlock className="mb-4 h-4 w-24" />
          <PlaceholderLines count={5} />
        </SkeletonCard>
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <SkeletonCard>
            <SkeletonBlock className="mb-4 h-4 w-28" />
            <PlaceholderLines count={4} />
          </SkeletonCard>
          <SkeletonCard>
            <SkeletonBlock className="mb-4 h-4 w-24" />
            <div className="flex flex-wrap gap-2">
              <SkeletonBlock className="h-7 w-20" />
              <SkeletonBlock className="h-7 w-24" />
              <SkeletonBlock className="h-7 w-16" />
            </div>
          </SkeletonCard>
        </div>
        <SkeletonCard>
          <SkeletonBlock className="mb-5 h-4 w-24" />
          <PlaceholderLines count={3} />
          <SkeletonBlock className="mb-3 mt-6 h-4 w-24" />
          <PlaceholderLines count={3} />
        </SkeletonCard>
      </div>
    </LoadingStatus>
  );
}

function IntegrationSkeletonContent({ platform }) {
  const isCodeforces = platform === 'codeforces';

  return (
    <div className="flex flex-col gap-3">
      <SkeletonCard className="flex items-center gap-4">
        <SkeletonBlock className="h-16 w-16 shrink-0 rounded-full" />
        <div className="flex-1">
          <SkeletonBlock className="mb-2 h-4 w-36 max-w-full" />
          <SkeletonBlock className="h-3 w-28" />
        </div>
      </SkeletonCard>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonCard key={index} className="px-3 py-4">
            <SkeletonBlock className="mb-3 h-3 w-16 max-w-full" />
            <SkeletonBlock className="h-6 w-12" />
          </SkeletonCard>
        ))}
      </div>
      {isCodeforces ? (
        <SkeletonCard>
          <SkeletonBlock className="mb-4 h-4 w-28" />
          <SkeletonBlock className="h-52 rounded-lg" />
        </SkeletonCard>
      ) : (
        <SkeletonCard>
          <SkeletonBlock className="mb-4 h-4 w-32" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex items-center gap-3">
                <SkeletonBlock className="h-3 w-20 shrink-0" />
                <SkeletonBlock className="h-2 flex-1 rounded-full" />
              </div>
            ))}
          </div>
        </SkeletonCard>
      )}
    </div>
  );
}

export function IntegrationSkeleton({ platform }) {
  const label = platform === 'codeforces' ? 'Codeforces' : 'LeetCode';

  return (
    <LoadingStatus label={`Loading ${label} statistics`}>
      <IntegrationSkeletonContent platform={platform} />
    </LoadingStatus>
  );
}
