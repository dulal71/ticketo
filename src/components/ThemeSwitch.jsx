"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { BiMoon } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";
import { IoIosSunny } from "react-icons/io";


export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
   

  return (
<Switch onChange={()=>setTheme( theme === "dark" ? "light" : "dark")} >
          {({isSelected}) => (
            <Switch.Content>
              <Switch.Control className={isSelected ? "bg-blue-600" : "bg-amber-400"}>
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <FiMoon className="size-3 text-inherit opacity-100" />
                    ) : (
                      <IoIosSunny className="size-3 text-inherit opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </Switch.Content>
          )}
        </Switch>
  
  
  
  );
}