import React from "react";

export default function AppAlert({color = "text-red-700" , message}) {
  return <>
  <span className={`${color} my-2 text-sm`}>{message}</span>
  </>;
}
