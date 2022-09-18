import Weather from "./Weather";

const Country = ({ country }) => {
  const countryLanguages = Object.values(country.languages);
  const countryFlagAlt = `${country.name.common} flag`;
  const [lat, lon] = country.capitalInfo.latlng;

  return (
    <div>
      <h1 id="country-title">{country.name.common}</h1>
      <div id="country-details">
        <p>
          capital {country.capital[0]}
          <br />
          area {country.area}
        </p>
      </div>
      <br />
      <div id="country-languages">
        <b>languages:</b>
        <ul>
          {countryLanguages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <div id="country-flag-image">
        <img
          src={country.flags.png}
          width="200"
          height="150"
          alt={countryFlagAlt}
        />
      </div>
      <Weather capital={country.capital[0]} lat={lat} lon={lon} />
    </div>
  );
};

export default Country;
