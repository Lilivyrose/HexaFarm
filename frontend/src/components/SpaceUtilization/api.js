// API functions for space utilization
export const analyzeSpace = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    // Test the connection first
    try {
      const testResponse = await fetch('http://localhost:3001/api/test');
      console.log('Test connection response:', await testResponse.text());
    } catch (error) {
      console.error('Test connection failed:', error);
    }

    console.log('Sending request to:', 'http://localhost:3001/api/space-analysis');
    const response = await fetch('http://localhost:3001/api/space-analysis', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      type: error.name
    });
    throw error;
  }
}; 