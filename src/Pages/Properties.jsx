import React, { useState } from 'react'
import '../styles/properties.css'

function Properties() {
  const [priceFilterOpen, setPriceFilterOpen] = useState(false)
  const [minPriceOpen, setMinPriceOpen] = useState(false)

  const [minPrice, setMinPrice] = useState(0)
  let minPricesArray = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]
  const toggleDropdown = (filter) => {
    if (filter === 'price') {
      setPriceFilterOpen(prevPriceFilterOpen => !prevPriceFilterOpen)
    }
  }
  return (
    <main className='mainProperties'>
      <header className='filtersHeader'>
        <div>
          <button className='filterButton' onClick={() => toggleDropdown('price')}>Price <span className={`arrow ${priceFilterOpen ? 'arrowActive' : ''}`}></span></button>
          {priceFilterOpen && (
            <div className='filtersDropdown'>
              <p className='filterTitle'>Price Range</p>
              <div
                onClick={() => setMinPriceOpen(prevMinPriceOpen => !prevMinPriceOpen)}
                className='individualFilterDropdown'
              >
                <p className='filterSubTitle'>Minimum Price</p>
                <input type="text" name='state' value={minPrice != 0 ? Intl.NumberFormat().format(minPrice) : 'No Min'} readOnly />
                {minPriceOpen &&
                  <div className="options">
                    {minPricesArray.map((option) => (
                      <div
                        className="option-item"
                        key={option}
                        onClick={() => setMinPrice(option)}
                      >
                        ${Intl.NumberFormat().format(option)}
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      </header>
    </main>
  )
}

export default Properties