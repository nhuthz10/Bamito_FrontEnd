import { v4 as uuidv4 } from "uuid";
import unidecode from "unidecode";
import { useEffect, useState } from "react";
const CreateCode = (name) => {
  name = unidecode(name.replace(/[^a-zA-Z0-9]/g, ""));
  let result = "";
  let code = uuidv4();
  for (var i = 0; i < name.length; i++) {
    if (i % 2 === 0) result += name[i];
  }
  return result.toUpperCase() + code.slice(0, 5).toUpperCase();
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handleDebounce);
  }, [value, delay]);

  return debounceValue;
};

export default CreateCode;
