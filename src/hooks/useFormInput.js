import { useState } from "react";

/**
 * Custom hook for handling form input state
 * Demonstrates: useState, controlled components, custom hooks
 */
export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  const reset = () => setValue(initialValue);

  return [value, bind, reset];
}
