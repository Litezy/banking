


import React from "react";

const mapPage = number => {
  const arr = [];
  for (let i = 0; i < number; i++) {
    arr.push(i + 1);
  }

  return arr;
};

const TablePagination = ({ total, perPage, page, onChange }) => {
  const ellipsisThreshold = 3;

  const getPageNumbers = () => {
    const totalPages = Math.ceil(total / perPage);
    const pages = mapPage(totalPages);

    if (totalPages <= ellipsisThreshold * 2 + 1) {
      return pages;
    }

    const visiblePages = pages.slice(
      Math.max(0, page - ellipsisThreshold),
      Math.min(totalPages, page + ellipsisThreshold + 1)
    );

    const withEllipses = [];
    if (visiblePages[0] > 1) {
      withEllipses.push(1, '...');
    }
    withEllipses.push(...visiblePages);
    if (visiblePages[visiblePages.length - 1] < totalPages) {
      withEllipses.push('...', totalPages);
    }

    return withEllipses;
  };

  return (
    <div className='w-full border-t-0 border px-6 py-4 pb-2 flex justify-end'>
      <div className='flex space-x-4'>
        {getPageNumbers().map((num, index) => (
          <button
            key={index}
            onClick={() => (typeof num === 'number' ? onChange(num) : null)}
            className={`p-1 px-3 ${page === num ? "bg-blue-500 text-white" : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TablePagination;
