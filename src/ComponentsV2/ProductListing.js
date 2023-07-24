import { useState } from "react"
import { allCategories } from "../App"

export default function ProductListing({ productInfo, setModalMessage }) {
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

    const [customizationOptions, setCustomizationOptions] = useState(CustomizationOptions)

    return (
        <div className="product-listing">
            <div className="info">

                <h3>OPT-IN | OPT-OUT</h3>
                <img id="change-name" src={require('./images/change-name.png')} />
                <p style={{ marginTop: 5 }}>Ensure you check the box of each property you want to update.
                    Boxes that aren't checked will opt-out of the update.
                </p>

                <br />

                <a href={productInfo.permalink} target='_blank'>Go to Product Page</a>
                <br />

                <div className="info-container checklist-option">
                    <h2 style={{ marginRight: 15 }}>Published</h2>
                    {productInfo.status === 'publish' ? <input id='publish' defaultChecked type="checkbox" /> : <input id='publish' type='checkbox' />}
                </div>

                <div className="info-container">
                    <h2>Product Name - {productInfo.name}</h2><span className="update-checkboxes">Change Name<input id='opt-name' type="checkbox" /></span>
                    <br />
                    {/* <img src={require('./images/product-name.png')} /> */}
                    <input id='name' type="text" placeholder={productInfo.name} />
                </div>

                <div id='img' className="info-container">
                    <h2>Images</h2><span className="update-checkboxes">Change Images<input id='opt-images' type="checkbox" /></span>
                    {productInfo.images.map(image => {
                        return (
                            <div className="info-container-image">
                                <img src={image.src} />
                                <input type="text" placeholder={image.src} />
                            </div>
                        )
                    })}
                </div>

                <div className="info-container">
                    <h2>Keywords (Slug)</h2><span className="update-checkboxes">Change Slug<input id='opt-slug' type="checkbox" /></span>
                    <input id='slug' type="text" placeholder={productInfo.slug} />
                </div>

                <div className="info-container">
                    <h2>Default Price</h2><span className="update-checkboxes">Change Default Price<input id='opt-regular_price' type="checkbox" /></span>
                    <br />
                    <img src={require('./images/regular-price.png')} />
                    <input id='regular_price' type="number" step={0.01} placeholder={'$' + Number(productInfo.regular_price).toFixed(2)} />
                </div>

                <div className="info-container">
                    <h2>Sale Price</h2><span className="update-checkboxes">Change Sale Price<input id='opt-sale_price' type="checkbox" /></span>
                    <br />
                    <img src={require('./images/sale-price.png')} />
                    <input id='sale_price' type="number" step={0.01} placeholder={'$' + Number(productInfo.sale_price).toFixed(2)} />
                </div>

                <div className="info-container">
                    <h2>Short Description</h2><span className="update-checkboxes">Change Short Description<input id='opt-short_description' type="checkbox" /></span>
                    <br />
                    <img src={require('./images/short-description1.png')} />
                    <div className="checklist-option">
                        <span>"Engraving Available in Spanish, Japanese, French, Arabic, Portuguese and Chinese."</span><input id="short_description-engraving-message" defaultChecked type="checkbox"/>
                    </div>
                    <textarea id='short_description-message' placeholder="Anything you want to say in the short description area..."></textarea>
                    <input id='short_description' type="text" placeholder="PDF link for this product (Download Product Information)" />
                </div>

                <div className="info-container">
                    <h2>Summary</h2><span className="update-checkboxes">Change Description<input id='opt-description' type="checkbox" /></span>
                    <br />
                    <img src={require('./images/description-summary.png')} />
                    <textarea id='summary' type="text" placeholder="Quick summary of this product..."></textarea>
                </div>

                <div className="info-container">
                    <h2>Product Features</h2>
                    <br />
                    <img src={require('./images/description-product-features.png')} />
                    <textarea id='prod-features' type="text" placeholder="Quick list of product features..."></textarea>
                </div>

                <div className="info-container">
                    <h2>Customization Options</h2>
                    <br />
                    <img src={require('./images/description-customization-options.png')} />
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

                <div className="info-container">
                    <h2>Categories</h2><span className="update-checkboxes">Change Categories<input id='opt-categories' type="checkbox" /></span>
                    <p className="categories"><h3 style={{ marginLeft: 0 }}>This product will appear on the website under these categories.</h3>
                        <div className="categories-list">
                            {allCategories.map(category => {
                                let name;
                                for (const key in category) {
                                    name = key
                                }
                                return <div className="checklist-option">{name} <input defaultChecked={productInfo.categories.find(_category => _category.id === category[name])} class='category-checkbox' type="checkbox" value={category[name]} /></div>
                            })}
                        </div>
                    </p>
                </div>

                <div className="buttons">
                    <button onClick={(e) => {
                        const instance = e.target.parentElement.parentElement

                        // open a modal that asks if you're sure
                        const modal = document.getElementById('modal')
                        modal.classList.toggle('hidden')

                        // only push altered inputfield values
                        // determine which fields were altered

                        // format images array
                        const imageInputs = instance.querySelector('#img').querySelectorAll('input[type="text"]')
                        let imagesArray = []
                        for (const imageInput of imageInputs) {
                            if (imageInput.value) {
                                imagesArray = [...imagesArray, ...imageInput.value.split(',')]
                            }
                        }

                        // format categories array
                        const categories = []
                        for (const categoryCheckbox of instance.querySelectorAll('.category-checkbox')) {
                            if (categoryCheckbox.checked) {
                                categories.push({ id: categoryCheckbox.value })
                            }
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

                        // format customization options
                        // finishes
                        // engravingColor
                        // switches
                        // engravingOptions

                        const update = {
                            name: instance.querySelector('#opt-name').checked ? instance.querySelector('#name').value : null,
                            slug: instance.querySelector('#opt-slug').checked ? instance.querySelector('#slug').value : null,
                            status: instance.querySelector('#publish').checked ? 'publish' : 'private',
                            type: "",
                            regular_price: instance.querySelector('#opt-regular_price').checked ? instance.querySelector('#regular_price').value : null,
                            sale_price: instance.querySelector('#opt-sale_price').checked ? instance.querySelector('#sale_price').value : null,
                            description: instance.querySelector('#opt-description').checked ? `<h5>Summary</h5>
                            <p class="mb-4" style="margin-top: 3px;">${instance.querySelector('#summary').value}</p>
                            <h5>Product Features</h5>
                            ${instance.querySelector('#prod-features').value}
                            <br/>
                            <div class="customization-options-grid">
                            ${customizationOptions.finishes.state ? `<div> <h5>${customizationOptions.finishes.name}</h5> <ul> ${finishes} </ul> </div>` : '<!-- No Finishes -->'} ${customizationOptions.engravingColor.state ? `<div> <h5>${customizationOptions.engravingColor.name}</h5> <ul> ${engravingColor} </ul> </div>` : '<!-- No Engraving Color -->'} ${customizationOptions.switches.state ? `<div> <h5>${customizationOptions.switches.name}</h5> <ul> ${switches} </ul> </div>` : '<!-- No Switches -->'} ${customizationOptions.engravingOptions.state ? `<div> <h5>${customizationOptions.engravingOptions.name}</h5> <ul> ${engravingOptions} </ul> </div>` : '<!-- No Engraving Options -->'}      
                            </div>` : '',
                            short_description: document.getElementById('opt-short_description').checked ? `${instance.querySelector('#short_description-engraving-message').checked ? 'Engraving available in Spanish, Japanese, French, Arabic, Portuguese and Chinese. ' : ''}<a href="${instance.querySelector('#short_description').value}" target="_blank">Download Product Information</a><br/>${instance.querySelector('#short_description-message').value ? `<p>${instance.querySelector('#short_description-message').value}</p>` : ''}<br/><b>Call us for <u>custom options</u> not listed here.</b>` : '',
                            categories: instance.querySelector('#opt-categories').checked ? categories : null,
                            images: instance.querySelector('#opt-images').checked ? imagesArray : null,
                        };

                        // automatically removes each key:value pair that doesn't have a valid value
                        for (const key in update) {
                            if (!update[key]) {
                                delete update[key]
                            }
                        }

                        console.log(update)

                        setModalMessage({
                            title: 'Update ' + `'${productInfo.name}'`, message: 'Are you sure you want to update this product?', func: () => {
                                fetch(`http://localhost:${3001}/product/update/${productInfo.id}`, {
                                    method: "PUT",
                                    headers: { 'Content-type': 'application/json' },
                                    body: JSON.stringify(update),
                                })
                                    .then(response => {
                                        window.open('/', '_self')
                                    })
                                    .catch(error => {
                                        // Alert the user that something has went wrong...
                                    })
                            }, img: productInfo.images[0].src
                        })
                    }}>Update Product</button>
                    <button onClick={() => {
                        // open a modal that asks if you're sure
                        const modal = document.getElementById('modal')
                        modal.classList.toggle('hidden')

                        setModalMessage({
                            title: 'Delete ' + `'${productInfo.name}'`, message: 'Are you sure you want to delete this product?', func: async () => {
                                await fetch(`http://localhost:${3001}/product/delete/${productInfo.id}`, {
                                    method: "DELETE",
                                })
                                    .then(response => {
                                        window.open('/', '_self')
                                    })
                                    .catch(error => {
                                        // Alert the user that something has went wrong...
                                    })
                            }, img: productInfo.images[0].src
                        })
                    }}>Delete Product</button>
                </div>
            </div>
        </div>
    )
}