// src/hooks/useAIAnalysis.js
import { useState } from 'react';
import { analyzeMedicalImage } from '../services/aiCloudService';

export const useAIAnalysis = () => {
  const [status, setStatus] = useState('idle'); // idle | analyzing | complete | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const startAnalysis = async (file, diseaseId) => {
    setStatus('analyzing');
    setError(null);
    setResult(null);

    try {
      const response = await analyzeMedicalImage(file, diseaseId);

      if (!response || !response.success) {
        throw new Error('AI analysis failed');
      }

      // ✅ Even "under deployment" models return valid data
      setResult(response.data);
      setStatus('complete');

      return response.data;
    } catch (err) {
      console.error('AI Analysis Error:', err);

      setError(
        err?.message ||
        'Unable to process the image at the moment. Please try again.'
      );
      setStatus('error');
      return null;
    }
  };

  return {
    status,
    result,
    error,
    startAnalysis
  };
};
