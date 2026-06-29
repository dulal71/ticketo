import { Input, InputGroup, Label, TextField } from '@heroui/react';
import React from 'react';


const TextInput = ({
    label,icon,name,type,placeholder,value,onChange,error
}) => {
 const groupStyle = "flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-red-500 transition-colors";

  const inputStyle = "w-full bg-transparent py-2.5 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400";

  const labelStyle ="text-sm font-medium text-zinc-700 dark:text-zinc-300";
    return (
         <TextField className="flex flex-col gap-1.5">
                      <Label className={labelStyle}>{label}</Label>
                      <InputGroup className={groupStyle}>
                        {icon}
                        <Input
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          value={value}
                          onChange={onChange}
                          className={inputStyle}
                        />
                      </InputGroup>
                      {error && <p className="text-xs text-red-500">{error}</p>}
                    </TextField>
        
                  
        
                
    );
};

export default TextInput;