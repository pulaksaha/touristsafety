import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    photo: null,
    documentType: '',
    documentNumber: '',
    documentFile: null,
    registrationPoint: '',
    checkInDate: '',
    checkOutDate: '',
    emergencyContacts: [{ name: '', phone: '', relationship: '', location: '', date: '', activity: '' }],
  });
  const [errors, setErrors] = useState({});

  const steps = [
    "Personal Information",
    "Document Verification",
    "Travel Information",
    "Emergency Contacts"
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({...formData, [name]: files[0] });
    } else {
      setFormData({...formData, [name]: value });
    }
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const handleEmergencyChange = (index, e) => {
    const { name, value } = e.target;
    const newContacts = [...formData.emergencyContacts];
    newContacts[index][name] = value;
    setFormData({ ...formData, emergencyContacts: newContacts });
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, { name: '', phone: '', relationship: '', location: '', date: '', activity: '' }]
    });
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
        isValid = false;
      }
      if (!formData.nationality.trim()) {
        newErrors.nationality = 'Nationality is required';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.documentType) {
        newErrors.documentType = 'Document type is required';
        isValid = false;
      }
      if (!formData.documentNumber.trim()) {
        newErrors.documentNumber = 'Document number is required';
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.registrationPoint.trim()) {
        newErrors.registrationPoint = 'Registration point is required';
        isValid = false;
      }
      if (!formData.checkInDate) {
        newErrors.checkInDate = 'Check-in date is required';
        isValid = false;
      }
      if (!formData.checkOutDate) {
        newErrors.checkOutDate = 'Check-out date is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Simulate successful submission
      alert('Registration successful!');
      navigate('/digital-id', { state: { fullName: formData.fullName } });
    }
  };

  // Render the current step title with bold styling
  const renderStepTitle = () => {
    return (
      <h3 style={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: '24px',
        color: '#2196F3',
        margin: '30px 0 20px 0',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        {steps[currentStep - 1]}
      </h3>
    );
  };

  // Render only the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ 
            padding: '25px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-in-out',
            margin: '20px 0'
          }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Full Name:
              </label>
              <input
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.fullName ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.fullName && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.fullName}</div>}
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Email Address:
              </label>
              <input
                placeholder="Enter your email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.email ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.email && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.email}</div>}
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Phone Number:
              </label>
              <input
                placeholder="Enter your phone number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.phoneNumber ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.phoneNumber && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.phoneNumber}</div>}
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Nationality:
              </label>
              <input
                placeholder="Enter your nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.nationality ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.nationality && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.nationality}</div>}
            </div>
            
            <div style={{ marginBottom: 10 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Upload Your Photo:
              </label>
              <input 
                type="file" 
                name="photo" 
                onChange={handleChange} 
                style={{ 
                  width: "100%",
                  padding: 12,
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ 
            padding: '25px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-in-out',
            margin: '20px 0'
          }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Document Type:
              </label>
              <select 
                name="documentType" 
                value={formData.documentType} 
                onChange={handleChange} 
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.documentType ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              >
                <option value="">Select Document</option>
                <option value="passport">Passport</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="license">Driver's License</option>
              </select>
              {errors.documentType && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.documentType}</div>}
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Document Number:
              </label>
              <input
                placeholder="Enter your document number"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.documentNumber ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.documentNumber && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.documentNumber}</div>}
            </div>
            
            <div style={{ marginBottom: 10 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Upload Document:
              </label>
              <input 
                type="file" 
                name="documentFile" 
                onChange={handleChange} 
                style={{ 
                  width: "100%",
                  padding: 12,
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ 
            padding: '25px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-in-out',
            margin: '20px 0'
          }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Registration Point:
              </label>
              <input
                placeholder="Enter registration point"
                name="registrationPoint"
                value={formData.registrationPoint}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.registrationPoint ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.registrationPoint && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.registrationPoint}</div>}
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Check-in Date:
              </label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.checkInDate ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.checkInDate && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.checkInDate}</div>}
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: 8, 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Check-out Date:
              </label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: 12, 
                  borderRadius: 5,
                  border: errors.checkOutDate ? '2px solid red' : '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              {errors.checkOutDate && <div style={{ color: 'red', fontSize: 14, marginTop: 5 }}>{errors.checkOutDate}</div>}
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ 
            padding: '25px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease-in-out',
            margin: '20px 0'
          }}>
            {formData.emergencyContacts.map((contact, index) => (
              <div key={index} style={{ 
                marginBottom: 25, 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: '1px solid #eee'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0',
                  fontWeight: 'bold',
                  color: '#333',
                  borderBottom: '2px solid #2196F3',
                  paddingBottom: '8px'
                }}>
                  Contact {index + 1}
                </h4>
                
                <div style={{ marginBottom: 15 }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: 5, 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Name:
                  </label>
                  <input
                    placeholder="Contact name"
                    name="name"
                    value={contact.name}
                    onChange={(e) => handleEmergencyChange(index, e)}
                    style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: 15 }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: 5, 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Phone:
                  </label>
                  <input
                    placeholder="Contact phone"
                    name="phone"
                    value={contact.phone}
                    onChange={(e) => handleEmergencyChange(index, e)}
                    style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: 15 }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: 5, 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Relationship:
                  </label>
                  <input
                    placeholder="Relationship"
                    name="relationship"
                    value={contact.relationship}
                    onChange={(e) => handleEmergencyChange(index, e)}
                    style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: 15 }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: 5, 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Location:
                  </label>
                  <input
                    placeholder="Location"
                    name="location"
                    value={contact.location}
                    onChange={(e) => handleEmergencyChange(index, e)}
                    style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: 15 }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: 5, 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Date:
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={contact.date}
                    onChange={(e) => handleEmergencyChange(index, e)}
                    style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: 5 }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: 5, 
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Activity:
                  </label>
                  <input
                    placeholder="Activity"
                    name="activity"
                    value={contact.activity}
                    onChange={(e) => handleEmergencyChange(index, e)}
                    style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                  />
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={addEmergencyContact} 
              style={{ 
                padding: "10px 15px", 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                borderRadius: 5,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              + Add Contact
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Render navigation buttons
  const renderNavButtons = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
        {currentStep > 1 && (
          <button 
            type="button" 
            onClick={prevStep}
            style={{ 
              padding: "12px 25px", 
              backgroundColor: '#607D8B', 
              color: 'white', 
              border: 'none', 
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Previous
          </button>
        )}
        <div style={{ flex: 1 }}></div>
        {currentStep < steps.length ? (
          <button 
            type="button" 
            onClick={nextStep}
            style={{ 
              padding: "12px 25px", 
              backgroundColor: '#2196F3', 
              color: 'white', 
              border: 'none', 
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Next
          </button>
        ) : (
          <button 
            type="submit"
            style={{ 
              padding: "12px 25px", 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Submit
          </button>
        )}
      </div>
    );
  };

  // Add CSS for animations
  const styleTag = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <style>{styleTag}</style>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#333', 
        marginBottom: 10,
        fontSize: '28px',
        fontWeight: 'bold'
      }}>
        Tourist Registration
      </h2>
      
      {/* Step indicator */}
      <div style={{ 
        textAlign: 'center', 
        color: '#666', 
        marginBottom: 20,
        fontSize: '14px'
      }}>
        Step {currentStep} of {steps.length}
      </div>
      
      {/* Current step title */}
      {renderStepTitle()}
      
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        {renderNavButtons()}
      </form>
    </div>
  );
};

export default Registration;