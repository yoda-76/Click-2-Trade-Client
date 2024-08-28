import "./App.css";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrderBookReducer,
  deleteOrderBookReducer,
} from "./store/orderbook-reducer";
function App() {
  const age = useSelector((state: any) => state.orderBookDetails);
  const dispatch = useDispatch();
  console.log(age);
  return (
    <>
      <div>hello</div>
      <Button
        onClick={() => {
          const newState={
            oderbook: [1,2,3],
          };
          dispatch(updateOrderBookReducer(newState));
          console.log(age)
        }}
      >
        Click me
      </Button>
      <Button
        onClick={() => {
          dispatch(deleteOrderBookReducer());
          console.log(age)
        }}
      >a</Button>
    </>
  );
}

export default App;
