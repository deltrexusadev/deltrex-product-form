import { useEffect, useState } from "react";
import Navbar from "./ComponentsV2/Navbar";
import AllProducts from "./ComponentsV2/AllProducts";
import CreateForm from "./ComponentsV2/CreateForm";
import { Modal } from "./ComponentsV2/Modal";
import Instructions from "./ComponentsV2/Instructions";

export const allCategories =
  [
    { 'Push Plate Switch Controls': 26 },
    { 'Push Buttons and Switches': 29 },
    { 'Acoustical Products': 110 },
    { 'Hand - Foot Control Switches': 32 },
    { 'Touchless Wave Series': 411 },
    { '900 Access Control': 178 },
    { 'Visual Status Monitors': 63 },
    { 'Access Control / Power Supply': 288 },
    { Accessories: 109 },
    { Emergency: 35 },
    { 'Low Energy Door Operator': 114 },
    { 'Electric Locking': 112 },
    { 'Magnetic Door Holders': 60 },
    { 'Electro-Magnetic Locks': 113 },
    { '117 Series Touchless Actuator': 34 },
    { 'Shabbat Lock Using Gramma Systems': 289 },
    { 'Door Control Key Switches': 27 },
    { '300 Series': 254 },
    { 'Bollard Post': 111 }
  ]

function App() {
  const [message, setMessage] = useState('Checking if the server is running...')
  const [serverRunning, setServerRunning] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:${3001}`)
      .then(response => {
        setServerRunning(true)
      })
      .catch(error => {
        setServerRunning(false)
        setMessage(`<u><b>Error:</b> Could not fetch the server</u>.<br/><br/> Please ensure the server file is running locally while using this app.
        For more information on how to use the admin application, read the <a href="/instructions">instruction manual</a> or directly message the
        <a href="mailto:kleemoffdeveloper@gmail.com">developer</a>.
        `)
      })
  })

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:${3001}/products`)
      .then(response => response.json())
      .then(data => {
        setProducts([...data])
      })
      .catch(error => {
        // Error
      })
  })

  const [modalMessage, setModalMessage] = useState({ title: "", message: "", func: () => { }, img: null })
  const [page, setPage] = useState("home")

  return (
    <div>
      <Modal
        title={modalMessage.title}
        message={modalMessage.message}
        func={modalMessage.func}
        img={modalMessage.img}
      />
      <div className="App">
        <Navbar setPage={setPage}/>
        {page === "home" && serverRunning ? <AllProducts productsList={products} setModalMessage={setModalMessage} allCategories={allCategories} /> : page === "create" && serverRunning ? <div className="create">
              <h1 style={{ marginLeft: 0, marginBottom: "25px" }}>Create a product</h1>
              <CreateForm allCategories={allCategories} setModalMessage={setModalMessage} />
            </div> : page === "instructions" ? <Instructions/> : <div id="init-msg" dangerouslySetInnerHTML={{ __html: message }}></div>}
      </div>
    </div>
  );
}

export default App;
