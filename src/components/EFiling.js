import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EFiling = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3 style={{ color: '#4B9CD3', marginBottom: '20px' }}>Personal Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="tel" placeholder="Enter your contact number" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email address" />
            </div>
            <div className="form-group">
              <label>Nationality / ID Proof</label>
              <input type="text" placeholder="Passport, Aadhaar, etc." />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3 style={{ color: '#4B9CD3', marginBottom: '20px' }}>Incident Details</h3>
            <div className="form-group">
              <label>Date & Time of Incident</label>
              <input type="datetime-local" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Enter location manually" style={{ flex: 1 }} />
                <button 
                  style={{ 
                    backgroundColor: '#4B9CD3', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0 15px', 
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Auto-detect
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Type of Incident</label>
              <select>
                <option value="">Select incident type</option>
                <option value="theft">Theft</option>
                <option value="harassment">Harassment</option>
                <option value="accident">Accident</option>
                <option value="fraud">Fraud</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Detailed Description of the Incident</label>
              <textarea rows="4" placeholder="Provide a detailed description of what happened"></textarea>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3 style={{ color: '#4B9CD3', marginBottom: '20px' }}>Reason Behind the FIR</h3>
            <div className="form-group">
              <label>Why are you filing this report?</label>
              <textarea 
                rows="6" 
                placeholder="Clarify circumstances, concerns, or threats that led you to file this report"
              ></textarea>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3 style={{ color: '#4B9CD3', marginBottom: '20px' }}>Supporting Proof</h3>
            <div className="form-group">
              <label>Upload Images / Documents</label>
              <input type="file" multiple />
              <p style={{ fontSize: '0.8rem', color: '#B8C7D9', marginTop: '5px' }}>
                You can upload multiple files (max 5MB each)
              </p>
            </div>
            <div className="form-group">
              <label>Live Camera Capture</label>
              <button 
                style={{ 
                  backgroundColor: '#4B9CD3', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 15px', 
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>📹</span> Capture Photo/Video Evidence
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h3 style={{ color: '#4B9CD3', marginBottom: '20px' }}>Witness Information (Optional)</h3>
            <div className="form-group">
              <label>Names & Contact Details of Witnesses</label>
              <textarea 
                rows="4" 
                placeholder="Enter names and contact details of any witnesses (if available)"
              ></textarea>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step">
            <h3 style={{ color: '#4B9CD3', marginBottom: '20px' }}>Acknowledgment</h3>
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: '15px',
                padding: '15px',
                backgroundColor: 'rgba(75, 156, 211, 0.1)',
                borderRadius: '5px',
                border: '1px solid rgba(75, 156, 211, 0.3)'
              }}>
                <input type="checkbox" id="consent" style={{ marginTop: '5px' }} />
                <label htmlFor="consent" style={{ fontSize: '0.9rem' }}>
                  I hereby declare that the information provided by me is true to the best of my knowledge and belief. 
                  I understand that providing false information may result in legal action. I authorize the concerned 
                  authorities to use this information for investigation purposes.
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Digital Signature</label>
              <div style={{ 
                height: '100px', 
                border: '1px dashed #4B9CD3', 
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#B8C7D9',
                cursor: 'pointer'
              }}>
                Click here to sign
              </div>
            </div>
            <button 
              style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                padding: '12px 20px', 
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '30px',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Submit E-FIR
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      padding: 20, 
      backgroundColor: "#0A1929",
      color: "white",
      minHeight: "100vh"
    }}>
      {/* Header with satellite orbit animation */}
      <div style={{
        position: "relative",
        padding: "30px 20px",
        textAlign: "center",
        marginBottom: "30px",
        overflow: "hidden"
      }}>
        {/* Animated satellite */}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "60px",
          height: "60px",
          animation: "orbit 20s linear infinite"
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="15" fill="#0A1929" stroke="#4B9CD3" strokeWidth="2" />
            <circle cx="30" cy="30" r="5" fill="#4B9CD3" />
            <path d="M30,15 L30,5" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M30,45 L30,55" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M15,30 L5,30" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M45,30 L55,30" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        </div>

        <button 
          onClick={() => navigate('/')}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "none",
            border: "1px solid #4B9CD3",
            color: "#4B9CD3",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(75, 156, 211, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ← Back to Home
        </button>

        <h1 style={{ 
          fontSize: "2.5rem", 
          color: "white",
          marginBottom: "15px",
          textShadow: "0 2px 10px rgba(75, 156, 211, 0.5)"
        }}>E-FIR Filing</h1>
        
        <p style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          color: "#B8C7D9",
          maxWidth: "800px",
          margin: "0 auto 25px"
        }}>
          Your safety is our priority. If you have faced or witnessed any incident during your travel, 
          you can file an E-FIR (Electronic First Information Report) here. Please provide accurate 
          details to help us ensure swift action and maintain safe tourism for everyone.
        </p>
      </div>

      {/* Form Container */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto 50px",
        background: "linear-gradient(135deg, #102040 0%, #0A1929 100%)",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        border: "1px solid #1E3A5F",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Progress Bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          position: "relative",
          zIndex: "1"
        }}>
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
            <div 
              key={step}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: step <= currentStep ? "#4B9CD3" : "transparent",
                border: "2px solid #4B9CD3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: step <= currentStep ? "white" : "#4B9CD3",
                fontWeight: "bold",
                position: "relative",
                zIndex: "2",
                transition: "all 0.3s ease"
              }}
            >
              {step}
            </div>
          ))}
          {/* Progress Line */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "0",
            right: "0",
            height: "2px",
            backgroundColor: "#1E3A5F",
            zIndex: "0",
            transform: "translateY(-50%)"
          }}></div>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "0",
            width: `${(currentStep - 1) / (totalSteps - 1) * 100}%`,
            height: "2px",
            backgroundColor: "#4B9CD3",
            zIndex: "1",
            transform: "translateY(-50%)",
            transition: "width 0.3s ease"
          }}></div>
        </div>

        {/* Form Content */}
        <div style={{ marginBottom: "30px" }}>
          {renderFormStep()}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            style={{
              padding: "10px 20px",
              backgroundColor: currentStep === 1 ? "#1E3A5F" : "transparent",
              color: currentStep === 1 ? "#B8C7D9" : "#4B9CD3",
              border: "1px solid #4B9CD3",
              borderRadius: "5px",
              cursor: currentStep === 1 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Previous
          </button>
          {currentStep < totalSteps && (
            <button 
              onClick={nextStep}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4B9CD3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Security Features Section */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto 50px",
        padding: "0 20px"
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          color: "white",
          textAlign: "center",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}>
          <span style={{
            fontSize: "1.5rem"
          }}>🔐</span> Security & Features
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {[
            { icon: "🔒", text: "All reports are end-to-end encrypted for your privacy" },
            { icon: "📍", text: "Live location sharing option for emergency response" },
            { icon: "👮", text: "Direct connection with nearest tourism police/helpdesk" },
            { icon: "🔍", text: "Instant E-FIR tracking ID for status updates" },
            { icon: "💬", text: "24/7 Helpline Chat Support for assistance" }
          ].map((feature, index) => (
            <div 
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "15px",
                backgroundColor: "rgba(30, 58, 95, 0.5)",
                borderRadius: "8px",
                transition: "all 0.3s ease"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{feature.icon}</span>
              <p style={{ 
                margin: 0, 
                fontSize: "0.9rem",
                color: "#B8C7D9"
              }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for animations and form styling */}
      <style>
        {`
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }
          
          .form-step {
            animation: fadeIn 0.5s ease;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #E0E0E0;
          }
          
          .form-group input[type="text"],
          .form-group input[type="tel"],
          .form-group input[type="email"],
          .form-group input[type="datetime-local"],
          .form-group select,
          .form-group textarea {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #1E3A5F;
            border-radius: 5px;
            background-color: rgba(16, 32, 64, 0.5);
            color: white;
            font-size: 0.9rem;
          }
          
          .form-group input[type="file"] {
            padding: 10px 0;
          }
          
          .form-group select option {
            background-color: #0A1929;
            color: white;
          }
          
          .form-group input:focus,
          .form-group select:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: #4B9CD3;
            box-shadow: 0 0 0 2px rgba(75, 156, 211, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default EFiling;