import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Image from "next/image";
const Review = (props) => {
  const value = props.rating;

  return (
    <div className=" h-full border border-[#84a98c] p-6 flex flex-col gap-2 justify-between items-left mr-2 mb-1">
      <div className="flex  justify-left text-[#84a98c]">
        <FormatQuoteIcon className="h-10 w-10 align-self-start "></FormatQuoteIcon>
        <p className="mt-6 text-sm">{props.text}</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 rounded-full  overflow-hidden">
          <Image
            width={100}
            height={100}
            className="w-full object-cover"
            src={props.image}
          ></Image>
        </div>
        <div className="flex  flex-col">
          <h3 className="italic text-[#84a98c]">{props.username}</h3>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating name="read-only" value={value} readOnly />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Review;
