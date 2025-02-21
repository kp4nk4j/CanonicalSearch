import React, { useState } from "react";
import "./App.css";
import { searchName } from "./api";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    setResult(null);
    if (!query) return;
    try {
      const response = await searchName(query);
      console.log("response data : ", response);
      setResult(response);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <h2>🔍 Search System</h2>
        <input
          type="text"
          placeholder="Enter name in Hebrew or English..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {result && (
        <div className="result-box">
          <h3>📌 Canonical Name:</h3>
          <p className="text-content">{result.canonicalName}</p>

          <h3>📝 Variations:</h3>
          <div className="scrollable-content">
            <p className="text-content">{result.variations.join(", ")}</p>
          </div>

          <h3>🔠 Phonetic Keys:</h3>
          <div className="scrollable-content">
            <p className="text-content">{result.phoneticKeys.join(", ")}</p>
          </div>
          {result.category && (
            <>
              <h3>🏷 Category:</h3>
              <p className="text-content">{result.category}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
