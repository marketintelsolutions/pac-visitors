import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const plans = [
  {
    name: "Yes",
  },
  {
    name: "No",
  },
];

export default function AppRadioGroup({ onSelect }) {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full p-2">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={selected}
          onChange={(value) => {
            setSelected(value);
            if (value.name == "Yes") {
              onSelect(true);
            }
            if (value.name == "No") {
              onSelect(false);
            }
          }}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
        
                    relative flex cursor-pointer rounded-lg px-5 py-4 border border-gray-200 bg-white focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  text-gray-900`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                        </div>
                      </div>

                      {checked && (
                        <div className="shrink-0 text-gray-900">
                          <CheckIcon className="h-6 w-6 bg-blue-900 rounded-full" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
