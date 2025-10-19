import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const Home = () => {
  const [splineError, setSplineError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to show fallback if Spline doesn't load
    const timer = setTimeout(() => {
      if (isLoading) {
        setSplineError(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  const handleSplineError = () => {
    setSplineError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Spline Component with Error Handling */}
      {!splineError && (
        <div className="w-full h-full">
          <Spline 
            scene="https://prod.spline.design/7YzfjB9O897ToXou/scene.splinecode"
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        </div>
      )}

      {/* Fallback Background */}
      {splineError && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && !splineError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 pointer-events-none">
        <h1
          className="text-5xl md:text-9xl font-heading font-bold tracking-wide 
                     bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        >
          FlowHub
        </h1>

        <p className="font-body text-lg md:text-2xl text-amber-100/90 mt-4 max-w-2xl leading-relaxed">
          Visual AI Pipeline Builder for Modern Workflows
        </p>

        {/* Bullet Points */}
        <div className="mt-6 space-y-2 text-sm md:text-base text-white font-body">
          <p>• Connect AI models, data sources, and APIs</p>
          <p>• Transform and orchestrate data with visual nodes</p>
          <p>• Automate complex business processes</p>
          <p>• Deploy workflows with one click</p>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
           <Link
             to="/home"
             className="font-button uppercase font-semibold tracking-wider 
                        px-10 py-4 rounded-full 
                        bg-gradient-to-r from-blue-600 to-purple-600 
                        hover:from-blue-700 hover:to-purple-700 
                        text-amber-200 shadow-lg hover:shadow-xl 
                        transition-all duration-500 transform hover:scale-110
                        border border-white/10 backdrop-blur-sm pointer-events-auto
                        group relative overflow-hidden"
           >
            <span className="group-hover:opacity-0 group-hover:-translate-x-4 transition-all duration-500 ease-in-out">
              Build Your First Flow →
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500 ease-in-out">
              Start Building Pipeline →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
