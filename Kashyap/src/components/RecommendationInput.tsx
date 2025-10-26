// src/components/RecommendationInput.tsx
import React, { useState, useEffect, useRef } from "react"; // Added useEffect, useRef
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Check for Web Speech API
const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition;
const isSpeechApiSupported = !!SpeechRecognition;

// --- Declare recognition instance variable outside component ---
// Use useRef to hold the recognition instance so we can stop it
let recognitionInstance: any | null = null; // Adjust 'any' if you have specific types

interface RecommendationInputProps {
  onSubmit: (query: string) => void;
}

export const RecommendationInput = ({ onSubmit }: RecommendationInputProps) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState(""); // State for live transcript
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null); // Ref to hold recognition instance

  // Cleanup function to stop recognition if component unmounts
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setInterimTranscript(""); // Clear interim when submitting manually
    }
  };

  const stopListening = () => {
     if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false); // Manually set listening state off
      setInterimTranscript(""); // Clear interim transcript
    }
  };

  const handleListen = () => {
    if (isListening) {
      // If already listening, stop it
      stopListening();
      return;
    }

    if (!isSpeechApiSupported) {
      setSpeechError(t("error.noSpeechApi"));
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition; // Store instance in ref

    recognition.lang = language === "hindi" ? "hi-IN" : "en-US";
    recognition.interimResults = true; // --- Enable interim results ---
    recognition.continuous = false; // Stop after first utterance

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
      setInterimTranscript(""); // Clear previous interim results
      setQuery(""); // Clear the input field when starting to listen
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let currentInterim = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(currentInterim); // Update interim state

      if (finalTranscript) {
        setQuery(finalTranscript); // Update final query state (fills input box)
        onSubmit(finalTranscript); // Automatically submit final result
        setInterimTranscript(""); // Clear interim once final
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        setSpeechError(t("error.noSpeech"));
      } else if (event.error !== "aborted") { // Ignore manual stop errors
         setSpeechError(typeof event.error === 'string' ? event.error : 'Speech recognition error');
      }
       setIsListening(false); // Ensure listening stops on error
       setInterimTranscript("");
       recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript(""); // Clear interim when listening ends naturally
      recognitionRef.current = null; // Clear ref
    };

    recognition.start();
  };

  return (
    <Card className="p-4 m-4 rounded-2xl card-shadow">
      <h3 className="text-lg font-semibold mb-3">{t("home.recommendTitle")}</h3>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <div className="relative">
          <Input
            placeholder={t("home.recommendPlaceholder")}
            className="h-12 rounded-xl pr-12"
            value={query} // Input shows final query
            onChange={(e) => setQuery(e.target.value)}
            disabled={isListening} // Disable input while listening
          />
          {isSpeechApiSupported && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleListen}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 text-muted-foreground hover:text-primary",
                isListening && "text-destructive hover:text-destructive/80 animate-pulse" // Make it red/pulsing when active
              )}
              aria-label={isListening ? t("home.stopListening") : t("home.speakLabel")} // Change label
            >
              {/* Change icon based on state */}
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
        </div>

        {/* --- Display Interim Transcript --- */}
        {isListening && (
          <p className="text-center text-sm text-muted-foreground min-h-[1.25rem] italic">
            {interimTranscript || t("home.listening")}
          </p>
        )}
        {/* --- End Interim Display --- */}

        {speechError && (
          <p className="text-xs text-destructive flex items-center gap-1">
             <AlertCircle size={14} /> {speechError}
             <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setSpeechError(null)}>Clear</Button>
          </p>
        )}
        <Button
            type="submit"
            className="w-full h-11 rounded-xl gradient-primary"
            disabled={!query.trim() || isListening} // Disable submit while listening
        >
          <Search className="h-4 w-4 mr-2" />
          {t("home.getRecommendations")}
        </Button>
      </form>
    </Card>
  );
}; // Make sure this closing brace exists

// --- Add MicOff import ---
import { MicOff } from "lucide-react";