import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VoiceNavigator({ onNavigate }) {
  const { i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      rec.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setTranscript(text);
        handleCommand(text);
        setIsListening(false);
        // Clear transcript after a bit
        setTimeout(() => setTranscript(''), 3000);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const handleCommand = (cmd) => {
    // English keywords
    if (cmd.includes('doctor')) onNavigate('doctor');
    else if (cmd.includes('calculate') || cmd.includes('calculator')) onNavigate('calculator');
    else if (cmd.includes('calendar') || cmd.includes('task')) onNavigate('calendar');
    else if (cmd.includes('price') || cmd.includes('mandi') || cmd.includes('rate')) onNavigate('prices');
    else if (cmd.includes('home')) onNavigate('home');
    
    // Hindi keywords
    else if (cmd.includes('डॉक्टर') || cmd.includes('सलाह')) onNavigate('doctor');
    else if (cmd.includes('गणना') || cmd.includes('कैलकुलेटर') || cmd.includes('पानी') || cmd.includes('खाद')) onNavigate('calculator');
    else if (cmd.includes('कैलेंडर') || cmd.includes('कार्य')) onNavigate('calendar');
    else if (cmd.includes('मंडी') || cmd.includes('भाव') || cmd.includes('कीमत')) onNavigate('prices');
    else if (cmd.includes('होम') || cmd.includes('मुख्य')) onNavigate('home');

    // Marathi keywords
    else if (cmd.includes('पीक') || cmd.includes('सल्ला')) onNavigate('doctor');
    else if (cmd.includes('पाणी') || cmd.includes('खत') || cmd.includes('मोजमाप')) onNavigate('calculator');
    else if (cmd.includes('वेळापत्रक') || cmd.includes('काम')) onNavigate('calendar');
    else if (cmd.includes('बाजार') || cmd.includes('दर')) onNavigate('prices');
    else if (cmd.includes('मुख्यपृष्ठ') || cmd.includes('परत')) onNavigate('home');
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      if (recognition) {
        // Set language based on current i18n
        if (i18n.language === 'hi') recognition.lang = 'hi-IN';
        else if (i18n.language === 'mr') recognition.lang = 'mr-IN';
        else recognition.lang = 'en-IN';
        
        try {
          recognition.start();
          setIsListening(true);
          setTranscript('');
        } catch (e) {
             // happens if recognition is already started
        }
      } else {
        alert("Your browser does not support voice recognition.");
      }
    }
  };

  if (!recognition) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {isListening && (
        <div className="bg-white rounded-2xl shadow-xl p-3 mb-3 border border-green-100 flex items-center gap-3 animate-fade-in">
          <Loader2 size={16} className="text-green-600 animate-spin" />
          <span className="text-xs font-bold text-gray-700">Listening...</span>
        </div>
      )}
      {transcript && !isListening && (
        <div className="bg-gray-800 text-white rounded-2xl shadow-xl py-2 px-4 mb-3 text-xs max-w-xs animate-fade-in transition-opacity" style={{ opacity: transcript ? 1 : 0 }}>
          "{transcript}"
        </div>
      )}
      
      <button 
        onClick={toggleListening}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isListening ? 'bg-red-500 scale-110 shadow-red-500/50' : 'bg-green-600 hover:bg-green-700 hover:scale-105 shadow-green-600/50'}`}
      >
        {isListening ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
      </button>
    </div>
  );
}
