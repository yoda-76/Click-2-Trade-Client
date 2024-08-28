
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function CoustomSelect(props:{options:string[], setChange:any, label:string, }) {
  // console.log("custom select rensering");
  return (
    <div className="flex flex-col space-y-1.5">
                <Label>{props.label}</Label>
                <Select
                  onValueChange={(value) => {
                    props.setChange(value);
                  }}
                >
                  <SelectTrigger id="broker">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {props.options ? props.options.map(op=><SelectItem value={op}>{op}</SelectItem>):<SelectItem value={"op"}>{"op"}</SelectItem> }
                  </SelectContent>
                </Select>
              </div>
  )
}
