import React from "react";
import "./Promotion.css";

const Promotion: React.FC = () => {
  return (
    <div className="flex mt-8">
      <div className="promotion-1 mb-2 mr-2">
        <a
          href="//af.moshimo.com/af/c/click?a_id=4954893&p_id=5256&pc_id=14256&pl_id=68935"
          rel="nofollow"
          referrerPolicy="no-referrer-when-downgrade"
        >
          <img
            src="//image.moshimo.com/af-img/4162/000000068935.png"
            width="120"
            height="60"
            style={{ border: "none" }}
          />
        </a>
        <img
          src="//i.moshimo.com/af/i/impression?a_id=4954893&p_id=5256&pc_id=14256&pl_id=68935"
          width="1"
          height="1"
          style={{ border: "none" }}
          loading="lazy"
        ></img>
      </div>

      <div className="promotion-2">
        {" "}
        <a
          href="//af.moshimo.com/af/c/click?a_id=4954893&p_id=5256&pc_id=14256&pl_id=68938"
          rel="nofollow"
          referrerPolicy="no-referrer-when-downgrade"
        >
          <img
            src="//image.moshimo.com/af-img/4162/000000068938.png"
            width="120"
            height="60"
            style={{ border: "none" }}
          />
        </a>
        <img
          src="//i.moshimo.com/af/i/impression?a_id=4954893&p_id=5256&pc_id=14256&pl_id=68938"
          width="1"
          height="1"
          style={{ border: "none" }}
          loading="lazy"
        ></img>
      </div>
    </div>
  );
};

export default Promotion;
