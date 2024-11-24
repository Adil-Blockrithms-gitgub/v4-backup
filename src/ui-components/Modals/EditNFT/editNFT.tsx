"use client";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCalculateFeeForActiveMultiplier,
  usePayFee,
} from "@/hooks/useEclipseNFT";
import { formatDecimals } from "@/utils/common";
import { setNFTDetailRefetch } from "@/redux/features/refetchSlice";
import { useAppDispatch } from "@/redux/hooks";
import { showToast, ToastSeverity } from "@/redux/features/toastSlice";

interface EditNFTProps {
  handleClose: () => void;
  open: boolean;
  currentNumber: number;
  setUpdatedDate: (value: number | Date) => void;
  setCurrentMonth: (value: number) => void;
  currentDate: Date | null;
  tokenId: string;
  unixDueDate: number;
}

const modalStyle = {
  position: "absolute",
  bottom: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "506px", xs: "100%" },
  bgcolor: "#1A1A1A",
  p: 3,
  borderRadius: 3,
};
const validationSchema = Yup.object({
  numberOfMonths: Yup.number()
    .min(1, "Number of months cannot be less than 1")
    .max(12, "Number of months cannot be greater than 12")
    .required("Number of months is required"),
});

const EditNFT: FC<EditNFTProps> = ({
  handleClose,
  open,
  setUpdatedDate,
  currentNumber,
  setCurrentMonth,
  currentDate,
  tokenId,
  // unixDueDate,
}) => {
  const [value, setValue] = useState<string | number>(1);
  const [DateCal, setDateCal] = useState<string>("");
  const dispatch = useAppDispatch();

  //TODO: Commented hook usage
  const {
    data: calculatedFee,
    refetch: refetchCalculatedFee,
    isFetching: fetchingCalculatedFee,
  } = useCalculateFeeForActiveMultiplier(Number(tokenId), Number(value));

  const { mutationAsyncFun: mutationAsync, isPending } = usePayFee();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      numberOfMonths: currentNumber || 1, // Initial value for the input field
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!currentDate || !calculatedFee) {
          throw new Error("Missing Props");
        }
        const fee = BigInt(calculatedFee?.toString() || "0");
        // const per = ((fee as bigint) * BigInt(80)) / BigInt(100);
        console.log("🚀 ~ onSubmit: ~ fee:", fee);
        // const total = (fee as bigint) + per;
        try {
          await mutationAsync(
            [Number(tokenId), 0, Number(value)],
            fee as bigint
          );
          // Calculate the number of days based on the input months
          const daysToAdd = Number(values.numberOfMonths) * 30;
          // Add the calculated days to the current date
          const updatedDate = new Date();
          updatedDate.setDate(currentDate.getDate() + daysToAdd);
          setCurrentMonth(Number(values.numberOfMonths));
          setUpdatedDate(updatedDate);
          dispatch(setNFTDetailRefetch());
          dispatch(
            showToast({
              message: "Transaction performed successfully",
              severity: ToastSeverity.SUCCESS,
            })
          );
        } catch (err) {
          dispatch(
            showToast({
              message: "An error occurred",
              severity: ToastSeverity.ERROR,
            })
          );
        }

        handleClose();
      } catch (err) {
        console.log(err, "error");
      }
    },
  });

  useEffect(() => {
    if (value && currentDate) {
      // Calculate the number of days based on the input months
      const daysToAdd = Number(value) * 30;
      // Add the calculated days to the current date
      const updatedDate = new Date();
      updatedDate.setDate(currentDate.getDate() + daysToAdd);
      setDateCal(updatedDate.toLocaleDateString());
      // const currentTime = Date.now() * 1000;
      // const timeElapsed = currentTime - unixDueDate;
      // const remainingTime =
      //   (value as number) - (timeElapsed % (value as number));
      // const decayTime = currentTime + remainingTime;
      // const decayDate = new Date(decayTime);
      // setDateCal(decayDate.toLocaleDateString());
    }
  }, [value, currentDate]);

  useEffect(() => {
    refetchCalculatedFee();
  }, [value, refetchCalculatedFee]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Extend Subscription
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box mt={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography mb={0.5}>Fee to Pay: </Typography>
              <Typography>
                {formatDecimals((calculatedFee as bigint) ?? BigInt(0))}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography mb={0.5}>Number of Months</Typography>
              <Typography>{DateCal}</Typography>
            </Box>

            <TextField
              size="small"
              id="numberOfMonths"
              name="numberOfMonths"
              fullWidth
              type="number" // Ensures that input is numeric
              value={formik.values.numberOfMonths}
              onChange={(e) => {
                formik.handleChange(e);
                setValue(e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numberOfMonths &&
                Boolean(formik.errors.numberOfMonths)
              }
              helperText={
                formik.touched.numberOfMonths && formik.errors.numberOfMonths
              }
            />
          </Box>

          <Box mt={2}>
            <Button
              disabled={fetchingCalculatedFee || isPending}
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditNFT;
