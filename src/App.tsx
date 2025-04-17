import { useState } from 'react';
import { generateQuestion } from '@/lib/ai';
import CodeEditor from '@/components/CodeEditor';

export default function App() {
  const [currentQuestion, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateQuestion = async () => {
    try {
      setIsGenerating(true);
      const question = await generateQuestion("React");
      setQuestion(question);
    } catch (error) {
      console.error("Question generation failed:", error);
      alert("Failed to generate question. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-center text-2xl font-bold mb-6">AI Technical Interview System</h1>
      
      <div className="interview-panel space-y-6">
        <div className="text-center">
          <button 
            onClick={handleGenerateQuestion}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Question'}
          </button>
        </div>

        {currentQuestion && (
          <div className="question-section text-center">
            <h3 className="text-lg font-semibold">Current Question:</h3>
            <p>{currentQuestion}</p>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <CodeEditor 
              value={code} 
              onChange={setCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
