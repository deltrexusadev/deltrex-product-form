export default function Navbar({ setPage }) {
    return (
        <nav>
            <h1>DeltrexUSA | Admin</h1>
            <br />
            <h2><a href="https://wordpress-932013-3235695.cloudwaysapps.com/" target="_blank">Visit Website</a></h2>
            <a href="#" onClick={() => setPage("home")}>All Products</a>
            <a href="#" onClick={() => setPage("create")}>Create a product</a>
            <a href="#" onClick={() => setPage("instructions")}>Instructions</a>
        </nav>
    )
}