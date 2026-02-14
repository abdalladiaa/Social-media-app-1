import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Presentational loading skeleton for a Post Card
 * - لا يحتوي على أي لوجيك، مجرد عرض بصري
 */
export default function LoadingCard() {
  return (
    <article className="bg-white rounded-3xl shadow-xl p-5 max-w-3xl mx-auto my-5">
      {/* Header */}
      <header className="flex items-start gap-3">
        <Skeleton circle={true} height={48} width={48} />

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Skeleton width={140} height={14} />
              <div className="mt-1">
                <Skeleton width={100} height={12} />
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <Skeleton width={70} height={28} />
            </div>
          </div>
        </div>
      </header>

      {/* Content lines */}
      <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap font-medium text-[15px]">
        <Skeleton count={3} />
      </div>

      {/* Image placeholder */}
      <div className="mt-4 rounded-xl overflow-hidden bg-gray-50">
        <Skeleton height={220} />
      </div>

      {/* stats */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <Skeleton width={80} height={12} />
        <Skeleton width={60} height={12} />
      </div>

      {/* actions placeholders */}
      <div className="mt-3 border-t pt-3 flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg">
          <Skeleton width={90} height={36} />
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg">
          <Skeleton width={90} height={36} />
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg">
          <Skeleton width={90} height={36} />
        </div>
      </div>
    </article>
  );
}
