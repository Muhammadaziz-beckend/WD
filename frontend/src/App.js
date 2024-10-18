import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './static/css/style.css'
import Header from './components/header.jsx'
import NavBar from './components/navBar.jsx';
import Main from './main/main.jsx';
import Date from './data/Date.js'




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

      </Routes>
    </Router>
  );
}

export default App;
