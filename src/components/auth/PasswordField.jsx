"use client";

import { useState } from "react";
import { InputGroup } from "@heroui/react";
import { TextField, Label, Input } from "react-aria-components";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const groupStyle =
    "flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-red-500 transition-colors";

  const inputStyle =
    "w-full bg-transparent py-2.5 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400";

  const labelStyle =
    "text-sm font-medium text-zinc-700 dark:text-zinc-300";

  return (
    <TextField className="flex flex-col gap-1.5">
      <Label className={labelStyle}>{label}</Label>

      <InputGroup className={groupStyle}>
        <FaLock
          className="text-zinc-400 pointer-events-none shrink-0"
          size={13}
        />

        <Input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputStyle}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-zinc-400 hover:text-zinc-600 transition"
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? (
            <FaEye size={15} />
          ) : (
            <FaEyeSlash size={15} />
          )}
        </button>
      </InputGroup>

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </TextField>
  );
};

export default PasswordField;