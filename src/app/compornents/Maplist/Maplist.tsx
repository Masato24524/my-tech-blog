import Link from "next/link";
import "./Maplist.css";
import React from "react";
import { Tag } from "app/libs/client";

type MaplistProps = {
  getTagId: Tag[];
};

const Maplist: React.FC<MaplistProps> = ({ getTagId }) => {
  return (
    <div className="mt-44 pl-12 text-sm" id="container">
      <Link href="/"> 🏠HOME(Blog) {`>`} </Link>
      {getTagId.map((tagId) => (
        <span key={tagId.id}>{tagId.tag}</span>
      ))}
      {` >`}
    </div>
  );
};

export default Maplist;
