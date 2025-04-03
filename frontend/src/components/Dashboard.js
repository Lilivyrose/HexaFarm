import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../styles/Dashboard.css';
import { 
    FaRuler, 
    FaSeedling, 
    FaLeaf, 
    FaMicroscope, 
    FaList,
    FaChartLine,
    FaUsers,
    FaBook,
    FaSignOutAlt
} from 'react-icons/fa';
import cropData from '../data/cropData';

// Import icons (you can use any icon library like react-icons)
// Example using react-icons:
// import { FaSeedling, FaLeaf, FaMapMarkerAlt, FaChartBar } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    
    // Array of gardening quotes
    const quotes = [
        "To plant a garden is to believe in tomorrow. - Audrey Hepburn",
        "A garden is a grand teacher. It teaches patience and careful watchfulness. - Gertrude Jekyll",
        "The garden suggests there might be a place where we can meet nature halfway. - Michael Pollan",
        "Gardening is the art that uses flowers and plants as paint, and the soil and sky as canvas. - Elizabeth Murray",
        "A society grows great when old men plant trees whose shade they know they shall never sit in. - Greek Proverb",
        "The greatest service which can be rendered any country is to add a useful plant to its culture. - Thomas Jefferson",
        "Gardens are not made by singing 'Oh, how beautiful,' and sitting in the shade. - Rudyard Kipling",
        "When the world wearies and society fails to satisfy, there is always the garden. - Minnie Aumonier"
    ];

    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    useEffect(() => {
        getUsername();
    }, []);

    const getUsername = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Get user details from your user_details table
                const { data, error } = await supabase
                    .from('user_details')
                    .select('name')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setUsername(data.name);
                }
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/signin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const dashboardItems = [
        {
            title: 'Space Utilization',
            description: 'Analyze and optimize your growing space',
            path: '/space-utilization',
            color: '#2196F3', // Blue
            icon: <FaRuler />
        },
        {
            title: 'Crop Recommendations',
            description: 'Get personalized crop suggestions',
            path: '/crop-recommendations',
            color: '#FF9800', // Orange
            icon: <FaSeedling />
        },
        {
            title: 'Crop Details',
            description: 'Detailed information about various crops',
            path: '/crop-details',
            color: '#8BC34A', // Light Green
            icon: <FaLeaf />
        },
        {
            title: 'Disease Detection',
            description: 'Identify plant diseases through image analysis',
            path: '/disease-detection',
            color: '#FF5722', // Deep Orange
            icon: <FaMicroscope />
        },
        {
            title: 'My Crops',
            description: 'Manage and track your growing plants',
            path: '/mycrops',
            color: '#4CAF50', // Green
            icon: <FaList />
        },
        {
            title: 'Growth Tracking',
            description: 'Monitor your plants progress',
            path: '/growth-tracking',
            color: '#9C27B0', // Purple
            icon: <FaChartLine />
        },
        {
            title: 'Community',
            description: 'Connect with other gardeners',
            path: '/community',
            color: '#E91E63', // Pink
            icon: <FaUsers />
        },
        {
            title: 'Resources',
            description: 'Gardening tips and guides',
            path: '/resources',
            color: '#00BCD4', // Cyan
            icon: <FaBook />
        },
        {
            id: 7,
            title: 'Bug Catcher',
            path: '/bug-catcher',
            icon: '🪲',
            color: '#FF6B6B',  // A fun reddish color
            description: 'Play a fun game catching garden pests! Test your reflexes and protect your virtual garden.'
        },
        {
            title: 'Memory Game',
            description: 'Test your memory with plant cards!',
            path: '/memory-game',
            color: '#FF6B6B',  // A fun reddish color
            icon: '��'
        }
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="welcome-content">
                    <h1>Welcome, {username || 'Gardener'}!</h1>
                    <div className="quote-container">
                        <p className="quote">{randomQuote}</p>
                    </div>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
            
            <div className="dashboard-grid">
                {dashboardItems.map((item, index) => (
                    <div
                        key={index}
                        className="dashboard-item"
                        onClick={() => navigate(item.path)}
                        style={{
                            backgroundColor: item.color + '10',
                            borderColor: item.color
                        }}
                    >
                        <div className="item-icon" style={{ color: item.color }}>
                            {item.icon}
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;