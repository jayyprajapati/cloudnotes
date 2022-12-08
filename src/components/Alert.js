import React from "react";

function Alert(props) {
  const color = props.alert.type === "success" ? "green" : "red";
  const svg = props.alert.type === "success" ? "check" : "exclamation";

  return (
    <>
      {props.alert && (
        <div
          id="alert-border-3 "
          className={`flex  absolute left-0 right-0 mr-auto ml-auto p-4 mb-4 bg-${color}-100 border-t-4 border-${color}-500 dark:bg-${color}-200 rounded-b-md justify-center `}
          role="alert"
        >
          <i className={`fa-solid text-${color}-500 fa-circle-${svg}`}></i>
          <div className={`ml-3 text-sm font-medium text-${color}-500`}>
            {`${props.alert.msg}`}
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
