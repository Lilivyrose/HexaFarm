import React, { useState } from 'react';
import '../styles/Resources.css';
import BackButton from './common/BackButton';

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState('guides');
    const [currentVideo, setCurrentVideo] = useState(null);

    const resources = {
        guides: [
            {
                id: 1,
                title: "Beginner's Guide to Gardening",
                description: "Essential tips for starting your garden",
                link: "https://www.allthatgrows.in/blogs/posts/gardening-tips-for-beginners?srsltid=AfmBOooGg5YyzlLUHGyEFQH3i04wQoZ_YmsPwJ1WuIuBG_uOoYujn1ut",
                icon: "🌱"
            },
            {
                id: 2,
                title: "Seasonal Planting Calendar",
                description: "When to plant what in your region",
                link: "https://www.greensofkerala.com/blog/vegetable-farming/seasonal-calendar-for-planting-vegetables-in-kerala/",
                icon: "📅"
            },
        ],
        tutorials: [
            {
                id: 1,
                title: "How to start a small farm",
                description: "A step by step guide",
                videoId: "heTxEsrPVdQ",
                duration: "18 mins",
                icon: "🎥"
            },
            {
                id: 2,
                title: "Organic Pest Control",
                description: "Natural ways to protect your plants",
                videoId: "bWyB3gVirXQ",
                duration: "14 mins",
                icon: "🐞"
            },
        ],
        tools: [
            {
                id: 1,
                title: "Soil pH & Adjustment Calculator",
                description: "Calculate your soil's pH level",
                link: "https://plantcalculators.com/gardening-landscaping/soil-ph/",
                icon: "🧮"
            },
        ]
    };

    const openVideo = (videoId) => {
        setCurrentVideo(videoId);
    };

    const closeVideo = () => {
        setCurrentVideo(null);
    };

    return (
        <div className="resources-container">
            <BackButton />
            <div className="resources-header">
                <h1>Gardening Resources</h1>
                <p>Everything you need to grow successfully</p>
            </div>

            <div className="category-tabs">
                <button 
                    className={activeCategory === 'guides' ? 'active' : ''}
                    onClick={() => setActiveCategory('guides')}
                >
                    Guides
                </button>
                <button 
                    className={activeCategory === 'tutorials' ? 'active' : ''}
                    onClick={() => setActiveCategory('tutorials')}
                >
                    Tutorials
                </button>
                <button 
                    className={activeCategory === 'tools' ? 'active' : ''}
                    onClick={() => setActiveCategory('tools')}
                >
                    Tools
                </button>
            </div>

            {currentVideo && (
                <div className="video-modal">
                    <div className="video-modal-content">
                        <button className="close-button" onClick={closeVideo}>×</button>
                        <div className="video-container">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="resources-grid">
                {resources[activeCategory].map(item => (
                    <div key={item.id} className="resource-card">
                        <div className="resource-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.videoId && (
                            <>
                                <span className="duration-badge">Duration: {item.duration}</span>
                                <button 
                                    className="resource-button"
                                    onClick={() => openVideo(item.videoId)}
                                >
                                    Watch Now
                                </button>
                            </>
                        )}
                        {item.link && (
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="resource-button"
                            >
                                Learn More
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;