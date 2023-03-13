import React from 'react';

export function CheckoutWizard({ activeStep = 0 }) {
    return (
        <div className="m-16 flex flex-wrap">
            {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
                (step, index) => (
                    <div
                        key={step}
                        className={`flex-1 border-b-2 text-center 
                            ${
                            index <= activeStep
                                ? 'border-indigo-500   text-indigo-500'
                                : 'border-gray-400 text-gray-400'
                            }
          
                                `}
                    >
                        {step}
                    </div>
                )
            )}
        </div>
    );
}
