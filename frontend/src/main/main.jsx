import FilterMain from "../components/filterMain"
import ProductMain from "../components/productMain"


const Main = () => {

    return (
        <>
            <main className="main">
                <div className="container">

                    <div className="main_items">

                        <FilterMain />
                        <ProductMain />

                    </div>

                </div>
            </main>

        </>
    )
}


export default Main