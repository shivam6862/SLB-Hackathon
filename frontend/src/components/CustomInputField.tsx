"use client";
import React, { useRef } from "react";
import classes from "@/styles/CustomInputField.module.css";
import useHandleInputSize from "@/hooks/useHandleInputSize";

type CustomInputFieldProps = {
  placeholder: string;
  type: string;
  value: string | number;
  id: string;
  handleChanges: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | any,
  ) => void;

  isInput: boolean;
  onBlur?: () => void;
  error?: string;
};

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  placeholder,
  type,
  value,
  id,
  handleChanges,
  onBlur,
  error,
  isInput,
}) => {
  const { textareaRef, handleInput } = useHandleInputSize();
  return (
    <div className={classes["container"]}>
      <div className={classes["box"]}>
        {isInput ? (
          <input
            placeholder=" "
            type={type}
            value={value}
            id={id}
            onChange={handleChanges}
            onBlur={onBlur}
            style={{
              borderColor: error ? "var(--light-warn-color)" : "",
            }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            placeholder=" "
            value={value}
            id={id}
            onInput={handleInput}
            onChange={handleChanges}
            onBlur={onBlur}
            style={{
              borderColor: error ? "var(--light-warn-color)" : "",
              paddingRight: "4rem",
            }}
          ></textarea>
        )}
        <label>
          {error ? (
            <span className={classes["error"]}>{error}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default CustomInputField;
