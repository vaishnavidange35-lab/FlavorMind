import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { restaurantApi } from '../../services/api.js';

export const CityAutocomplete = ({ value, onSelect, className = "" }) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!inputValue || inputValue.trim().length < 2) {
        // Show default popular and minor cities when input is empty
        setSuggestions([
          { id: 'def-1', name: 'Satara, Maharashtra, India', lat: 17.6805, lng: 74.0183, isGoogle: false },
          { id: 'def-2', name: 'Vadodara, Gujarat, India', lat: 22.3072, lng: 73.1812, isGoogle: false },
          { id: 'def-3', name: 'Shindkheda, Maharashtra, India', lat: 21.2427, lng: 74.7431, isGoogle: false },
          { id: 'def-4', name: 'Shirpur, Maharashtra, India', lat: 21.3485, lng: 74.8818, isGoogle: false },
          { id: 'def-5', name: 'Bhatinda, Punjab, India', lat: 30.2110, lng: 74.9455, isGoogle: false },
          { id: 'def-6', name: 'Chandigarh, India', lat: 30.7333, lng: 76.7794, isGoogle: false },
          { id: 'def-7', name: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714, isGoogle: false },
          { id: 'def-8', name: 'Dhule, Maharashtra, India', lat: 20.9042, lng: 74.7749, isGoogle: false }
        ]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await restaurantApi.autocompleteCities(inputValue);
        if (res.data.success) {
          setSuggestions(res.data.data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Autocomplete fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce 300ms
    const timer = setTimeout(() => {
      // Only fetch if input is not exactly the selected value
      if (inputValue !== value) {
        fetchSuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, value]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = async (suggestion) => {
    const cityName = suggestion.name.split(',')[0].trim();
    setInputValue(cityName);
    setIsOpen(false);

    let coords = null;

    // If it's a Google Place and we need coordinates
    if (suggestion.isGoogle) {
      try {
        const res = await restaurantApi.getCityCoordinates(suggestion.id);
        if (res.data.success && res.data.data) {
          coords = res.data.data;
        }
      } catch (err) {
        console.error("Failed to get coordinates", err);
      }
    } else {
      // Nominatim provides lat/lng directly
      coords = { lat: suggestion.lat, lng: suggestion.lng };
    }

    onSelect(cityName, coords);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className={`flex items-center rounded-xl px-4 py-3 h-12 w-full transition-all ${className} border focus-within:border-emerald-500 focus-within:shadow-sm`}>
        <MapPin size={20} className="text-slate-400 shrink-0" />
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-slate-700 ml-3 placeholder:text-slate-400 font-medium"
          placeholder="Search City (e.g. Mumbai, Pune...)"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (!isOpen && e.target.value.length >= 2) setIsOpen(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
        />
        {isLoading && <Loader2 size={16} className="text-emerald-500 animate-spin shrink-0 ml-2" />}
      </div>

      {/* Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
          {suggestions.map((suggestion, index) => {
            // Split "Mumbai, Maharashtra, India" into main and sub text
            const parts = suggestion.name.split(',');
            const mainText = parts[0].trim();
            const subText = parts.slice(1).join(',').trim();

            return (
              <button
                key={suggestion.id || index}
                onClick={() => handleSelect(suggestion)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
              >
                <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 text-sm">{mainText}</span>
                  {subText && <span className="text-xs text-slate-500">{subText}</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
