import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AudiencePage() {
    const [conditions, setConditions] = useState([{ field: '', operator: '', value: '' }]);
    const [audienceName, setAudienceName] = useState('');
    const [audienceSize, setAudienceSize] = useState(0);

    // Handle condition changes
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedConditions = [...conditions];
        updatedConditions[index][name] = value; // Update the specific field in the condition
        setConditions(updatedConditions);
    };

    // Add a new condition
    const handleAddCondition = () => {
        setConditions([...conditions, { field: '', operator: '', value: '' }]);
    };

    // Remove a condition
    const handleRemoveCondition = (index) => {
        const updatedConditions = conditions.filter((_, i) => i !== index);
        setConditions(updatedConditions);
    };

    // Calculate audience size based on conditions
    const handleCalculate = async () => {
        try {
            const formattedConditions = conditions.map(
                (condition) => `${condition.field} ${condition.operator} ${condition.value}`
            );

            const payload = {
                name: audienceName,
                conditions: formattedConditions,
            };

            const response = await axios.post(
                'http://localhost:5001/api/campaign-management/audience-segments',
                payload
            );
            setAudienceSize(response.data.segment.
                audienceSize || 0); // Update audience size
        } catch (error) {
            console.error('Error calculating audience size:', error);
            alert('Failed to calculate audience size. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Define Audience Segments</h2>

            {/* Audience Name */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Audience Name"
                    value={audienceName}
                    onChange={(e) => setAudienceName(e.target.value)}
                />
            </div>

            {/* Conditions */}
            {conditions.map((condition, index) => (
                <div key={index} className="row mb-3 align-items-center">
                    {/* Field Dropdown */}
                    <div className="col-md-3">
                        <select
                            name="field"
                            className="form-select"
                            value={condition.field}
                            onChange={(e) => handleChange(e, index)}
                        >
                            <option value="">Select Field</option>
                            <option value="totalSpending">Total Spending</option>
                            <option value="visits">Visits</option>
                            <option value="lastVisit">Last Visit</option>
                        </select>
                    </div>

                    {/* Operator Dropdown */}
                    <div className="col-md-2">
                        <select
                            name="operator"
                            className="form-select"
                            value={condition.operator}
                            onChange={(e) => handleChange(e, index)}
                        >
                            <option value="">Operator</option>
                            <option value=">">Greater Than</option>
                            <option value="<">Less Than</option>
                            <option value=">=">Greater Than or Equal</option>
                            <option value="<=">Less Than or Equal</option>
                            <option value="=">Equal To</option>
                        </select>
                    </div>

                    {/* Value Input */}
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="value"
                            className="form-control"
                            placeholder="Value"
                            value={condition.value}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>

                    {/* Remove Button */}
                    <div className="col-md-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveCondition(index)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            {/* Add and Calculate Buttons */}
            <div className="mb-4">
                <button className="btn btn-primary me-3" onClick={handleAddCondition}>
                    Add Condition
                </button>
                <button className="btn btn-success" onClick={handleCalculate}>
                    Calculate Audience Size
                </button>
            </div>

            {/* Audience Size Display */}
            <h3>Audience Size: {audienceSize}</h3>

            {/* Navigation Links */}
            <div className="mt-4">
                <h4>Go to:</h4>
                <ul>
                    <li><Link to="/campaign">Add Campaign</Link></li>
                    <li><Link to="/campaign-history">Campaign History</Link></li>
                    <li><Link to="/communicationLog">Communication Log</Link></li>
                    <li><Link to="/sendMessage">Send Message</Link></li>

                </ul>
            </div>
        </div>
    );
}

export default AudiencePage;