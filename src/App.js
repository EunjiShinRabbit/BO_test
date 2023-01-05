import { useState, useEffect } from "react";
import Pagination from './Pagination';
import "./App.css"
import { useDispatch, useSelector } from "react-redux";
import { setLimit, setPage, setPageStart, setSearchType, setSearchInput } from "./searchSlice";

function App() {
  
  const [lists, setLists] = useState('');
  const searchInfo = useSelector((state) => state.searchInfo);
  const offset = (searchInfo.page - 1) * searchInfo.limit;
  //dispatch에 action을 전달하면 해당 동작이 실행된다
  const dispatch = useDispatch();

  const handleLimit = (value) => dispatch(setLimit(value));
  const handlePage = (value) => dispatch(setPage(value));
  const handlePageStart = (value) => dispatch(setPageStart(value));
  const handleSearchType = (value) => dispatch(setSearchType(value));
  const handleSearchInput = (value) => dispatch(setSearchInput(value));

  const getSearchData = async () => {
    fetch(
      "https://dummyjson.com/products?limit=100"
    ).then(res => res.json())
    .then(res => {
      if(searchInfo.searchType === "all"){
        setLists(res.products.filter(e => 
          e.title.includes(searchInfo.searchInput)||e.brand.includes(searchInfo.searchInput)||e.description.includes(searchInfo.searchInput)))
      } else if(searchInfo.searchType === "title"){
        setLists(res.products.filter(e => e.title.includes(searchInfo.searchInput)))
      } else if(searchInfo.searchType === "brand"){
        setLists(res.products.filter(e => e.brand.includes(searchInfo.searchInput)))
      }else if(searchInfo.searchType === "desc"){
        setLists(res.products.filter(e => e.description.includes(searchInfo.searchInput)))
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
              value={searchInfo.searchType}
              onChange={(e) => {
                handleSearchType(e.target.value)
              }}
            >
              <option value="all">전체</option>
              <option value="title">상품명</option>
              <option value="brand">브랜드</option>
              <option value="desc">상품내용</option>
          </select>
          <input type="text" value ={searchInfo.searchInput} 
          onChange={(e)=>{ handleSearchInput(e.target.value);}}/>
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
              lists.slice(offset, offset + searchInfo.limit)
              .map(({ id, title, brand, description, rating, price, stock }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{brand}</td>
                  <td>{ description.length <= 40? description : description.substring(0, 40)+"..."}</td>
                  <td>{price}</td>
                  <td>{rating}</td>
                  <td>{stock}</td>
                </tr>
            ))}
          </tbody>
        </table>
        <div>
          <label className="pageselect">
          페이지 당 행:&nbsp;
            <select
              type="number"
              value={searchInfo.limit}
              onChange={(e) => {
                handleLimit(Number(e.target.value));
                handlePage(1);
                handlePageStart(0);
              }}
            >
              <option value="10" selected>10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
          <Pagination
          total={lists.length}
          limit={searchInfo.limit}
          page={searchInfo.page}
          setPage={handlePage}
          pageStart={searchInfo.pageStart}
          setPageStart={handlePageStart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
