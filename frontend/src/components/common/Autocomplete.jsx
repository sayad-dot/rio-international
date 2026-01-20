import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';

const Autocomplete = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Search...",
  icon = Search,
  iconColor = "from-blue-500 to-cyan-500"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const Icon = icon;

  // Use useMemo to avoid effect dependency issues
  const filteredOptions = useMemo(() => {
    if (value) {
      return options.filter(option =>
        option.label.toLowerCase().includes(value.toLowerCase()) ||
        option.searchTerms?.some(term => term.toLowerCase().includes(value.toLowerCase()))
      );
    }
    return options;
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative group">
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center shadow-md z-10`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-20 pr-12 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-300/30 focus:border-primary-400 outline-none transition-all duration-300 text-gray-800 font-medium hover:border-primary-300"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(option)}
              className="w-full px-6 py-3 text-left hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl flex items-center gap-3 group/item"
            >
              <span className="text-2xl">{option.emoji}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 group-hover/item:text-primary-700 transition-colors">
                  {option.label}
                </div>
                {option.subtext && (
                  <div className="text-xs text-gray-500">{option.subtext}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && value && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 text-center">
          <div className="text-gray-400 mb-2">
            <Search className="h-8 w-8 mx-auto" />
          </div>
          <p className="text-gray-600">No countries found matching "{value}"</p>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
