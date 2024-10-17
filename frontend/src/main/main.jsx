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
    }) => {

    return (
        <>
            <main className="main">
                <div className="container">

                    <div className="main_items">

                        <FilterMain setFilter={setFilter} />
                        <ProductMain page={page} setPage={setPage} products={products} />

                    </div>

                </div>
            </main>

        </>
    )
}


export default Main