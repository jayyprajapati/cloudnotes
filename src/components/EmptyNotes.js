import React from "react";
import addFirstNote from "../addFirstNote.gif";
function EmptyNotes() {
  return (
    <>
      <div className="flex justify-center w-full max-h-96">
        <img src={addFirstNote} className="object-contain" alt="" />
      </div>
    </>
  );
}

export default EmptyNotes;
