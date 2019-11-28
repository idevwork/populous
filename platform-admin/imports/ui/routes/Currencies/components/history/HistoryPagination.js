import React from 'react';
import { Col } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const HistoryPagination = (props) => {
  const { total, totalPages, page, from, to, hasNextPage, getFirst, getLast, loaded, getPrev, getNext } = props;
  const prevDisabled = page===1;
  const nextDisabled = page===totalPages;

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 m-t-20 custom-pagination">
      <div className='row col-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='col-6 col-sm-6 col-md-4 col-lg-4 total-txt'>
          <p>Showing { from } to {to} of { total } entries</p>
        </div>
        <div className='col-6 col-sm-6 offset-md-4 offset-lg-4 col-md-4 col-lg-4 text-right p-0'>
          <span className='label-color-1'>Load</span>
          <span className='loaded'>{ loaded }</span>
          <span className='label-color-2'>entries</span>
        </div>
      </div>
      <div className='row col-12 col-sm-6 offset-sm-3 offset-md-4 offset-lg-4 col-md-4 col-lg-4 p-r-0 pagination-block'>
        <Pagination>
          <PaginationItem disabled={ prevDisabled }>
            <PaginationLink onClick={ getFirst }>First</PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={ prevDisabled }>
            <PaginationLink onClick={ () => { page > 1 && getPrev() }}><span className='fa fa-long-arrow-left'/></PaginationLink>
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink>
              { page }
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={ nextDisabled }>
            <PaginationLink onClick={ () => hasNextPage && getNext() }><span className='fa fa-long-arrow-right'/></PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={ nextDisabled }>
            <PaginationLink onClick={ getLast }>Last</PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};

export default HistoryPagination;
