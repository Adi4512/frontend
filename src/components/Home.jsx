import React from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
     
      <Spline scene="https://prod.spline.design/7YzfjB9O897ToXou/scene.splinecode" />

      
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
