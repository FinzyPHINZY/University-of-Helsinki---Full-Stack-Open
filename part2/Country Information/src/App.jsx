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

  // Get country data from API using axios. Set countries state to contain data recieved and changed loading state to false to show data has been completely collected
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

  // Event listener: Monitor changes in controlled component (input) and set search value to be used in finding countries. Disable country rendering while user is typing.
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setShowCountry(null);
  };

  // Event listener: Enable country data to be rendered after the show button has been clicked. Takes in an argument which is the country selected
  const revealCountry = (country) => {
    setShowCountry(country);
  };

  const getFilteredCountries = () => {
    return (
      countries
        .sort((a, b) => a.name.common.localeCompare(b.name.common))

        // This was done so that users will always get country matches without having to know how to spell the country name correctly or  the country name first letters. Just like when a user remembers certain letters. but not the whole thing. Filtering this way will return the country
        .filter((country) =>
          country.name.common.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  };

  const renderOutput = () => {
    // users will know the app is not ready for use (yet to recieve the request response)
    if (loading) {
      return <p>Loading...</p>;
    }

    // lets users know if there's any error while fetching the countries
    if (error) {
      return <p>Error fetching countries: {error.message}</p>;
    }

    // Render a country if showCountry is true. this is after the revealCountry function has been triggered by the user through the show button
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
