import React from "react";

function formatDate(date) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = String(hours ? hours : 12).padStart(2, "0");
  const strTime = `${dayNames[date.getDay()]}, ${hours}:${minutes} ${ampm}`;
  const strDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return [strDate, strTime];
}

function titleCase(str) {
  str = str?.toLowerCase().split(" ");
  for (var i = 0; i < str?.length; i++) {
    str[i] = str[i]?.charAt(0).toUpperCase() + str[i]?.slice(1);
  }
  return str?.join(" ");
}

function Noteitem(props) {
  const { note, updateNote, delNote } = props;

  const strDate = new Date(note.date);
  const [finalDate, finalTime] = formatDate(strDate);
  const newTitle = titleCase(note.title);

  return (
    <>
      <div
        id="#notes"
        className="w-[400px] px-8 py-4 my-6 mx-auto mt-4 text-black  rounded-lg shadow-lg bg-[#FEF9EF]"
        style={{ cursor: "auto" }}
      >
        {!note.title ? (
          <i
            id="#load"
            className="fa-solid opacity-60 flex justify-center align-middle items-center text-[30px] w-full h-full animate-spin fa-xl fa-spinner"
          ></i>
        ) : (
          <div>
            <div className="flex items-center  justify-between">
              {/* {finalDate ? ( */}
              <span className="  text-sm font-bold text-[#adb5bd] font-Montserrat ">
                <i className="fa-solid fa-calendar-days"></i>&nbsp; {finalDate}
              </span>
              {/* ) : (
            <i id="#load" className="fa-solid  fa-xl  fa-spinner"></i>
          )} */}
              {/* {finalTime ? ( */}
              <span className="  text-sm font-bold text-[#adb5bd] font-Montserrat ">
                <i className="fa-regular fa-clock"></i>&nbsp; {finalTime}
              </span>
              {/* ) : (
            <i id="#load" className="fa-solid  fa-xl  fa-spinner"></i>
          )} */}
            </div>
            <div className="my-10 break-words">
              <span className="text-2xl font-bold font-Montserrat text-[#EE6F57]">
                {newTitle}
              </span>
              <div className="mt-2  text-[#73777B]">
                <p>{note.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between align-middle mx-auto mt-6">
              <span className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-[#439A97] rounded font-Montserrat">
                {note.tag}
              </span>
              <div className=" justify-between text-[#495057]  space-x-8">
                <button
                  aria-label="Delete Button"
                  type="button"
                  onClick={() => delNote(note._id, note.title)}
                >
                  <span data-tooltip="Delete" data-flow="top">
                    <i className="fa-regular fa-trash-can hover:text-[23px] fa-lg"></i>
                  </span>
                </button>
                <button
                  aria-label="Edit Button"
                  type="button"
                  onClick={() => updateNote(note)}
                >
                  {/* onClick={updateNote(note)} */}
                  <span data-tooltip="Edit" data-flow="top">
                    <i className="fa-solid fa-pencil hover:text-[23px] fa-lg"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Noteitem;
