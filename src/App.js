import { useState, useEffect } from "react";
import Pagination from './Pagination';

function App() {
  const [lists, setLists] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [pageStart, setPageStart] = useState(0);
  const [searchType, setSearchType] = useState('all')
  const [searchInput, setSearchInput] = useState('');

  const getData = async () => {
    fetch(
      "https://dummyjson.com/products?limit=100"
    ).then(res => res.json())
    .then(res => setLists(res.products));
  };

  const getSearchData = async () => {
    fetch(
      "https://dummyjson.com/products?limit=100"
    ).then(res => res.json())
    .then(res => {
      if(searchType === "all"){
        setLists(res.products.filter(e => 
          e.title.includes(searchInput)||e.brand.includes(searchInput)||e.description.includes(searchInput)))
      } else if(searchType === "title"){
        setLists(res.products.filter(e => e.title.includes(searchInput)))
      } else if(searchType === "brand"){
        setLists(res.products.filter(e => e.brand.includes(searchInput)))
      }else if(searchType === "desc"){
        setLists(res.products.filter(e => e.description.includes(searchInput)))
      } 
    });
  };

  useEffect(() => {
    getSearchData();
  }, []);

  return (
    <div className="App">
      <div>
        <p>상품 검색</p>
        <div>
          <p>검색</p>
          <select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value)
              }}
            >
              <option value="all">전체</option>
              <option value="title">상품명</option>
              <option value="brand">브랜드</option>
              <option value="desc">상품내용</option>
            </select>
            <input type="text" value ={searchInput} 
            onChange={(e)=>{ setSearchInput(e.target.value);}}/>
            <button onClick={getSearchData}>조회</button>
        </div>
      </div>
      <p>검색된 데이터:{lists.length}건</p>
      <div>
      <table className="table">
            <thead>
              <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>브랜드</th>
                <th>상품내용</th>
                <th>가격</th>
                <th>평점</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              {lists &&
                lists.slice(offset, offset + limit)
                .map(({ id, title, brand, description, rating, price, stock }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{brand}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                    <td>{rating}</td>
                    <td>{stock}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        <div>
          <label className="pageselect">
            페이지 당 행:&nbsp;
            <select
              type="number"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
                setPageStart(0);
              }}
            >
              <option value="10" selected>10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
          <Pagination
          total={lists.length}
          limit={limit}
          page={page}
          setPage={setPage}
          pageStart={pageStart}
          setPageStart={setPageStart}
          />
        </div>
      </div>
    </div>

  );
}

export default App;
