"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// const quantity = [
//   {
//     value: "15",
//     label: "15",
//   },
//   {
//     value: "30",
//     label: "30",
//   },
//   {
//     value: "45",
//     label: "45",
//   },
//   {
//     value: "60",
//     label: "60",
//   },
// ]

export function Combobox(props:{setChangeQuantity:Function, quantity: {value: string, label: string}[]}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const quantity = props.quantity
  React.useEffect(() => {
      console.log(value);
      props.setChangeQuantity(parseInt(value))
  },[value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? quantity.find((qty) => qty.value === value)?.label
            : "--Select qty--"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search qty..." />
          <CommandList>
            <CommandEmpty>No qty found.</CommandEmpty>
            <CommandGroup>
              {quantity.map((qty) => (
                <CommandItem
                  key={qty.value}
                  value={qty.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === qty.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {qty.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
