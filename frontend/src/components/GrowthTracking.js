import React, { useState, useEffect } from 'react';
import '../styles/GrowthTracking.css';
import BackButton from './common/BackButton';

const GrowthTracking = () => {
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [newEntry, setNewEntry] = useState({
        date: new Date().toISOString().split('T')[0],
        height: '',
        notes: ''
    });

    // Sample data - replace with actual data from your backend
    useEffect(() => {
        setPlants([
            {
                id: 1,
                name: "Tomato Plant",
                startDate: "2024-01-15",
                entries: [
                    { date: "2024-01-15", height: 5, notes: "Seedling sprouted" },
                    { date: "2024-01-30", height: 12, notes: "First true leaves" }
                ]
            },
            // Add more plants
        ]);
    }, []);

    const handleAddEntry = (e) => {
        e.preventDefault();
        if (selectedPlant) {
            const updatedPlants = plants.map(plant => {
                if (plant.id === selectedPlant.id) {
                    return {
                        ...plant,
                        entries: [...plant.entries, {
                            date: newEntry.date,
                            height: parseFloat(newEntry.height),
                            notes: newEntry.notes
                        }]
                    };
                }
                return plant;
            });
            setPlants(updatedPlants);
            setNewEntry({
                date: new Date().toISOString().split('T')[0],
                height: '',
                notes: ''
            });
        }
    };

    return (
        <div className="growth-tracking-container">
            <BackButton />
            <div className="growth-header">
                <h1>Growth Tracking</h1>
                <p>Monitor your plants' progress</p>
            </div>

            <div className="growth-content">
                {/* Plant Selection */}
                <div className="plant-list">
                    <h2>Your Plants</h2>
                    {plants.map(plant => (
                        <div
                            key={plant.id}
                            className={`plant-item ${selectedPlant?.id === plant.id ? 'selected' : ''}`}
                            onClick={() => setSelectedPlant(plant)}
                        >
                            <h3>{plant.name}</h3>
                            <p>Started: {plant.startDate}</p>
                        </div>
                    ))}
                </div>

                {/* Growth Data */}
                {selectedPlant && (
                    <div className="growth-data">
                        <h2>{selectedPlant.name} - Growth History</h2>
                        
                        {/* Add New Entry Form */}
                        <form onSubmit={handleAddEntry} className="new-entry-form">
                            <h3>Add Growth Entry</h3>
                            <div className="form-group">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={newEntry.date}
                                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Height (cm):</label>
                                <input
                                    type="number"
                                    value={newEntry.height}
                                    onChange={(e) => setNewEntry({...newEntry, height: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Notes:</label>
                                <textarea
                                    value={newEntry.notes}
                                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                                />
                            </div>
                            <button type="submit">Add Entry</button>
                        </form>

                        {/* Growth History Table */}
                        <div className="growth-history">
                            <h3>Growth History</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Height (cm)</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPlant.entries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.date}</td>
                                            <td>{entry.height}</td>
                                            <td>{entry.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrowthTracking; 