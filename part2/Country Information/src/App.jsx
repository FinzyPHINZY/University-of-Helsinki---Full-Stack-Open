import { useEffect, useState } from "react";
import "./App.css";
import CountryServices from "./services/countries.js";
import Country from "./components/Country.jsx";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showCountry, setShowCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    CountryServices.getAllCountries()
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setShowCountry(null);
  };

  const revealCountry = (country) => {
    setShowCountry(country);
  };

  const getFilteredCountries = () => {
    return countries
      .sort((a, b) => a.name.common.localeCompare(b.name.common))

      .filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
  };

  const renderOutput = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error fetching countries: {error.message}</p>;
    }

    if (showCountry) {
      return <Country country={showCountry} />;
    }

    const filteredCountries = getFilteredCountries();

    if (filteredCountries.length < 1) {
      return "No country matches your search";
    }

    if (filteredCountries.length > 10) {
      return "Too many matches, specify another filter";
    }

    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    }

    return filteredCountries.map((country, index) => (
      <p key={index}>
        {country.name.common}
        <button onClick={() => revealCountry(country)}>
          Show Country Data
        </button>
      </p>
    ));
  };

  return (
    <div className="app">
      <header>
        <div className="container">
          <p className="header">Countries Information</p>
        </div>
      </header>

      <main>
        <div className="container">
          <form>
            <label htmlFor="countries">
              <strong>find countries</strong>
            </label>
            <input
              type="text"
              id="countries"
              name="countries"
              placeholder="Countries"
              value={searchValue}
              onChange={handleChange}
            />
          </form>

          {renderOutput()}
        </div>
      </main>
    </div>
  );
}

export default App;
