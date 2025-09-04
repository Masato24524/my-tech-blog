import React from "react";
import "./Promotion.css";

const Promotion: React.FC = () => {
  return (
    <div className="grid grid-rows-2 mt-8">
      <div className="mb-8 order-1">
        <a
          href="//af.moshimo.com/af/c/click?a_id=5125160&p_id=1024&pc_id=1450&pl_id=54105"
          rel="nofollow"
          referrerPolicy="no-referrer-when-downgrade"
        >
          <img
            src="//image.moshimo.com/af-img/0330/000000054105.png"
            width="300"
            height="250"
            style={{ border: "none" }}
          />
        </a>
        <img
          src="//i.moshimo.com/af/i/impression?a_id=5125160&p_id=1024&pc_id=1450&pl_id=54105"
          width="1"
          height="1"
          style={{ border: "none" }}
          loading="lazy"
        />
      </div>
      <div className="flex order-2">
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

        <div className="promotion-2 order-3">
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
    </div>
  );
};

export default Promotion;
