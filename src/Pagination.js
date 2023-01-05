// total={lists.length}
// limit={limit}
// page={page}
// setPage={setPage}
// pageStart={pageStart}
// setPageStart={setPageStart}

const Pagination = ({total, limit, page, setPage, pageStart, setPageStart}) => {
  const numPages = Math.ceil(total / limit);
  const viewPages = (numPages > 10? 10 : numPages);
  return (
    <div className="pagination">
      <button 
        onClick={() => {
          setPage(1); 
          setPageStart(0);
          }} 
        disabled={page == 1}>
        &lt;&lt;
      </button>
      <button 
        onClick={() => {
          setPage(page - 1); 
          setPageStart(Math.floor((page - 2) / 10));
          }} 
        disabled={page == 1}>
        &lt;
      </button>
      {Array(viewPages)
        .fill()
        .map((_, i) => {
          if(pageStart * 10 + i + 1 <= numPages) {
            return(
              <button
                key={pageStart * 10 + i + 1}
                onClick={() => {
                  setPage(pageStart * 10 + i + 1);
                }}
                aria-current={page == pageStart * 10 + i + 1 ? "page" : null}
              >
                {pageStart * 10 + i + 1}
              </button>
            )
        }})}
      <button 
        onClick={() =>{
          setPage(page + 1); 
          setPageStart(Math.floor(page / 10));
      }}
        disabled={page == numPages}
      >
        &gt;
      </button>
      <button 
        onClick={() =>{
          setPage(numPages); 
          setPageStart(Math.floor(numPages / 10) - 1);
      }}
        disabled={page == numPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;
