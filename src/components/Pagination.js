import React from "react";
import "./Pagination.css"

const Pagination = ({ picsPerPage, totalPics, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPics / picsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
		<nav>
			<ul>
			  {pageNumbers.map((number) => (
				<li key={number} className="page-item">
				  <a onClick={() => paginate(number)} className="page-link">
					{number}
				  </a>
				</li>
			  ))}
			</ul>
		</nav>
    </div>
  );
};

export default Pagination;