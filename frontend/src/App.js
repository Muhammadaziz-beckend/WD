import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './static/css/style.css'
import Header from './components/header.jsx'
import NavBar from './components/navBar.jsx';
import Main from './main/main.jsx';
import Date from './data/Date.js'
import ProductDetail from './components/productDetail.jsx';
import MainAuth from './components/auth/workspace/main.jsx'



const App = () => {
  const {
    products,
    setProducts,
    filter,
    setFilter,
    page,
    setPage,
    userMenuOpen, setUserMenuOpen
  } = Date()

  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <>
            <Header
              filter={filter}
              setFilter={setFilter}
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
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
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
            />
            <ProductDetail userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen} />
          </>
        } />

        <Route path='/auth/*' element={<MainAuth />} />

      </Routes>
    </Router>
  );
}

export default App;
