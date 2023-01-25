import React, { useMemo } from "react";
import {
  faHandsHoldingChild,
  faUserDoctor,
  faBowlFood,
  faUnlockKeyhole,
  faHandHolding,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Services() {
  const services = useMemo(() => {
    return [
      {
        title: "Insurance",
        icon: faHandsHoldingChild,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veniam facilis vero. Pariatur iusto id a vitae non numquam molestiae architecto fugit, explicabo repellendus. Facere vel possimus reprehenderit a magni!",
        color: "text-orange-600",
      },
      {
        title: "Medical Care",
        icon: faUserDoctor,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veniam facilis vero. Pariatur iusto id a vitae non numquam molestiae architecto fugit, explicabo repellendus. Facere vel possimus reprehenderit a magni!",
        color: "text-green-700",
      },
      {
        title: "Meals included",
        icon: faBowlFood,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veniam facilis vero. Pariatur iusto id a vitae non numquam molestiae architecto fugit, explicabo repellendus. Facere vel possimus reprehenderit a magni!",
        color: "text-yellow-400",
      },
      {
        title: "Accessibility",
        icon: faUnlockKeyhole,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veniam facilis vero. Pariatur iusto id a vitae non numquam molestiae architecto fugit, explicabo repellendus. Facere vel possimus reprehenderit a magni!",
        color: "text-[#028090]",
      },
      {
        title: "Customer Care",
        icon: faHandHolding,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veniam facilis vero. Pariatur iusto id a vitae non numquam molestiae architecto fugit, explicabo repellendus. Facere vel possimus reprehenderit a magni!",
        color: "text-[#006C94]",
      },
      {
        title: "Shuttle Included",
        icon: faVanShuttle,
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veniam facilis vero. Pariatur iusto id a vitae non numquam molestiae architecto fugit, explicabo repellendus. Facere vel possimus reprehenderit a magni!",
        color: "text-[#A65972]",
      },
    ];
  }, []);
  return (
    <section className="font-rest mb-24">
      <div className="max-w-7xl mx-auto text-center bg-gray-400 text-white p-10">
        <h3 className="text-sm">MULTIPLE BENEFITS INCLUDED</h3>
        <div className="flex text-2xl  relative flex-col w-max mx-auto">
          <h2 className="font-bold z-10 text-4xl ">OUR SERVICES</h2>
          <div className="h-2 w-32 bg-orange-600 self-end  rounded-lg -mt-2 mb-10"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            return (
              <div key={i} className="flex gap-4">
                <div className="w-32 h-32">
                  <FontAwesomeIcon icon={service.icon}></FontAwesomeIcon>
                </div>
                <div className="text-left">
                  <h3 className={`text-xl font-bold ${service.color}`}>
                    {service.title}
                  </h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
