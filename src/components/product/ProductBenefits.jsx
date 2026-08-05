import {
  faShieldAlt,
  faBolt,
  faMobileAlt,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconMap = {
  shield: faShieldAlt,
  lightning: faBolt,
  mobile: faMobileAlt,
  focus: faBullseye,
};

export default function ProductBenefits({ benefits = [] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-4 pr-20">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <FontAwesomeIcon
              icon={iconMap[benefit.icon]}
              className="text-black text-xs"
            />
          </div>

          <p className="text-[12px] font-semibold text-gray-700 leading-tight tracking-[-0.2px]">
            {benefit.text}
          </p>
        </div>
      ))}
    </div>
  );
}
