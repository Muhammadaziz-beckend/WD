import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './static/css/style.css'
import Header from './components/header.jsx'
import NavBar from './components/navBar.jsx';
import Main from './main/main.jsx';
import Date from './data/Date.js'
import ProductDetail from './components/productDetail.jsx';




const App = () => {
  const {
    products,
    setProducts,
    filter,
    setFilter,
    page,
    setPage,
  } = Date()

  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <>
            <Header
              filter={filter}
              setFilter={setFilter}
            />
            <NavBar />
            <Main
              products={products}
              setProducts={setProducts}
              filter={filter}
              setFilter={setFilter}
              page={page}
              setPage={setPage}
            />
          </>
        } />

        <Route path='/product/:id' element={
          <>
            <Header
              filter={filter}
              setFilter={setFilter}
            />
            <ProductDetail />
          </>
        } />

      </Routes>
    </Router>
  );
}

export default App;
