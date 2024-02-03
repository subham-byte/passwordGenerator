/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*(){}[]-_=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 191)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  } , [length, numAllowed,charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-1 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none w-full py-1 px-3"
            readOnly
            ref = {passwordRef}
          />
          <button className="bg-blue-700 text-white outline-none px-2 shrink-0"
          onClick={copyPasswordToClipboard}
          >
            Click
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            value={length}
            min={6}
            max={100}
            className="cursor-pointer"
            onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-centergap-x-1">
            <input 
            type="checkbox"
            className="cursor-pointer mx-1"
            value={numAllowed}
            onChange={() => {setNumAllowed(prev => !prev)}}
            />
            <label htmlFor="">Number</label>
          </div>
          <div className="flex items-centergap-x-1">
            <input 
            type="checkbox"
            className="cursor-pointer mx-1"
            value={charAllowed}
            onChange={() => {setCharAllowed(prev => !prev)}}
            />
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
