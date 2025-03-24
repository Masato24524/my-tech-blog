"use client";

import React, { useEffect, useRef } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export const Slider = () => {
  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current) {
      const splide = new Splide(splideRef.current, {
        // perPage: 2,
        // gap: "1rem",
        // type: "slide",
        // heightRatio: 0.5,
        // pagination: true,
        // arrows: true,
      });
      splide.mount();
    }
  }, []);

  return (
    <div className="flex z-10 absolute top-[170px] mx-4 mb-12">
      <Splide
        options={{
          perPage: 4,
          gap: "2rem",
          type: "slide",
          //   rewind: true,
          loop: true,
          //   heightRatio: 0.5,
          pagination: true,
          arrows: true,

          autoplay: true,
          interval: 2000,

          perMove: 1,
        }}
      >
        <SplideSlide>
          <img
            src="/images/first-view-thumb01.jpg"
            alt="*"
            width="300px"
            height="100px"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/images/first-view-thumb02.jpg"
            alt="*"
            width="300px"
            height="100px"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/images/first-view-thumb03.jpg"
            alt="*"
            width="300px"
            height="100px"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/images/first-view-thumb01.jpg"
            alt="*"
            width="300px"
            height="100px"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/images/first-view-thumb02.jpg"
            alt="*"
            width="300px"
            height="100px"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/images/first-view-thumb03.jpg"
            alt="*"
            width="300px"
            height="100px"
          />
        </SplideSlide>
      </Splide>
      {/* <div className="splide" role="group" aria-label="">
        <div className="splide__track">
          <div className="splide__list">
            <div className="splide__slide">
              <div className="thumb">
                <img
                  src="/images/first-view-thumb01.jpg"
                  alt="*"
                  width="500px"
                  height="500px"
                />
              </div>
            </div>
            <div className="splide__slide"></div>
            <div className="splide__slide">
              <div className="thumb">
                <img
                  src="/images/first-view-thumb03.jpg"
                  alt="*"
                  height="140px"
                  width="100px"
                />
              </div>
            </div>
          </div> */}
      {/* /.splide__list */}
      {/* </div> */}
      {/* /.splide__track */}
      {/* </div> */}
      {/* /.splide */}
    </div>
  );
};
