import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './common/BackButton';

// First, define the climateDetails object at the top of the file
const climateDetails = {
    "Hot and Humid": {
        characteristics: {
            temperature: "25-35°C",
            humidity: "Above 70%",
            rainfall: "Above 200cm/year",
            soilTypes: ["Laterite", "Red soil", "Alluvial soil"],
            seasons: {
                summer: "March-June (Very hot and humid)",
                monsoon: "June-September (Heavy rainfall)",
                winter: "December-February (Mild)"
            },
            bestCrops: ["Rice", "Coconut", "Rubber", "Tea", "Coffee", "Spices"],
            challenges: [
                "High pest incidence",
                "Fungal diseases",
                "Crop storage issues",
                "Rapid weed growth"
            ],
            farmingTips: [
                "Regular pest monitoring",
                "Good drainage system",
                "Proper spacing between crops",
                "Regular pruning"
            ]
        }
    },
    "Hot and Dry": {
        characteristics: {
            temperature: "25-45°C",
            humidity: "Below 40%",
            rainfall: "Less than 75cm/year",
            soilTypes: ["Sandy", "Desert soil", "Black soil"],
            seasons: {
                summer: "March-June (Extremely hot)",
                monsoon: "July-September (Limited rainfall)",
                winter: "December-February (Moderate)"
            },
            bestCrops: ["Millet", "Sorghum", "Cotton", "Groundnut", "Pulses"],
            challenges: [
                "Water scarcity",
                "Soil erosion",
                "Heat stress",
                "Low soil fertility"
            ],
            farmingTips: [
                "Drip irrigation",
                "Mulching",
                "Drought-resistant varieties",
                "Early morning farming"
            ]
        }
    },
    "Warm and Moderate": {
        characteristics: {
            temperature: "20-30°C",
            humidity: "50-60%",
            rainfall: "100-150cm/year",
            soilTypes: ["Red soil", "Black soil", "Forest soil"],
            seasons: {
                summer: "March-May (Warm)",
                monsoon: "June-September (Moderate rainfall)",
                winter: "November-February (Cool)"
            },
            bestCrops: ["Wheat", "Maize", "Vegetables", "Fruits", "Pulses"],
            challenges: [
                "Seasonal variations",
                "Mixed pest problems",
                "Soil management"
            ],
            farmingTips: [
                "Crop rotation",
                "Integrated pest management",
                "Balanced fertilization",
                "Timely sowing"
            ]
        }
    },
    "Cool and Humid": {
        characteristics: {
            temperature: "15-25°C",
            humidity: "60-70%",
            rainfall: "150-200cm/year",
            soilTypes: ["Mountain soil", "Forest soil", "Peaty soil"],
            seasons: {
                summer: "April-June (Mild)",
                monsoon: "July-September (Heavy rainfall)",
                winter: "October-March (Cold)"
            },
            bestCrops: ["Tea", "Apple", "Potato", "Peas", "Cole crops"],
            challenges: [
                "Frost damage",
                "Soil acidity",
                "Limited growing season",
                "Steep terrain"
            ],
            farmingTips: [
                "Terracing",
                "Frost protection",
                "pH management",
                "Protected cultivation"
            ]
        }
    },
    "Cold and Dry": {
        characteristics: {
            temperature: "Below 15°C",
            humidity: "30-40%",
            rainfall: "50-100cm/year",
            soilTypes: ["Mountain soil", "Sandy loam", "Brown soil"],
            seasons: {
                summer: "May-August (Mild)",
                monsoon: "Limited rainfall",
                winter: "September-April (Very cold)"
            },
            bestCrops: ["Barley", "Buckwheat", "Hardy vegetables", "Medicinal herbs"],
            challenges: [
                "Short growing season",
                "Cold stress",
                "Snow coverage",
                "Limited water availability"
            ],
            farmingTips: [
                "Greenhouse farming",
                "Cold-resistant varieties",
                "Snow harvesting",
                "Wind protection"
            ]
        }
    }
};

// Modified to only contain districts array
const keralaDistricts = [
    { name: "Thiruvananthapuram", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "180cm" },
    { name: "Kollam", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "250cm" },
    { name: "Pathanamthitta", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "300cm" },
    { name: "Alappuzha", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "280cm" },
    { name: "Kottayam", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "310cm" },
    { name: "Idukki", climate: "Cool and Humid", avgTemp: "15-25°C", rainfall: "350cm" },
    { name: "Ernakulam", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "300cm" },
    { name: "Thrissur", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "290cm" },
    { name: "Palakkad", climate: "Hot and Dry", avgTemp: "25-38°C", rainfall: "220cm" },
    { name: "Malappuram", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "280cm" },
    { name: "Kozhikode", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "290cm" },
    { name: "Wayanad", climate: "Cool and Humid", avgTemp: "20-30°C", rainfall: "320cm" },
    { name: "Kannur", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "340cm" },
    { name: "Kasaragod", climate: "Hot and Humid", avgTemp: "25-35°C", rainfall: "330cm" }
];

const CropRecommendations = () => {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle getting current location
    const getCurrentLocation = () => {
        setLoading(true);
        setError(null);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        
                        // Approximate coordinates for Kerala districts
                        const keralaCoordinates = {
                            "Thiruvananthapuram": { lat: 8.5241, lon: 76.9366 },
                            "Kollam": { lat: 8.8932, lon: 76.6141 },
                            "Pathanamthitta": { lat: 9.2647, lon: 76.7872 },
                            "Alappuzha": { lat: 9.4981, lon: 76.3388 },
                            "Kottayam": { lat: 9.5916, lon: 76.5222 },
                            "Idukki": { lat: 9.9189, lon: 77.1025 },
                            "Ernakulam": { lat: 9.9816, lon: 76.2999 },
                            "Thrissur": { lat: 10.5276, lon: 76.2144 },
                            "Palakkad": { lat: 10.7867, lon: 76.6548 },
                            "Malappuram": { lat: 11.0509, lon: 76.0710 },
                            "Kozhikode": { lat: 11.2588, lon: 75.7804 },
                            "Wayanad": { lat: 11.6854, lon: 76.1320 },
                            "Kannur": { lat: 11.8745, lon: 75.3704 },
                            "Kasaragod": { lat: 12.4996, lon: 74.9869 }
                        };

                        // Find nearest district based on coordinates
                        let nearestDistrict = "Thiruvananthapuram"; // default
                        let minDistance = Number.MAX_VALUE;

                        for (const [district, coords] of Object.entries(keralaCoordinates)) {
                            const distance = Math.sqrt(
                                Math.pow(latitude - coords.lat, 2) + 
                                Math.pow(longitude - coords.lon, 2)
                            );
                            if (distance < minDistance) {
                                minDistance = distance;
                                nearestDistrict = district;
                            }
                        }

                        // Find the district data from keralaDistricts array
                        const districtData = keralaDistricts.find(d => d.name === nearestDistrict);

                        if (districtData) {
                            setLocation({
                                state: "Kerala",
                                district: districtData.name,
                                climate: districtData.climate,
                                avgTemp: districtData.avgTemp,
                                rainfall: districtData.rainfall
                            });
                        }
                        
                    } catch (err) {
                        setError("Failed to get location details");
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    setError("Failed to get your location: " + err.message);
                    setLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
        }
    };

    // Define displayDetailedClimate function inside the component
    const displayDetailedClimate = (climate) => {
        const details = climateDetails[climate];
        if (!details) return null;

        return (
            <div className="climate-details" style={{
                padding: '2rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                marginTop: '2rem',
                boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
            }}>
                {/* Climate Overview Section */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <h4 style={{ 
                        color: '#2E7D32', 
                        marginBottom: '1.5rem',
                        fontSize: '1.5rem',
                        borderBottom: '2px solid #2E7D32',
                        paddingBottom: '0.5rem'
                    }}>Climate Characteristics</h4>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div style={{ 
                            padding: '1rem',
                            backgroundColor: '#f1f8e9',
                            borderRadius: '8px'
                        }}>
                            <p><strong>Temperature Range:</strong><br/>{details.characteristics.temperature}</p>
                        </div>
                        <div style={{ 
                            padding: '1rem',
                            backgroundColor: '#f1f8e9',
                            borderRadius: '8px'
                        }}>
                            <p><strong>Humidity:</strong><br/>{details.characteristics.humidity}</p>
                        </div>
                        <div style={{ 
                            padding: '1rem',
                            backgroundColor: '#f1f8e9',
                            borderRadius: '8px'
                        }}>
                            <p><strong>Rainfall:</strong><br/>{details.characteristics.rainfall}</p>
                        </div>
                    </div>
                </div>

                {/* Soil Types Section */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <h5 style={{ 
                        color: '#2E7D32',
                        marginBottom: '1rem',
                        fontSize: '1.2rem'
                    }}>Suitable Soil Types</h5>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        margin: '0 auto'
                    }}>
                        {details.characteristics.soilTypes.map((soil, index) => (
                            <span key={index} style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#f1f8e9',
                                borderRadius: '20px',
                                fontSize: '0.9rem'
                            }}>
                                {soil}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Seasonal Information */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <h5 style={{ 
                        color: '#2E7D32',
                        marginBottom: '1rem',
                        fontSize: '1.2rem'
                    }}>Seasonal Information</h5>
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {Object.entries(details.characteristics.seasons).map(([season, info]) => (
                            <div key={season} style={{
                                padding: '1rem',
                                backgroundColor: '#f1f8e9',
                                borderRadius: '8px'
                            }}>
                                <strong style={{ color: '#2E7D32' }}>{season}:</strong> {info}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Crops Section */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <h5 style={{ 
                        color: '#2E7D32',
                        marginBottom: '1.5rem',
                        fontSize: '1.2rem'
                    }}>Best Crops for this Climate</h5>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem'
                    }}>
                        {details.characteristics.bestCrops.map((crop, index) => (
                            <div key={index} style={{
                                padding: '1.5rem',
                                backgroundColor: '#f1f8e9',
                                borderRadius: '8px',
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                                ':hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <h6 style={{ 
                                    color: '#2E7D32',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.1rem'
                                }}>{crop}</h6>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Challenges and Tips Sections */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                    {/* Challenges Section */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <h5 style={{ 
                            color: '#2E7D32',
                            marginBottom: '1rem',
                            fontSize: '1.2rem'
                        }}>Farming Challenges</h5>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            {details.characteristics.challenges.map((challenge, index) => (
                                <li key={index} style={{
                                    padding: '0.8rem',
                                    backgroundColor: '#f1f8e9',
                                    borderRadius: '8px',
                                    marginBottom: '0.5rem'
                                }}>
                                    {challenge}
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Tips Section */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <h5 style={{ 
                            color: '#2E7D32',
                            marginBottom: '1rem',
                            fontSize: '1.2rem'
                        }}>Farming Tips</h5>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            {details.characteristics.farmingTips.map((tip, index) => (
                                <li key={index} style={{
                                    padding: '0.8rem',
                                    backgroundColor: '#f1f8e9',
                                    borderRadius: '8px',
                                    marginBottom: '0.5rem'
                                }}>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="crop-recommendations-container">
            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    width:'100px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <span>←</span> Back
            </button>

            <h1 style={{ textAlign: 'center', color: '#2E7D32', marginBottom: '2rem' }}>
                Crop Recommendations
            </h1>

            <div style={{ 
                maxWidth: '600px', 
                margin: '0 auto', 
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
            }}>
                <h2 style={{ color: '#2E7D32', marginBottom: '1rem' }}>Choose Location</h2>

                {/* Current Location Button */}
                <button 
                    onClick={getCurrentLocation}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: '#2E7D32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Use Current Location
                </button>

                <div style={{ textAlign: 'center', margin: '1rem 0' }}>OR</div>

                {/* District Selection */}
                <select 
                    value={selectedDistrict}
                    onChange={(e) => {
                        const selectedIndex = e.target.value;
                        setSelectedDistrict(selectedIndex);
                        
                        const districtData = keralaDistricts[selectedIndex];
                        if (districtData) {
                            setLocation({
                                state: "Kerala",
                                district: districtData.name,
                                climate: districtData.climate,
                                avgTemp: districtData.avgTemp,
                                rainfall: districtData.rainfall
                            });
                        }
                    }}
                    style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                        width: '100%'
                    }}
                >
                    <option value="">Select District</option>
                    {keralaDistricts.map((district, index) => (
                        <option key={index} value={index}>{district.name}</option>
                    ))}
                </select>

                {error && (
                    <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
            </div>

            {/* Display location info with increased width - only changing width related properties */}
            {location && !loading && (
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '2rem',
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    maxWidth: '1600px',  // Increased from 600px
                    width: '95%',        // Added to ensure proper scaling
                    margin: '2rem auto'
                }}>
                    <h3 style={{ color: '#2E7D32', marginBottom: '1rem' }}>Selected Location</h3>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <p><strong>District:</strong> {location.district}</p>
                        <p><strong>Climate Type:</strong> {location.climate}</p>
                        <p><strong>Average Temperature:</strong> {location.avgTemp}</p>
                        <p><strong>Annual Rainfall:</strong> {location.rainfall}</p>
                    </div>

                    {/* Display detailed climate information */}
                    {location.climate && displayDetailedClimate(location.climate)}
                </div>
            )}

            {loading && (
                <div style={{ textAlign: 'center', margin: '2rem' }}>
                    Loading...
                </div>
            )}
        </div>
    );
};

export default CropRecommendations;