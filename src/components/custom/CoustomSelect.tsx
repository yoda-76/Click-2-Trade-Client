
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import '../../App.css'
export default function CoustomSelect(props:{options:string[], setChange:any, label:string, }) {
  // console.log("custom select rensering");
  return (
    <div className="flex text-[12px] flex-col items-center gap-2 ">
                <Label className='text-[12px] lighttxt uppercase' >{props.label}</Label>
                <Select
                
                  onValueChange={(value) => {
                    props.setChange(value);
                  }}
                >
                  <SelectTrigger className='bg-tranparent border-[1px] border-[#878686] text' id="broker">
                    <SelectValue  placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent  position="popper">
                    {props.options ? props.options.map(op=><SelectItem className='' value={op}>{op}</SelectItem>):<SelectItem  value={"op"}>{"op"}</SelectItem> }
                  </SelectContent>
                </Select>
              </div>
  )
}
