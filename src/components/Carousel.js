import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 6;

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current === totalSlides - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setActiveSlide((current) => (current === totalSlides - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveSlide((current) => (current === 0 ? totalSlides - 1 : current - 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  // Slide content
  const slides = [
    {
      title: "Profile",
      description: "Manage your personal information securely with our clean user profile system.",
      icon: "👤",
      color: "#4285F4",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234285F4' opacity='0.2'/%3E%3Ccircle cx='200' cy='120' r='70' fill='%234285F4' opacity='0.7'/%3E%3Ccircle cx='200' cy='110' r='40' fill='white'/%3E%3Crect x='140' y='200' width='120' height='60' rx='10' fill='%234285F4' opacity='0.7'/%3E%3C/svg%3E"
    },
    {
      title: "Route Planning & Geo-fencing",
      description: "Plan your journey with interactive maps and stay within safe boundaries.",
      icon: "🗺️",
      color: "#34A853",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2334A853' opacity='0.2'/%3E%3Cpath d='M100,100 L150,50 L250,150 L300,100 L350,200 L250,250 L150,200 Z' fill='%2334A853' opacity='0.7'/%3E%3Ccircle cx='150' cy='50' r='10' fill='red'/%3E%3Ccircle cx='300' cy='100' r='10' fill='red'/%3E%3Cpath d='M150,50 L300,100' stroke='red' stroke-width='3' stroke-dasharray='5,5'/%3E%3C/svg%3E"
    },
    {
      title: "E-FIR",
      description: "File electronic First Information Reports securely and efficiently.",
      icon: "🛡️",
      color: "#EA4335",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23EA4335' opacity='0.2'/%3E%3Cpath d='M200,50 L300,100 L300,200 L200,250 L100,200 L100,100 Z' fill='%23EA4335' opacity='0.7'/%3E%3Ctext x='200' y='160' font-family='Arial' font-size='40' text-anchor='middle' fill='white'%3EFIR%3C/text%3E%3C/svg%3E"
    },
    {
      title: "IoT Device Connectivity",
      description: "Connect with smart devices for enhanced safety and monitoring.",
      icon: "📱",
      color: "#FBBC05",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FBBC05' opacity='0.2'/%3E%3Crect x='120' y='80' width='60' height='100' rx='10' fill='%23FBBC05' opacity='0.7'/%3E%3Crect x='220' y='100' width='80' height='60' rx='5' fill='%23FBBC05' opacity='0.7'/%3E%3Cpath d='M180,130 L220,130' stroke='%23FBBC05' stroke-width='3'/%3E%3Ccircle cx='150' cy='200' r='20' fill='%23FBBC05' opacity='0.7'/%3E%3Cpath d='M150,180 L150,150' stroke='%23FBBC05' stroke-width='3'/%3E%3Ccircle cx='260' cy='180' r='15' fill='%23FBBC05' opacity='0.7'/%3E%3Cpath d='M260,165 L260,140' stroke='%23FBBC05' stroke-width='3'/%3E%3C/svg%3E"
    },
    {
      title: "Social Connect",
      description: "Stay connected with your community and share your experiences.",
      icon: "👥",
      color: "#673AB7",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23673AB7' opacity='0.2'/%3E%3Ccircle cx='150' cy='100' r='30' fill='%23673AB7' opacity='0.7'/%3E%3Ccircle cx='250' cy='100' r='30' fill='%23673AB7' opacity='0.7'/%3E%3Ccircle cx='200' cy='200' r='30' fill='%23673AB7' opacity='0.7'/%3E%3Cpath d='M150,100 L250,100 L200,200 Z' stroke='%23673AB7' stroke-width='3' fill='none'/%3E%3Ctext x='150' y='105' font-family='Arial' font-size='20' text-anchor='middle' fill='white'%3E👤%3C/text%3E%3Ctext x='250' y='105' font-family='Arial' font-size='20' text-anchor='middle' fill='white'%3E👤%3C/text%3E%3Ctext x='200' y='205' font-family='Arial' font-size='20' text-anchor='middle' fill='white'%3E👤%3C/text%3E%3C/svg%3E"
    },
    {
      title: "Feedback",
      description: "Share your thoughts and help us improve your safety experience.",
      icon: "📝",
      color: "#00BCD4",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2300BCD4' opacity='0.2'/%3E%3Crect x='100' y='80' width='200' height='140' rx='10' fill='%2300BCD4' opacity='0.7'/%3E%3Cline x1='120' y1='120' x2='280' y2='120' stroke='white' stroke-width='3'/%3E%3Cline x1='120' y1='150' x2='280' y2='150' stroke='white' stroke-width='3'/%3E%3Cline x1='120' y1='180' x2='220' y2='180' stroke='white' stroke-width='3'/%3E%3C/svg%3E"
    }
  ];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '400px',
      overflow: 'hidden',
      marginTop: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      {/* Slides */}
      <div style={{ 
        display: 'flex', 
        height: '100%',
        transform: `translateX(-${activeSlide * 100}%)`,
        transition: 'transform 0.5s ease-in-out'
      }}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            style={{ 
              minWidth: '100%', 
              height: '100%',
              backgroundColor: slide.color + '10',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
              position: 'relative'
            }}
          >
            <div style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px'
            }}>
              <div style={{ 
                flex: '1',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '28px', 
                  marginBottom: '15px',
                  color: slide.color,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    fontSize: '32px', 
                    marginRight: '10px',
                    backgroundColor: slide.color,
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {slide.icon}
                  </span>
                  {slide.title}
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.6',
                  color: '#555',
                  textAlign: 'left',
                  marginBottom: '20px'
                }}>
                  {slide.description}
                </p>
                <button style={{ 
                  padding: '10px 20px',
                  backgroundColor: slide.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  Learn More
                </button>
              </div>
              <div style={{ 
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.7)',
          color: '#333',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        &#10094;
      </button>
      <button 
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.7)',
          color: '#333',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === activeSlide ? '12px' : '10px',
              height: index === activeSlide ? '12px' : '10px',
              borderRadius: '50%',
              backgroundColor: index === activeSlide ? slides[index].color : '#ccc',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;