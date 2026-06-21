'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import { Upload, Phone } from 'lucide-react';

interface Props {
  onLookup: (number: string) => void;
  onBulk: (numbers: string[]) => void;
  loading: boolean;
}

export default function PhoneInput({ onLookup, onBulk, loading }: Props) {
  const [number, setNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (number) onLookup(number);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      Papa.parse(selectedFile, {
        complete: (results) => {
          const numbers = results.data.flat().filter(Boolean) as string[];
          if (numbers.length > 0) onBulk(numbers);
        }
      });
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="+1xxxxxxxxxx"
          className="flex-1 bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-white text-black px-10 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-zinc-200 disabled:opacity-50"
        >
          <Phone className="w-5 h-5" /> LOOKUP
        </button>
      </form>

      <div className="mt-6 border-t border-zinc-800 pt-6">
        <label className="flex items-center gap-3 cursor-pointer text-sm text-zinc-400 hover:text-white">
          <Upload className="w-5 h-5" />
          <span>Bulk CSV Upload (numbers in column)</span>
          <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
        </label>
      </div>
    </div>
  );
}
