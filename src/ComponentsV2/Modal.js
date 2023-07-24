export function Modal({ title, message, func, img }) {
    return (
        <div id="modal" className="modal-window hidden">
            <h1>{title}</h1>
            <p>{message}</p>
            {img ? <img src={img}/> : null}
            <br/>
            {func ? <button onClick={() => func()}>Confirm</button> : null}
            <button onClick={(e) => {
                e.target.parentElement.classList.toggle('hidden')
            }}>Close</button>
        </div>
    )
}