'use client';

import { useState } from 'react';
import { Sparkles, Music, Mic, Loader2 } from 'lucide-react';

interface AIGeneratorProps {
  onGenerate: (audioUrl: string, metadata: any) => void;
}

export default function AIGenerator({ onGenerate }: AIGeneratorProps) {
  const [mode, setMode] = useState<'lyrics' | 'prompt'>('lyrics');
  const [lyrics, setLyrics] = useState('');
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [tempo, setTempo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genres = ['pop', 'rock', 'rap', 'arabesk', 'türkü', 'electronic', 'jazz', 'r&b'];
  const moods = ['happy', 'sad', 'energetic', 'calm', 'romantic', 'melancholic', 'angry'];
  const tempos = ['slow', 'medium', 'fast', 'upbeat'];

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          lyrics: mode === 'lyrics' ? lyrics : undefined,
          prompt: mode === 'prompt' ? prompt : undefined,
          language,
          options: { genre, mood, tempo }
        })
      });

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      onGenerate(data.audioUrl, data.metadata);
    } catch (err) {
      setError('AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Mode Selection */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode('lyrics')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            mode === 'lyrics'
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Mic className="inline mr-2 h-5 w-5" />
          Lyrics Mode
        </button>
        <button
          onClick={() => setMode('prompt')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            mode === 'prompt'
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Music className="inline mr-2 h-5 w-5" />
          Prompt Mode
        </button>
      </div>

      {/* Input Area */}
      {mode === 'lyrics' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Şarkı Sözleri</label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Şarkı sözlerinizi yazın..."
              className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dil</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-4 py-2 rounded-lg ${language === 'tr' ? 'bg-purple-500' : 'bg-white/5'}`}
              >
                Türkçe
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg ${language === 'en' ? 'bg-purple-500' : 'bg-white/5'}`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-2">Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., upbeat electronic pop song"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Auto</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Auto</option>
            {moods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tempo</label>
          <select
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Auto</option>
            {tempos.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading || (mode === 'lyrics' ? !lyrics : !prompt)}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="inline mr-2 h-5 w-5" />
            Generate Song
          </>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
