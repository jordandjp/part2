import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Filter label={"find countries"} value={search} onChange={handleSearch} />
      <Countries countries={countriesToShow} setSearch={setSearch} />
    </div>
  );
}

export default App;
