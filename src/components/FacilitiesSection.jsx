// src/components/FacilitiesSection.jsx
import React from "react";
import {
  Snowflake, Wifi, Shield, Wrench, Droplet, WashingMachine
} from "lucide-react";

const FACILITIES = [
  { Icon: Snowflake,      label: "AC & Non AC\nRooms" },
  { Icon: Wifi,           label: "24/7\nWiFi" },
  { Icon: WashingMachine, label: "Washing\nMachine" },
  { Icon: Shield,         label: "Safe &\nSecure" },
  { Icon: Wrench,         label: "Maintenance\nSupport" },
  { Icon: Droplet,        label: "24/7\nWater Supply" },
];

function FacilitiesSection() {
  return (
    <section className="bg-[#0D1117] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-lg md:text-xl font-extrabold tracking-wide mb-1">
          FACILITIES THAT MAKE A DIFFERENCE
        </h2>
        <div className="h-0.5 w-10 bg-yellow-500 mb-8" />

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {FACILITIES.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="bg-[#141820] border border-[#252B38] rounded-xl p-4 md:p-5
                         flex flex-col items-center justify-center text-center gap-2.5
                         hover:border-yellow-500/30 hover:bg-[#1A1F2B] transition-all duration-300"
            >
              <Icon
                className="w-6 h-6 md:w-7 md:h-7 text-gray-200"
                strokeWidth={1.6}
              />
              <p className="text-gray-300 text-[10px] md:text-xs font-medium whitespace-pre-line leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FacilitiesSection;
