import React from "react";

function PageHeading(props) {
  return (
    <div className="mb-5 text-[#c29824]">
      <h1 className="text-4xl font-bold">{props.title}</h1>
    </div>
  );
}

export default PageHeading;
