import { useState,useRef } from "react"
import FilterMain from "../components/filterMain"
import ProductMain from "../components/productMain"


const Main = (
    {
        products,
        setProducts,
        filter,
        setFilter,
        page,
        setPage
    }
) => {

    const [filterMobile,setFilterMobile] = useState(true)

    const productRef = useRef()

    return (
        <>
            <main className="main">
                <div className="container">

                    <div className="main_items">

                        <FilterMain productRef={productRef} filterMobile={filterMobile} setFilterMobile={setFilterMobile} setFilter={setFilter} filter={filter} />
                        <ProductMain productRef={productRef} filterMobile={filterMobile} setFilterMobile={setFilterMobile} page={page} setPage={setPage} products={products} setFilter={setFilter} />

                    </div>

                </div>
            </main>

        </>
    )
}


export default Main