import React, { useState } from "react";

const AutoCompleteTextArea = () => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const users = ["alice", "bob", "charlie", "david"];

  // Detectar si se escribe @
  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);

    const lastWord = value.split(" ").pop();

    if (lastWord.startsWith("@")) {
      const query = lastWord.substring(1).toLowerCase();
      const filteredSuggestions = users.filter((user) => user.toLowerCase().includes(query));
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Insertar la sugerencia seleccionada
  const handleSuggestionClick = (suggestion) => {
    const words = text.split(" ");
    words.pop(); // Elimina la palabra que estaba escribiendo
    setText([...words, `@${suggestion}`].join(" ") + " ");
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={handleInputChange}
        className="border p-2 w-full"
        placeholder="Escribe algo aquí..."
      />
      {showSuggestions && (
        <ul className="absolute bg-white border mt-1 w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default AutoCompleteTextArea;
