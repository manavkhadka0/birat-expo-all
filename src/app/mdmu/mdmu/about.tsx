import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 relative inline-block">
              About
              <div className="relative mt-4">
                <Image
                  src="/Rectangle.svg"
                  alt="decorative underline"
                  width={300}
                  height={8}
                  className="absolute left-1/2 -translate-x-1/2 transform scale-110"
                />
              </div>
            </h2>
          </div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/logos.png"
                alt="About Section"
                width={400}
                height={400}
                className="rounded-lg  object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  CIM and Morang Marchant Association has jointly initiated a
                  national campaign for the promotion of Domestic Products
                  market.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-semibold text-blue-600">
                    Mero Desh Merai Utpadan
                  </span>{" "}
                  is a neumonic of the campaign and has already been inaugurated
                  by Right Honorable Prime Minister of Nepal K.P. Sharma Oli.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  This milestone event took place during the auspicious
                  installation ceremony of the newly elected executive board of
                  CIM.
                </p>

                <div className="mt-8">
                  <div className="inline-block bg-blue-50 px-6 py-3 rounded-lg border border-blue-100">
                    <p className="text-blue-800 font-medium">
                      A number of impactful programs will be conducted jointly
                      under this campaign.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
