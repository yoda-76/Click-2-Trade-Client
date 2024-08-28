// import React from 'react'
// import cashfree from '../lib/cashfree'
// export default function Pay() {
//     const handelPayment = async () => {
//         let checkoutOptions = {
//             paymentSessionId: "payment-session-id",
//             returnUrl: "https://test.cashfree.com/pgappsdemos/v3success.php?myorder={order_id}",
            
//         }
//         cashfree.checkout(checkoutOptions).then(function(result){
//             if(result.error){
//                 alert(result.error.message)
//             }
//             if(result.redirect){
//                 console.log("Redirection")
//             }
//         });
//     }
//   return (
//     <div>Pay</div>
//   )
// }
