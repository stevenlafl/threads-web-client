// @see: https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      let scrollHeight = textAreaRef.scrollHeight;

      if (scrollHeight < 48) {
        scrollHeight = 64;
      }

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
