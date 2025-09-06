import "./Maplist.css";
import React from "react";
import Link from "next/link";
import { Tag } from "app/types/type";

type MaplistProps = {
  getTagId: Tag[];
};

const Maplist: React.FC<MaplistProps> = ({ getTagId }) => {
  const categoryTag: string = getTagId[0]?.tag;

  return (
    <div className="mb-2 pl-12 text-sm" id="container">
      <Link href="/"> 🏠HOME(Blog) {`>`} </Link>
      {getTagId.map((tagId) => (
        <span key={tagId.id}>
          <Link href={`/category/${categoryTag}`}>{tagId.tag}</Link>
        </span>
      ))}{" "}
      {` >`}
    </div>
  );
};

export default Maplist;
