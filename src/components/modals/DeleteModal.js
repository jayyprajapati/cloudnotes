import React from "react";

function deleteModal(props) {
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed z-50 justify-center items-center left-1/2 ml-[-50%] inset-0">
        <div className="absolute flex justify-center items-center inset-0  my-2 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-5/6 md:w-1/2 bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between gap-6 p-5 rounded-t ">
              <h3 className="text-xl font-Montserrat">
                Are you sure you want to{" "}
                <span className="text-red-600">Delete</span> this note?
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => props.setShowDelModal(false)}
                aria-label="Close Button"
                type="button"
              >
                <span className=" opacity-7 block">
                  <i className="fa-solid fa-xmark fa-xl"></i>
                </span>
              </button>
            </div>

            <hr className="  w-full h-1 bg-[#fcd581] rounded border-0"></hr>
            <div className="flex justify-center">
              <h2 className="m-5 font-bold text-gray-500 font-Montserrat">
                {props.title}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-5 p-6 ">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => props.setShowDelModal(false)}
              >
                <i className="fa-solid fa-xmark"></i>&nbsp; Cancel
              </button>
              <button
                id="#delBtn"
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                onClick={props.delOnServer}
              >
                <i
                  id="#load"
                  className="fa-solid opacity-60 hidden fa-spinner"
                ></i>
                <i id="#delIcon" className="fa-regular fa-trash-can"></i>
                &nbsp; Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default deleteModal;
