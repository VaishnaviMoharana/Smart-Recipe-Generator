import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function IngredientInput({ onSubmit }) {
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = 'YOUR_CLARIFAI_API_KEY';  // Replace with your actual API key

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const ingredientsList = textInput.split(',').map(item => item.trim());
    onSubmit(ingredientsList);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await axios.post(
        'https://api.clarifai.com/v2/models/food-model/outputs',
        {
          inputs: [{ data: { image: { base64: await blobToBase64(imageFile) } } }]
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      const detectedIngredients = response.data.outputs[0].data.concepts.map(concept => concept.name);
      onSubmit(detectedIngredients);
    } catch (error) {
      console.error('Error detecting ingredients:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const blobToBase64 = (blob) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(blob);
  });

  return (
    <Form>
      <Form.Group>
        <Form.Label>Enter Ingredients (comma-separated)</Form.Label>
        <Form.Control type="text" value={textInput} onChange={e => setTextInput(e.target.value)} />
        <Button onClick={handleTextSubmit} className="mt-2">Submit Text</Button>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Or Upload an Image</Form.Label>
        <Form.Control type="file" onChange={e => setImageFile(e.target.files[0])} />
        <Button onClick={handleImageUpload} className="mt-2" disabled={loading}>
          {loading ? 'Processing...' : 'Upload and Detect'}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default IngredientInput;