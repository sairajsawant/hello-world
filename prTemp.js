let paymentRequestTimeout;
function onPayClick() { 
    const failure = () => {
      //In failure method.
      console.log("In failure function");
    }
    const flush = () => {
      console.log("In flush function");
      clearTimeout(paymentRequestTimeout);
    }

    const catchHandler = () => {
      console.log("In catch handler");
      flush();
      failure();
    }

    if (!window.PaymentRequest) {
      // paymentRequest not supported for this browser.
      console.log("Here paymentRequest not supported");
      return failure();
    }

    const success = result => {
        flush();
        if (!result) {
          return failure();
        }
        //In success and result is true.
        console.log("In success and result", result);
    },
    transactionDetails = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
        }
      }
    };

paymentRequestTimeout = setTimeout(() => {
  //In timeout
  console.log("In Timeout function");
  failure();
}, 2500);

const paymentRequest = new PaymentRequest([{
  supportedMethods: "https://mercury.phonepe.com/transact/pay"
}], transactionDetails);

// TODO:: 'BEFORE_CAN_MAKE_PAYMENT'
const hasEnrolledInstrument = typeof paymentRequest.hasEnrolledInstrument === 'function';

if (hasEnrolledInstrument) {
  paymentRequest.hasEnrolledInstrument()
    .then(success)
    .catch(catchHandler);
} else {
  paymentRequest.canMakePayment()
   .then(success)
   .catch(catchHandler);
  }
}