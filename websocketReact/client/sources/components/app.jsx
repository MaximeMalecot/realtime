import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("ws://localhost:9000");

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected")
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return(
    <h1>ONESTLA</h1>
  )
}

export default App;
