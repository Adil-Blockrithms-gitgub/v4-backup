"use client";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useRestoreMultipliers } from '@/hooks/useEclipseNFT';
import { parseEther } from "viem";
import { showToast, ToastSeverity } from "@/redux/features/toastSlice";
import { setNFTDetailRefetch } from "@/redux/features/refetchSlice";
import { useAppDispatch } from "@/redux/hooks";

interface EditNFTProps {
  handleClose: () => void;
  open: boolean;
  tokenId: string;
  decayedMultiplierCount: number;
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
  numberOfMultiplier: Yup.number()
    .min(1, "Number of Multiplier cannot be less than 1")
    .required("Number of Multiplier is required"),
});

const DecayedModal: FC<EditNFTProps> = ({ handleClose, open, tokenId, decayedMultiplierCount }) => {
  //TODO: Commented hook usage
  // const { mutationAsync, isPending } = useRestoreMultipliers();

  const isPending = false;
  const mutationAsync = (arr, val) => {};

  const dispatch = useAppDispatch();
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      numberOfMultiplier: decayedMultiplierCount, // Initial value for the input field
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await mutationAsync([Number(tokenId), values.numberOfMultiplier], parseEther("1"));
        dispatch(setNFTDetailRefetch());
        dispatch(
          showToast({
            message: "Transaction performed successfully",
            severity: ToastSeverity.SUCCESS,
          })
        );
      } catch (err) {
        console.log(err, "error");
        dispatch(
          showToast({
            message: "An error occurred",
            severity: ToastSeverity.ERROR,
          })
        );
      }
      handleClose(); // Close the modal after submission
    },
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Restore Multiplier
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box mt={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography mb={0.5}>Number of Multiplier</Typography>
              {/* <Typography>{DateCal}</Typography> */}
            </Box>

            <TextField
              size="small"
              id="numberOfMultiplier"
              name="numberOfMultiplier"
              fullWidth
              type="number" // Ensures that input is numeric
              value={formik.values.numberOfMultiplier}
              onChange={(e) => {
                formik.handleChange(e);
                // setValue(e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.numberOfMultiplier && Boolean(formik.errors.numberOfMultiplier)}
              helperText={formik.touched.numberOfMultiplier && formik.errors.numberOfMultiplier}
            />
          </Box>

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              disabled={
                formik.values.numberOfMultiplier > decayedMultiplierCount ||
                formik.values.numberOfMultiplier < 1 ||
                isPending
              }
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default DecayedModal;
