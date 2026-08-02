import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import "../../css/search/SearchBar.css"
const SearchBar = ({setSearchSongs}) => {
  console.log("🔄 SearchBar Rendered");
  const [query,setQuery]=useState("");
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    if(!query.trim()){
      console.log("🔍 Query:", query); 
      setSearchSongs([]);
      return;
    }
    const fetchSongs = async() =>{
      try {
        setLoading(true);
        const res=await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/songs/search/${encodeURIComponent(query)}`,
        );
        console.log("✅ API Results:", res.data.results);      // <-- ADD HERE
        console.log("✅ Results Length:", res.data.results.length); // <-- ADD HERE 
        setSearchSongs(res.data.results);
      } catch (error) {
        console.error("Jamendo Search failed..",error);
        setSearchSongs([]);
      }
      finally{
        setLoading(false);
      }
    }
    const debounce = setTimeout(fetchSongs,1000);
    return () => clearInterval(debounce);

  },[query,setSearchSongs]);

  return (
    <div className="searchbar-root">
      <div className="searchbar-input-wrapper">
        <input
          className="searchbar-input"
          type="text"
          placeholder="search Songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <CiSearch className="searchbar-icon" size={20} />
      </div>
      {!query && !loading && (
        <p className="searchbar-empty">Search Songs to display</p>
      )}
      {loading && <p className="searchbar-loading">Searching...</p>}
    </div>
  );
};

export default SearchBar;
