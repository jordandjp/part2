import Country from "./Country";

const Countries = ({ countries, setSearch }) => {
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) return <Country country={countries[0]} />;

  return countries.map((country) => (
    <div key={country.name.official}>
      {country.name.common}{" "}
      <button type="button" onClick={() => setSearch(country.name.common)}>
        show
      </button>
    </div>
  ));
};

export default Countries;
