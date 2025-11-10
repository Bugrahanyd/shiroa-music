"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export default function AdminUpload() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "Electronic",
    subgenres: "",
    bpm: "",
    key: "",
    duration: "",
    price: "",
    instruments: "",
    language: "Instrumental",
    mood: "",
    licenseType: "exclusive"
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#00CED1] mb-4">Access Denied</h1>
          <p className="text-zinc-400">Admin privileges required</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!audioFile) {
      alert("Please select an audio file");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      let audioUrl = "https://example.com/audio.mp3";
      let previewUrl = "https://example.com/preview.mp3";
      let coverUrl = undefined;

      // Upload audio file
      const audioFormData = new FormData();
      audioFormData.append("file", audioFile);
      
      const audioResponse = await fetch("http://localhost:3001/upload/audio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        body: audioFormData
      });

      if (audioResponse.ok) {
        const audioData = await audioResponse.json();
        audioUrl = audioData.url;
        previewUrl = audioData.url; // Use same URL for now
      }

      // Upload cover if provided
      if (coverFile) {
        const coverFormData = new FormData();
        coverFormData.append("file", coverFile);
        
        const coverResponse = await fetch("http://localhost:3001/upload/cover", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          },
          body: coverFormData
        });

        if (coverResponse.ok) {
          const coverData = await coverResponse.json();
          coverUrl = coverData.url;
        }
      }

      const trackData = {
        title: formData.title,
        artist: formData.artist,
        genre: formData.genre,
        bpm: parseInt(formData.bpm),
        key: formData.key,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        audioUrl,
        previewUrl,
        coverUrl,
        subgenres: formData.subgenres.split(",").map(s => s.trim()).filter(Boolean),
        instruments: formData.instruments.split(",").map(s => s.trim()).filter(Boolean),
        mood: formData.mood.split(",").map(s => s.trim()).filter(Boolean),
        language: formData.language,
        licenseType: formData.licenseType
      };

      await api.createTrack(trackData);
      alert("Track uploaded successfully!");
      router.push("/tracks");
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message || "Please try again."}`);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00CED1] mb-8 font-[family-name:var(--font-orbitron)]">
          Upload Track
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Audio File *</label>
              <input
                type="file"
                accept="audio/*"
                required
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#00CED1] file:text-[#0C0C0C] file:font-bold hover:file:bg-[#5FE0E5] file:cursor-pointer"
              />
              {audioFile && <p className="text-sm text-zinc-400 mt-1">{audioFile.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Cover Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-700 file:text-white file:font-bold hover:file:bg-zinc-600 file:cursor-pointer"
              />
              {coverFile && <p className="text-sm text-zinc-400 mt-1">{coverFile.name}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Artist *</label>
              <input
                type="text"
                required
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Genre *</label>
              <select
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              >
                <option>Electronic</option>
                <option>Hip-Hop</option>
                <option>Pop</option>
                <option>Rock</option>
                <option>Jazz</option>
                <option>Classical</option>
                <option>Ambient</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">BPM *</label>
              <input
                type="number"
                required
                value={formData.bpm}
                onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Key *</label>
              <input
                type="text"
                required
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Duration (seconds) *</label>
              <input
                type="number"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">License Type *</label>
              <select
                required
                value={formData.licenseType}
                onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
              >
                <option value="exclusive">Exclusive</option>
                <option value="non-exclusive">Non-Exclusive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Subgenres (comma-separated)</label>
            <input
              type="text"
              value={formData.subgenres}
              onChange={(e) => setFormData({ ...formData, subgenres: e.target.value })}
              placeholder="Deep House, Progressive"
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Instruments (comma-separated)</label>
            <input
              type="text"
              value={formData.instruments}
              onChange={(e) => setFormData({ ...formData, instruments: e.target.value })}
              placeholder="Synthesizer, Drums, Bass"
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Mood (comma-separated)</label>
            <input
              type="text"
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
              placeholder="Energetic, Uplifting, Happy"
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full py-3 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading files..." : loading ? "Creating track..." : "Upload Track"}
          </button>
        </form>
      </div>
    </div>
  );
}
