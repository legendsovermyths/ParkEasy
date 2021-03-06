import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { makeStyles } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://mui.com/'>
        ParkEasy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme();

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [order, setOrder] = React.useState(Math.floor(Math.random() * 1000000));
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return (
          <Review
            id={props.location.state.id}
            time1={props.location.state.time1}
            time2={props.location.state.time2}
            features={props.location.state.features}
            bookedSlot={props.location.state.bookedSlot}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiStepIcon-active .MuiStepIcon-root": { color: "#17375b" },
      "& .Mui-completed .MuiStepIcon-root": { color: "#17375b" },
      //   "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" },
    },
  }));
  const c = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper
            className={c.root}
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant='h5' gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant='subtitle1'>
                  {`Your order number is #${order}. We have recieved your order and
                  Your slot has been booked successfully. Thank you for your
                  order. We lookforward to serving you.`}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button
                      style={{ color: "#17375b" }}
                      onClick={handleBack}
                      sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    style={{ backgroundColor: "#17375b" }}
                    variant='contained'
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
