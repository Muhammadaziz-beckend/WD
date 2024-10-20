import { useEffect, useState } from "react";
import Get from "../request/get";  // Предполагаем, что Get — это функция для API запросов

const Date = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Функция для создания URL с фильтрами
  const buildUrlWithParams = (baseUrl, filters) => {
    const url = new URL(baseUrl);

    // Добавляем массивы, такие как 'near' и 'house_rules'
    for (let key in filters) {
      if (Array.isArray(filters[key])) {
        filters[key].forEach(value => {
          url.searchParams.append(key, value);
        });
      }
    }

    return url.toString();
  };

  const productsSet = async (apiUrl) => {

    const result = await Get(apiUrl);
    setProducts(result);
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = buildUrlWithParams(`http://127.0.0.1:8000/api/v1/products/?page=${page}`, filter);
      
      const result = await Get(apiUrl); // Предполагаем, что Get возвращает данные с API
      setProducts(result); // Обновляем продукты новыми данными
    };

    fetchData(); 

  }, [filter, page]);  // Следим за изменениями фильтра и страницы

  

  return {
    products,
    setProducts,
    filter,
    setFilter,
    page,
    setPage,
    userMenuOpen, setUserMenuOpen
  };
};

export default Date;
