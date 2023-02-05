import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "@/hooks/useHttp";
import { orderActions } from "@/store/store";
import { useRouter } from "next/router";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { sendRequest, error, clearError, isLoading } = useHttp();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClose = () => props.setOpen(false);
  const order = useSelector((state) => state.order);
  const startingDay = new Date(order.firstDate).toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const endingDay = new Date(order.secondDate).toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [price, setPrice] = useState(props.price);
  const [success, setSuccess] = useState(false);
  const createReservation = async () => {
    if (!props.user) {
      router.push("/signin");
      return;
    }
    const data = {
      startingDate: order.firstDate,
      endingDate: order.secondDate,
      price,
      trip: props.location._id,
    };
    try {
      await sendRequest(
        "post",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
        data
      );
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFirstDateChange = (newValue) => {
    dispatch(orderActions.setFirstDate(newValue));
  };
  const handleSecondDateChange = (newValue) => {
    dispatch(orderActions.setSecondDate(newValue));
  };

  useEffect(() => {
    if (order.secondDate - order.firstDate > 0) {
      setPrice(
        Math.ceil(
          ((order.secondDate - order.firstDate) / 24 / 60 / 60 / 1000) *
            props.price
        )
      );
    } else {
      setPrice(0);
    }
  }, [order.secondDate, order.firstDate]);
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="bg-black bg-opacity-60"
      >
        <Box
          sx={style}
          className="font-rest max-w-6xl px-20 py-6 w-full md:w-max"
        >
          <div className="flex justify-between w-full gap-4 items-center bg-white py-4 px-4 flex-col md:flex-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack className="" spacing={3}>
                <DesktopDatePicker
                  minDate={order.defaultValue}
                  className="bg-white "
                  inputFormat="MM/DD/YYYY"
                  label="Starting date"
                  value={order.firstDate}
                  onChange={handleFirstDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <LocalizationProvider className="item" dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  minDate={order.defaultValue + 24 * 60 * 60 * 1000}
                  className="bg-white "
                  inputFormat="MM/DD/YYYY"
                  label="Return date"
                  value={order.secondDate}
                  onChange={handleSecondDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            <div className="item flex flex-col items-center justify-center text-xl font-bol text-gray-400">
              <p>Price: </p>
              <p>{price}$</p>
            </div>
          </div>
          <h2 className="text-gray-400 font-bold text-2xl text-center mb-4">
            Your reservation
          </h2>

          <div className="flex justify-between gap-8 text-center flex-col lg:flex-row mb-6">
            <div className="flex flex-col text-gray-400">
              <span className="font-bold">Location</span>
              <span>{props.location.title}</span>
            </div>
            <div className="flex flex-col text-gray-400">
              <span className="font-bold">Starting day</span>
              <span>{startingDay}</span>
            </div>
            <div className="flex flex-col text-gray-400">
              <span className="font-bold">Return day</span>
              <span>{endingDay}</span>
            </div>
            <div className="flex flex-col text-gray-400">
              <span className="font-bold">Price</span>
              <span>{price}$</span>
            </div>
          </div>

          <div className="flex justify-center gap-2 text-gray-400 mb-4 flex-col lg:flex-row">
            <button
              onClick={handleClose}
              className="text-center item bg-red-400 text-white py-2"
            >
              Cancel
            </button>
            <button
              onClick={createReservation}
              className="text-center item bg-green-500 text-white py-2"
            >
              {isLoading ? <span class="loader"></span> : "Confirm reservation"}
            </button>
          </div>
          {success && (
            <span className="font-bold text-green-500 text-xl block text-center">
              Your made a reservation successfully!
            </span>
          )}
        </Box>
      </Modal>
    </div>
  );
}
