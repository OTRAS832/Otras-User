import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import img1 from "../assets/refer&earn.png";
import img2 from "../assets/otr.png";
import img3 from "../assets/gov-job.png";
import img4 from "../assets/admitcard.png";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonColor?: string;
  titleColor?: string;
  textColor?: string;
  align?: "left" | "right" | "center";
}

const slides: Slide[] = [
  {
    image: img1,
    title: "Refer and Earn",
    subtitle:
      "Refer to Your Friends and get one Government Exam Registration for Free",
    description:
      "By Sharing Our Website to Your family to become our family guys to bring the dreams comes true with easy benefits by our services and get the first application for free.",
    buttonText: "Get Started",
    buttonColor:
      "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:opacity-90",
    titleColor: "text-yellow-400",
    textColor: "text-white",
    align: "right",
  },
  {
    image: img2,
    title: "One Time Registration (OTR)",
    subtitle: "Complete Your Government Job Application within Two Minutes",
    description:
      "To achieve your goals, stay consistent, set actionable plans, and get started today with our quick and easy OTR process.",
    buttonText: "Get Started",
    buttonColor: "bg-green-500 hover:bg-green-600 text-white",
    titleColor: "text-green-600",
    textColor: "text-black",
    align: "right",
  },
  {
    image: img3,
    title: "Government Jobs",
    subtitle:
      "Complete Your Government Job Application form within Two Minutes",
    description:
      "Set specific targets, stay adaptable, and start your journey towards success with our simplified registration flow.",
    buttonText: "Get Started",
    buttonColor: "bg-blue-600 hover:bg-blue-700 text-white",
    titleColor: "text-blue-700",
    textColor: "text-black",
    align: "left",
  },
  {
    image: img4,
    title: "Admit Card Delivery",
    subtitle: "Get Your ADMIT CARD delivered within a DAY",
    description:
      "We ensure fast and secure delivery of your exam admit cards, right to your doorstep. Join us and make your process easier.",
    buttonText: "Get Started",
    buttonColor: "bg-green-500 hover:bg-green-600 text-white",
    titleColor: "text-green-600",
    textColor: "text-black",
    align: "right",
  },
];

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[89.5vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-fit transition-all duration-700"
      />

      {/* Overlay Section */}
      <div className="absolute inset-0 flex items-center justify-between bg-black/10 px-6 md:px-20">
        <div
          className={`flex flex-col justify-between h-[70%] max-w-xl ${
            slide.align === "right"
              ? "ml-auto items-end text-right"
              : slide.align === "left"
              ? "items-start text-left"
              : "mx-auto items-center text-center"
          }`}
        >
          {/* Top Section (Title) */}
          <div>
            <h2
              className={`text-4xl md:text-5xl font-extrabold mb-4 ${
                slide.titleColor || "text-white"
              }`}
            >
              {slide.title}
            </h2>
          </div>

          {/* Middle Section (Subtitle + Description) */}
          <div>
            <h3
              className={`text-lg md:text-2xl font-semibold mb-4 ${
                slide.textColor || "text-white"
              }`}
            >
              {slide.subtitle}
            </h3>
            <p
              className={`text-base md:text-lg mb-6 text-justify ${
                slide.textColor || "text-white/90"
              }`}
            >
              {slide.description}
            </p>
          </div>

          {/* Bottom Section (Button) */}
          <div>
            <button
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${slide.buttonColor}`}
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full"
      >
        <FaChevronLeft className="text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full"
      >
        <FaChevronRight className="text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
