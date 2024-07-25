import React, { useEffect, useState, useCallback, useMemo } from "react";
import io from "socket.io-client";
import axios from "axios";
import Buttons from "../components/custom/TradePage/buttons";
import Inputs from "../components/custom/TradePage/inputs";
import LtpDisplay from "../components/custom/TradePage/ltpDisplay";
import Info from "../components/custom/TradePage/info";

const SOCKET_SERVER_URL = "http://localhost:3000";

export default function Trade() {
  const [feed, setFeed] = useState<any>({});
  const [optionsData, setOptionsData] = useState<any>({});
  const [expiryDates, setExpiryDates] = useState<string[]>([]);
  const [expiry, setExpiry] = useState("");
  const [strikePrices, setStrikePrices] = useState<number[]>([]);
  const [callStrike, setCallStrike] = useState(0);
  const [putStrike, setPutStrike] = useState(0);
  const [callKey, setCallKey] = useState("");
  const [putKey, setPutKey] = useState("");
  const [callSymbol, setCallSymbol] = useState("");
  const [putSymbol, setPutSymbol] = useState("");
  const [callLTP, setCallLTP] = useState(0);
  const [putLTP, setPutLTP] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState("");
  const [orderType, setOrderType] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [index, setIndex] = useState<{ name: string; symbol: string }>({
    name: "NIFTY",
    symbol: "NSE_INDEX|Nifty 50",
  });
  const [indexLtp, setIndexLtp] = useState<number>(0);

  // console.log("index");

  useEffect(() => {
    // search for the instrument token from the optionsData
    // const putToken = optionsData.data[index.name][`${expiry} : ${putStrike}`].PE;
    // const callToken = optionsData.data[index.name][`${expiry} : ${callStrike}`].CE;
    // console.log(putToken, callToken);
    try {
      if (putStrike) {
        setPutKey(
          optionsData?.data[index.name][`${expiry} : ${putStrike}.0`].PE
            .instrument_key
        );
        setPutSymbol(
          optionsData?.data[index.name][`${expiry} : ${putStrike}.0`].PE
            .tradingsymbol
        );
      }
      if (callStrike) {
        setCallKey(
          optionsData?.data[index.name][`${expiry} : ${callStrike}.0`].CE
            .instrument_key
        );
        setCallSymbol(
          optionsData?.data[index.name][`${expiry} : ${callStrike}.0`].CE
            .tradingsymbol
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [index, putStrike, callStrike]);
  useEffect(() => {
    // console.log(callKey, putKey);
    // console.log(callSymbol, putSymbol);
    feed[callKey] && setCallLTP(feed[callKey]?.ff.marketFF.ltpc.cp);
    feed[putKey] && setPutLTP(feed[putKey]?.ff.marketFF.ltpc.cp);
  }, [callKey, putKey]);
  useEffect(() => {
    if (!index || !optionsData.data ) return;
    console.log(optionsData);
    let tempExpiryDates: string[] = [];
    Object.keys(optionsData.data[index.name]).map((op) => {
      const result = extractExpiryAndStrike(op);
      if (!tempExpiryDates.includes(result.expiryDate))
        tempExpiryDates.push(result.expiryDate);
      });
    setExpiryDates(tempExpiryDates);
    // setStrikePrices(tempStrikePrices);
  }, [index]);
  useEffect(() => {
    if (!expiry || !optionsData) return;
    let tempStrikePrices: number[] = [];
    Object.keys(optionsData.data[index.name]).map((op) => {
      const result = extractExpiryAndStrike(op);
      // tempExpiryDates.push(result.expiryDate);
      if (
        result.expiryDate === expiry &&
        !tempStrikePrices.includes(result.strikePrice)
      )
        tempStrikePrices.push(result.strikePrice);
      // tempStrikePrices.push(result.strikePrice);
    });
    setStrikePrices(tempStrikePrices);
    setCallStrike(0);
    setPutStrike(0);
  }, [expiry]);
  useEffect(() => {
    const fetchData = async () => {
      const queryParameters = new URLSearchParams(location.search);
      const id = queryParameters.get("id");
      setAccountId(id);

      // some await functions
      if (id) {
        // For example, fetch some data with the accountId
        // const data = await fetchDataWithAccountId(id);
      }
    };

    fetchData();
  }, [location.search]);

  const extractExpiryAndStrike = (
    input: string
  ): { expiryDate: string; strikePrice: number } => {
    const regex = /(\d{4}-\d{2}-\d{2})\s*:\s*([\d.]+)/;
    const match = input.match(regex);

    if (match) {
      const expiryDate = match[1];
      const strikePrice = parseFloat(match[2]);
      return { expiryDate, strikePrice };
    } else {
      throw new Error("Invalid input format");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/get-structured-options-data")
      .then((resp) => {
        setOptionsData(resp.data);
        let tempExpiryDates: string[] = [];
        let tempStrikePrices: number[] = [];
        Object.keys(resp.data.data[index.name]).map((op) => {
          const result = extractExpiryAndStrike(op);
          if (!tempExpiryDates.includes(result.expiryDate))
            tempExpiryDates.push(result.expiryDate);
          // tempExpiryDates.push(result.expiryDate);
          if (!tempStrikePrices.includes(result.strikePrice))
            tempStrikePrices.push(result.strikePrice);
          // tempStrikePrices.push(result.strikePrice);
        });
        setExpiryDates(tempExpiryDates);
        setStrikePrices(tempStrikePrices);
        console.log(resp.data);
      });

    const socket = io(SOCKET_SERVER_URL);
    socket.emit("new-user", { test: 123 });

    // Listen for the "market-data" event
    socket.on("market-data", (data: any) => {
      setFeed(data.feeds);
      // console.log(data.feeds);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const newIndexLtp = feed[index?.symbol]?.ff.indexFF.ltpc.ltp;
    newIndexLtp && setIndexLtp(newIndexLtp);

    feed[callKey] && setCallLTP(feed[callKey]?.ff.marketFF.ltpc.cp);
    feed[putKey] && setPutLTP(feed[putKey]?.ff.marketFF.ltpc.cp);

    // console.log(putKey, feed[putKey]);
    // console.log(callKey, feed[callKey]);
    // console.log((feed[callKey]));
  }, [feed]);

  const memoizedSetPutStrike = useCallback(
    (value: number) => setPutStrike(value),
    []
  );
  const memoizedSetCallStrike = useCallback(
    (value: number) => setCallStrike(value),
    []
  );
  const memoizedSetExpiry = useCallback(
    (value: string) => setExpiry(value),
    []
  );
  const memoizedSetIndex = useCallback(
    (value: { name: string; symbol: string }) => setIndex(value),
    []
  );

  const memoizedSetProduct = useCallback(
    (value: string) => setProduct(value),
    []
  );
  const memoizedSetOrderType = useCallback(
    (value: string) => setOrderType(value),
    []
  );

  const memoizedSetQuantity = useCallback(
    (value: number) => setQuantity(value),
    []
  );

  const memoizedInputsProps = useMemo(
    () => ({
      setPutStrike: memoizedSetPutStrike,
      setCallStrike: memoizedSetCallStrike,
      setExpiry: memoizedSetExpiry,
      strikePrices,
      expiryDates,
      optionsData,
      setIndex: memoizedSetIndex,
      setProduct: memoizedSetProduct,
      setOrderType: memoizedSetOrderType,
      setQuantity: memoizedSetQuantity,
    }),
    [
      memoizedSetPutStrike,
      memoizedSetCallStrike,
      memoizedSetExpiry,
      strikePrices,
      expiryDates,
      optionsData,
      memoizedSetIndex,
      memoizedSetProduct,
      memoizedSetOrderType,
      memoizedSetQuantity,
    ]
  );

  useEffect(() => {
    console.log(
      product,
      orderType,
      quantity,
      callKey,
      putKey,
      "transaction_type : SELL"
    );
  }, [quantity, orderType, product]);

  return (
    <div>
      <Inputs {...memoizedInputsProps} />
      <LtpDisplay
        callStrike={callStrike}
        putStrike={putStrike}
        callLTP={callLTP}
        putLTP={putLTP}
        index={index}
        indexLtp={indexLtp}
        callSymbol={callSymbol}
        putSymbol={putSymbol}
      />
      <Buttons
        account_id={accountId}
        product={product}
        orderType={orderType}
        quantity={quantity}
        callKey={callKey}
        putKey={putKey}
      />
      <Info />
    </div>
  );
}

//1 get token for call and put selected instrument [DONE]
//2 render their ltp [DONE]
//3 place order [DONE]
//4 manage child accounts
//5 copy trade in child account
