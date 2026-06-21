'use client';
import { useState } from 'react';
import PhoneInput from '@/components/PhoneInput';
import ResultsCard from '@/components/ResultsCard';
import CallHistoryChart from '@/components/CallHistoryChart';
import AIInsights from '@/components/AIInsights';
import Map from '@/components/Map';

export default function Dashboard() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState<any[]>([]);

  const handleLookup = async (number: string) => {
    setLoading(true);
    const res = await fetch('/api/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number })
    });
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  const handleBulk = async (numbers: string[]) => {
    setLoading(true);
    const res = await fetch('/api/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: numbers, bulk: true })
    });
    const data = await res.json();
    setBulkResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-6xl font-bold tracking-tight">AI PHONE TRACKER</h1>
            <p className="text-xl text-zinc-400 mt-2">Twilio + Real Map Intelligence</p>
          </div>
        </div>

        <PhoneInput onLookup={handleLookup} onBulk={handleBulk} loading={loading} />

        {results && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResultsCard data={results} />
            <div>
              <Map center={results.mapCenter} />
              <AIInsights insights={results.aiInsights} />
            </div>
            <CallHistoryChart />
          </div>
        )}

        {bulkResults.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Bulk Results</h2>
            <div className="bg-zinc-900 rounded-xl overflow-hidden">
              <pre className="p-6 text-sm overflow-auto max-h-96">{JSON.stringify(bulkResults, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
