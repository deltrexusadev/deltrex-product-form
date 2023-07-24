import { useEffect, useState } from "react";
import ProductListing from "./ProductListing";

export default function AllProducts({ productsList, setModalMessage }) {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:${3001}/pageCount`)
        .then(response => response.json())
        .then(data => {
            setPage(data)
        })
        .catch(error => {

        })
    })

    return (
        <div className="all-products">
            <h1>Search for Products</h1>
            <input placeholder="Search for a product (keyword, name, etc...)" type="search" onChange={(e) => {
                setSearch(e.target.value)
            }} />
            <div className="page" style={{ textAlign: "right", margin: "15px" }}>Page: {page}<input id="page-input" placeholder="Page" type="number" /><a href="" onClick={() => {
                const page = document.getElementById('page-input').value
                fetch(`http://localhost:${3001}/products/page/${page}`)
                .then(response => {
                    window.open('/', '_self')
                })
                .catch(error => {

                })
            }}>Go to page</a></div>
            <ul>
                {productsList ? productsList.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((filteredProd, i) => <ProductListing productInfo={filteredProd} setModalMessage={setModalMessage} />) : (<div><h1>No products found.</h1></div>)}
            </ul>
        </div>
    )
}