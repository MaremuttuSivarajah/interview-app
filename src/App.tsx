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
      <h1>AI Technical Interview System</h1>
      
      <div className="interview-panel">
        <button 
          onClick={handleGenerateQuestion}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Question'}
        </button>
        
        {currentQuestion && (
          <div className="question-section">
            <h3>Current Question:</h3>
            <p>{currentQuestion}</p>
          </div>
        )}

        <div className="code-editor">
          <CodeEditor 
            value={code} 
            onChange={setCode}
          />
        </div>
      </div>
    </div>
  );
}