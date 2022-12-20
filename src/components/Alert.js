import React from "react";

function Alert(props) {
  const svg = props.alert.type === "success" ? "check" : "exclamation";

  return (
    <>
      {props.alert && props.alert.type === "success" && (
        <div
          id="alert-border-3 "
          className={`flex  absolute left-0 right-0 mr-auto ml-auto p-4 mb-4 bg-green-300 border-t-4 border-green-700 rounded-b-md justify-center `}
          role="alert"
        >
          <i className={`fa-solid text-green-600 fa-circle-${svg}`}></i>
          <div className={`ml-3 text-sm font-medium text-green-600`}>
            {`${props.alert.msg}`}
          </div>
        </div>
      )}
      {props.alert && props.alert.type === "Error" && (
        <div
          id="alert-border-3 "
          className={`flex  absolute left-0 right-0 mr-auto ml-auto p-4 mb-4 bg-red-300 border-t-4 border-red-600 rounded-b-md justify-center `}
          role="alert"
        >
          <i className={`fa-solid text-red-600 fa-circle-${svg}`}></i>
          <div className={`ml-3 text-sm font-medium text-red-600`}>
            {`${props.alert.msg}`}
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
