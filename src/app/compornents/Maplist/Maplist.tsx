import "./Maplist.css";
import React from "react";
import Link from "next/link";
import { Tag } from "app/types/type";
import { Home } from "@mui/icons-material";

type MaplistProps = {
  getTagId: Tag[];
};

const Maplist: React.FC<MaplistProps> = ({ getTagId }) => {
  const categoryTag: string = getTagId[0]?.tag;

  return (
    <div className="mb-4 pl-14 text-sm justify-center" id="container">
      <Link href="/">
        {" "}
        <Home sx={{ fontSize: 14 }} className="mr-1" />
        ホーム {`>`}{" "}
      </Link>
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
