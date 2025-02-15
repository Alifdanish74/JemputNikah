  import FeatureCard from "./FeatureCard"; // Import the reusable FeatureCard component
  import PhoneMockup from "./PhoneMockup";
  import { featureicons } from "./featureicons";
  
  // The main FeaturesSection component
  function FeaturesSection() {
    // Split features into two halves
      // Split the features into two halves: left and right
  const leftFeatures = featureicons.slice(0, 4); // First 4 features
  const rightFeatures = featureicons.slice(4);   // Last 4 features
    
  
    return (
      <section className="bg-blue-50 py-16 px-4">
        {/* Section header */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            8 Fungsi Kad Kahwin Digital
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Kad kahwin digital kami dilengkapi dengan pelbagai fungsi yang menarik
          </p>
        </div>
  
        {/* Features + PhoneMockup container */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Left Features */}
          <div className="w-full md:w-1/3 flex flex-col space-y-6">
          {leftFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              direction="left"
            />
          ))}
          </div>
  
          {/* Phone Mockup in the Center */}
          <div className="w-full md:w-1/3 flex justify-center py-8 md:py-0">
            <PhoneMockup />
          </div>
  
          {/* Right Features */}
          <div className="w-full md:w-1/3 flex flex-col space-y-6">
            {rightFeatures.map((featureicons, index) => (
              <FeatureCard
                key={index}
                icon={featureicons.icon}
                title={featureicons.title}
                description={featureicons.description}
                direction="right" // Pass direction as "right"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default FeaturesSection;
  