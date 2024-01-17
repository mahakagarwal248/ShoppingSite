import Pagination from 'react-bootstrap/Pagination';
import { useState } from 'react';
import { PRODUCT_LIMIT } from '../../Constants';

function PaginationComp({ count, handlePageChange }) {
  console.log(count);
  const pageCount = Math.ceil(44 / PRODUCT_LIMIT);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const [currentPage, setCurrentPage] = useState(1);
  const handleClick = (pageNo) => {
    setCurrentPage(pageNo);
    handlePageChange(pageNo);
  };
  const handleChange = (pageNo) => {
    if (pageNo > 0 && pageNo <= pageCount) {
      handlePageChange(pageNo);
      setCurrentPage(pageNo);
    }
  };
  return (
    <Pagination>
      <Pagination.First onClick={() => handleChange(1)} />
      <Pagination.Prev onClick={() => handleChange(currentPage - 1)} />
      {pages.map((item) => {
        const showNumber =
          item <= 2 ||
          item > pageCount - 2 ||
          item === currentPage ||
          item === currentPage + 1 ||
          item === currentPage - 1;

        // if ellipsis is true, ... will be visible
        const isEllipsis =
          item > 2 && //true
          item <= pageCount - 2 && //true
          (item === currentPage - 2 || item === currentPage + 2);

        return showNumber ? (
          <Pagination.Item
            key={item}
            onClick={() => handleClick(item)}
            active={item === currentPage ? true : false}>
            {item}
          </Pagination.Item>
        ) : isEllipsis ? (
          <Pagination.Ellipsis />
        ) : (
          <></>
        );
      })}
      <Pagination.Next onClick={() => handleChange(currentPage + 1)} />
      <Pagination.Last onClick={() => handleChange(pageCount)} />
    </Pagination>
  );
}

export default PaginationComp;
