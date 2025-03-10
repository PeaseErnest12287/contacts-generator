import React, { useState } from "react";
import NumberGenerator from "./components/NumberGenerator";
import LogDisplay from "./components/LogDisplay";
import { startBackend, checkNumbers, downloadVCF } from "./api";

const App = () => {
    const [logs, setLogs] = useState([]);
    const [generatedNumbers, setGeneratedNumbers] = useState([]);
    const [validNumbers, setValidNumbers] = useState([]);
    const [timer, setTimer] = useState(10); // Default 10 minutes

    const addLog = (message) => setLogs((prev) => [...prev, message]);

    const handleStartBackend = async () => {
        const result = await startBackend();
        addLog(result);
    };

    const handleGenerateNumbers = (numbers) => {
        setGeneratedNumbers(numbers);
        addLog(`🎲 Generated ${numbers.length} numbers.`);
    };

    const handleCheckNumbers = async () => {
        if (generatedNumbers.length === 0) {
            alert("Generate numbers first!");
            return;
        }

        addLog(`🔎 Checking numbers for ${timer} minutes...`);
        const response = await checkNumbers(generatedNumbers, timer);
        setValidNumbers(response.validNumbers);
        setLogs((prev) => [...prev, ...response.logs]);
    };

    const handleDownloadVCF = () => {
        if (validNumbers.length === 0) return alert("No valid numbers found.");
        downloadVCF(validNumbers);
    };

    return (
        <div>
            <h1>🔥 Bumbum Generator</h1>
            <button onClick={handleStartBackend}>🚀 Start Backend</button>
            <NumberGenerator onGenerate={handleGenerateNumbers} />
            
            {/* Timer Dropdown */}
            <label>⏳ Select Duration: </label>
            <select value={timer} onChange={(e) => setTimer(Number(e.target.value))}>
                {[...Array(11)].map((_, i) => (
                    <option key={i} value={i + 10}>
                        {i + 10} min
                    </option>
                ))}
            </select>

            <button onClick={handleCheckNumbers}>🔍 Check WhatsApp</button>
            <LogDisplay logs={logs} />
            <button onClick={handleDownloadVCF}>📥 Download VCF</button>
        </div>
    );
};

export default App;
