import { useState } from 'react';
import data from './data.js';

function App() {
  return (
    <div className='container'>
      <RenderHeader />
      <RenderTitle />
      <RenderCountries data={data}/>
    </div>

  );
}
function RenderHeader() {
  const [darkMode, setDarkMode] = useState(false);

  function handleClick() {
    setDarkMode(!darkMode) 
  }

  if(darkMode) {
    document.body.classList.add('dark-mode')
  }else {
    document.body.classList.remove('dark-mode')
  }

  return (
    <div className='header'>
      <h1>Where in the world?</h1>
      <div className='theme-toggle'>
        <label>Dark Mode
        <input type="checkbox" onClick={handleClick} /><img src="/img/light-mode.svg" alt="" />
        </label>
      </div>
    </div>
  )
}
function RenderTitle() { 
  return (
    <div className='input-group'>
      <input type="text" placeholder='Search for a country…'/>
      <select name="region" className='region'>
        <option value="" disabled selected>Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  )
}

function RenderCountries({ data }) {
  const [showCountries, setShowCountries] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null)

  function formatNumber(num) {
    return num.toLocaleString('en-US')
  }


  function handleClick(country) {
    setShowCountries(false)
    setSelectedCountry(country)
  }
  return(
    <>
      {showCountries ? (
        <div className="countries-list">
          {data.map((x) => (
            <div className="countries-card" onClick={() => handleClick(x)} key={x.cca3}>
              <img src={x.flags.png}></img>
              <div className='countries-info'>
                <h2>{x.name.common}</h2>
                <p><strong>Population:</strong> {formatNumber(x.population)}</p>
                <p><strong>Region:</strong> {x.region}</p>
                <p><strong>Capital:</strong> {x.capital}</p>
              </div>
            </div>
          ))}
        </div>) : (
          <>
            <button onClick={() => setShowCountries(true)}>Back</button>
            <div className='country-details'>
              <img src={selectedCountry.flags.png} alt={selectedCountry.name.common} />
              <div className='country-info'>
                <h2>{selectedCountry.name.common}</h2>
                <p><strong>Native Name:</strong> {selectedCountry.name.official}</p>
                <p><strong>Population:</strong> {formatNumber(selectedCountry.population)}</p>
                <p><strong>Region:</strong> {selectedCountry.region}</p>
                <p><strong>Sub Region:</strong> {selectedCountry.subregion}</p>
                <p><strong>Capital:</strong> {selectedCountry.capital}</p>
                <p><strong>Top Level Domain:</strong> {selectedCountry.tld}</p>
                <p><strong>Currencies:</strong> {selectedCountry.currencies ? Object.values(selectedCountry.currencies).map(currency => currency.name).join(', ') : ''}</p>
                <p><strong>languages:</strong> { Object.values(selectedCountry.languages).join(', ')}</p>
                <p><strong>Border Countries:</strong> {selectedCountry.borders ? selectedCountry.borders.join(', ') : "-"}</p>
              </div>
            </div>
          </>

        )}
    </>
  )
}
export default App
