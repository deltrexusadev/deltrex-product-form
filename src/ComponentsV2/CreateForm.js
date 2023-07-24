import { useState } from 'react'

const CustomizationOptions = {
    finishes: {
        name: 'Finishes of Plate (Powder Coat)',
        state: false,
        options: [
            { name: 'CA: Aluminum', state: true },
            { name: 'BK: Black', state: true },
            { name: 'RD: Red', state: true },
            { name: 'WH: White', state: true },
            { name: 'GR: Green', state: true },
            { name: 'BL: Blue', state: true }
        ]
    },
    engravingColor: {
        name: 'Engraving Color (Powder Coat)',
        state: false,
        options: [
            { name: 'CA: Aluminum', state: true },
            { name: 'BK: Black', state: true },
            { name: 'RD: Red', state: true },
            { name: 'WH: White', state: true },
            { name: 'GR: Green', state: true },
            { name: 'BL: Blue', state: true }
        ]
    },
    switches: {
        name: 'Switch Types',
        state: false,
        options: [
            { name: 'SPDT: Momentary', state: true },
            { name: 'SPDT: ON / OFF Momentary', state: true },
            { name: 'DPDT: Momentary', state: true },
            { name: 'PNUM: Pneumatic, Momentary', state: true }
        ]
    },
    engravingOptions: {
        name: 'Engraving Options',
        state: false,
        options: [
            { name: 'E00: No Engraving', state: true },
            { name: 'E01: Exit', state: true },
            { name: 'E03: Push to Open', state: true },
            { name: 'E04: Emergency', state: true },
            { name: 'E07: Push for Help', state: true },
            { name: 'E08: Push to Lock', state: true },
            { name: 'E09: Push to Unlock', state: true },
            { name: 'E11: Push to Sound Alarm', state: true },
            { name: 'E12: Vacant', state: true },
            { name: 'E14: Occupied', state: true },
            { name: 'E24: Push to Open Door', state: true },
            { name: 'E32: Push to Operate Door', state: true },
            { name: 'E42: Wave to Exit', state: true },
            { name: 'E43: Wave to Open', state: true },
            { name: 'E44: Wave for Help', state: true },
            { name: 'E45: Wave to Lock', state: true },
            { name: 'E46: Wave to Unlock Gate', state: true },
            { name: 'E47: Wave to Sound Alarm', state: true },
            { name: 'E48: Wave to Exit w/ HCP Logo', state: true },
            { name: 'E49: Wave to Open Door w/ HCP Logo', state: true },
            { name: 'E50: Wave to Operate Door w/ HCP Logo', state: true },
            { name: 'EH2: HCP Logo ECE', state: true },
            { name: 'EH22: Foot', state: true }
        ]
    }
}

export default function CreateForm({ allCategories, setModalMessage }) {
    const [imageString, setImageString] = useState('')
    const [customizationOptions, setCustomizationOptions] = useState(CustomizationOptions)

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            const categories = []
            for (const categoryCheckbox of document.querySelectorAll('.category-checkbox')) {
                if (categoryCheckbox.checked) {
                    categories.push({ id: categoryCheckbox.value })
                }
            }

            if (categories.length === 0) {
                const modal = document.getElementById('modal')
                modal.classList.toggle('hidden')
                setModalMessage({ title: 'No category selected.', message: 'Choose a category for this new product to go under.' })
                return;
            }

            let finishes = ''
            for (const option of customizationOptions.finishes.options) {
                if(option.state === true)
                finishes += `<li>${option.name}</li>`
            }

            let engravingColor = ''
            for(const option of customizationOptions.engravingColor.options){
                if(option.state === true)
                engravingColor += `<li>${option.name}</li>`
            }

            let switches = ''
            for(const option of customizationOptions.switches.options){
                if(option.state === true)
                switches += `<li>${option.name}</li>`
            }

            let engravingOptions = ''
            for(const option of customizationOptions.engravingOptions.options){
                if(option.state === true)
                engravingOptions += `<li>${option.name}</li>`
            }

            const data = {
                name: document.getElementById('name').value,
                slug: document.getElementById('slug').value,
                type: "simple",
                regular_price: document.getElementById('regular_price').value,
                sale_price: document.getElementById('sale_price').value,
                description: `<h5>Summary</h5>
                <p class="mb-4" style="margin-top: 3px;">${document.getElementById('summary').value}</p>
                <h5>Product Features</h5>
                ${document.getElementById('prod-features').value}
                <br/>
                <div class="customization-options-grid">
                ${customizationOptions.finishes.state ? `<div> <h5>${customizationOptions.finishes.name}</h5> <ul> ${finishes} </ul> </div>` : '<!-- No Finishes -->'} ${customizationOptions.engravingColor.state ? `<div> <h5>${customizationOptions.engravingColor.name}</h5> <ul> ${engravingColor} </ul> </div>` : '<!-- No Engraving Color -->'} ${customizationOptions.switches.state ? `<div> <h5>${customizationOptions.switches.name}</h5> <ul> ${switches} </ul> </div>` : '<!-- No Switches -->'} ${customizationOptions.engravingOptions.state ? `<div> <h5>${customizationOptions.engravingOptions.name}</h5> <ul> ${engravingOptions} </ul> </div>` : '<!-- No Engraving Options -->'}      
                </div>`,
                short_description: `Engraving available in Spanish, Japanese, French, Arabic, Portuguese and Chinese. <a href="${document.getElementById('short_description').value}" target="_blank">Download Product Information</a><br/><b>Call us for <u>custom options</u> not listed here.</b>`,
                categories: [...categories],
                images: document.getElementById('img').value.split(',').map(img => {
                    return { src: img }
                })
            };
            // collect all input from the input fields, textareas, checkboxes, etc and format them into data to be sent
            // to the backend.
            // if it works, alert the user with a modal and reload the page after they click (okay!)
            const modal = document.getElementById('modal')
            modal.classList.toggle('hidden')
            setModalMessage({
                title: 'Create ' + `'${document.getElementById('name').value}'`, message: 'This product will be added to the website after pressing "Confirm".', func: async () => {
                    await fetch(`http://localhost:${3001}/products/create`, {
                        method: "POST",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(data),
                    })
                        .then(response => {
                            window.open('/', '_self')
                        })
                        .catch(error => {
                            // Alert the user that something has went wrong...
                        })
                }, img: null
            })
        }}>
            <div className="create-layout">
                <div className="image-section dvv">
                    <div className="create-main-img">
                        <br />
                        {imageString.split(',').map(img => {
                            return <img src={img} />
                        })}
                    </div>
                    <label><b>Image URL (tip: add multiple images separated by commas) ex. https://image1.png, https://image2.png</b></label>
                    <input id='img' type="text" placeholder="Paste the url of the image you want to use" required onChange={(e) => {
                        setImageString(e.target.value)
                    }} />
                </div>
                <div className="title-section dvv">
                    <label><b>Name</b></label>
                    <br />
                    {/* <img src={require('./images/product-name.png')} /> */}
                    <input id='name' type="text" placeholder="Product Title" required />
                </div>
                <div className="slug-section dvv">
                    <label><b>Keywords</b></label>
                    <input id='slug' type="text" placeholder="Slug" />
                    <label>("this-is-the-format-of-a-slug")
                        <p>
                            Slugs are used for keywords (searching/finding products)
                        </p>
                    </label>
                </div>
                <div className="regular_price-section dvv">
                    <label><b>Default Price</b></label>
                    <br />
                    {/* <img src={require('./images/regular-price.png')} /> */}
                    <input id='regular_price' type="number" step={0.01} placeholder="Regular Price" required />
                </div>
                <div className="sale_price-section dvv">
                    <label><b>Sale Price</b></label>
                    <br />
                    {/* <img src={require('./images/sale-price.png')} /> */}
                    <input id='sale_price' type="number" step={0.01} placeholder="Sale Price" />
                </div>
                <div className="short_description-section dvv">
                    <label><b>Short Description (Paste the URL of the PDF)</b></label>
                    <ul>
                        {/* <img src={require('./images/short-description1.png')} /> */}
                    </ul>
                    <input id='short_description' type='text' placeholder="Download Product Information (paste URL)"></input>
                </div>
                <div className="description-section dvv">
                    <label><b>Description</b></label>
                    <br />
                    {/* <img src={require('./images/description-summary.png')} /> */}
                    <textarea id='summary' placeholder="Summary"></textarea>
                    <hr />
                    {/* <img src={require('./images/description-product-features.png')} /> */}
                    <textarea id='prod-features' placeholder="Product Features"></textarea>
                    <hr />
                    {/* <img src={require('./images/description-customization-options.png')} /> */}
                    {/* Give options to opt in or out of certain options. Each product has different
                    customization options. */}
                    <ul className='customization-options'>
                        <div>
                            <div className='checklist-option'>
                                <label>Finishes of Plate (Powder Coat)</label>
                                <input type='checkbox' onChange={(e) => {
                                    const options = customizationOptions
                                    options.finishes.state = e.target.checked
                                    setCustomizationOptions({ ...options })
                                }} />
                            </div>
                            {customizationOptions.finishes.state ?
                                <div>
                                    <ul>
                                        {customizationOptions.finishes.options.map(option => {
                                            return <li className='custom-option'>{option.name} <input defaultChecked type='checkbox' onChange={(e) => {
                                                option.state = e.target.checked
                                            }} /></li>
                                        })}
                                    </ul>
                                </div> :
                                <div>
                                </div>}
                        </div>
                        <div>
                            <div className='checklist-option'>
                                <label>Engraving Color (Powder Coat)</label>
                                <input type='checkbox' onChange={(e) => {
                                    const options = customizationOptions
                                    options.engravingColor.state = e.target.checked
                                    setCustomizationOptions({ ...options })
                                }} />
                            </div>
                            {customizationOptions.engravingColor.state ?
                                <div>
                                    <ul>
                                        {customizationOptions.engravingColor.options.map(option => {
                                            return <li className='custom-option'>{option.name} <input defaultChecked type='checkbox' onChange={(e) => {
                                                option.state = e.target.checked
                                            }} /></li>
                                        })}
                                    </ul>
                                </div> :
                                <div>
                                </div>}
                        </div>
                        <div>
                            <div className='checklist-option'>
                                <label>Switch Types</label>
                                <input type='checkbox' onChange={(e) => {
                                    const options = customizationOptions
                                    options.switches.state = e.target.checked
                                    setCustomizationOptions({ ...options })
                                }} />
                            </div>
                            {customizationOptions.switches.state ?
                                <div>
                                    <ul>
                                        {customizationOptions.switches.options.map(option => {
                                            return <li className='custom-option'>{option.name} <input defaultChecked type='checkbox' onChange={(e) => {
                                                option.state = e.target.checked
                                            }} /></li>
                                        })}
                                    </ul>
                                </div> :
                                <div>
                                </div>}
                        </div>
                        <div>
                            <div className='checklist-option'>
                                <label>Engraving Options</label>
                                <input type='checkbox' onChange={(e) => {
                                    const options = customizationOptions
                                    options.engravingOptions.state = e.target.checked
                                    setCustomizationOptions({ ...options })
                                }} />
                            </div>
                            {customizationOptions.engravingOptions.state ?
                                <div>
                                    <ul>
                                        {customizationOptions.engravingOptions.options.map(option => {
                                            return <li className='custom-option'>{option.name} <input defaultChecked type='checkbox' onChange={(e) => {
                                                option.state = e.target.checked
                                            }} /></li>
                                        })}
                                    </ul>
                                </div> :
                                <div>
                                </div>}
                        </div>
                    </ul>
                </div>
                <p className="categories"><h3 style={{ marginLeft: 0 }}>This product will appear on the website under these categories.</h3>
                    <div className="categories-list">
                        {allCategories.map(category => {
                            let name;
                            for (const key in category) {
                                name = key
                            }
                            return <div className="checklist-option">{name} <input class='category-checkbox' type="checkbox" value={category[name]} /></div>
                        })}
                    </div>
                </p>
            </div>
            <button style={{ marginTop: "15px" }} type="submit">Create Product</button>
        </form>
    )
}