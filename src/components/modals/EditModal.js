import React from "react";

function EditModal(props) {
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed z-50 justify-center items-center left-1/2 ml-[-50%] inset-0">
        <div className="absolute flex justify-center items-center inset-0  my-2 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[450px] bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 rounded-t ">
              <h3 className="text-xl font-Montserrat">
                <i className="fa-solid fa-pencil fa-md"></i>&nbsp; Edit Note
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => props.setShowModal(false)}
                aria-label="Close Button"
                type="button"
              >
                <span className=" opacity-7 block">
                  <i className="fa-solid fa-xmark fa-xl"></i>
                </span>
              </button>
            </div>

            <hr className="  w-full h-1 bg-[#fcd581] rounded border-0"></hr>

            <div className="my-4 px-4">
              <form
                action="/"
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="etitle"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="etitle"
                    type="text"
                    value={props.note.etitle}
                    onChange={props.updateValue}
                    name="etitle"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="edescription"
                    className="block mb-2 mt-2 text-sm font-bold text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="edescription"
                    name="edescription"
                    rows="4"
                    value={props.note.edescription}
                    onChange={props.updateValue}
                    autoComplete="off"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  ></textarea>
                </div>
                <div className="w-full  px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="etag"
                  >
                    Tag
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="etag"
                      name="etag"
                      onChange={props.updateValue}
                    >
                      <option>Do not Change</option>
                      <option>General</option>
                      <option>Personal</option>
                      <option>Work</option>
                      <option>Relax</option>
                      <option>Task</option>
                      <option>List</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
                      <i className="fa-solid fa-caret-down"></i>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 ">
              <button
                id="#editBtn"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={props.editOnServer}
              >
                <i
                  id="#load"
                  className="fa-solid opacity-60 hidden fa-spinner"
                ></i>
                <i id="#editIcon" className="fa-regular  fa-circle-check"></i>
                &nbsp; Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
