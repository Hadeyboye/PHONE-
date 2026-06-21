'use client';

export default function ResultsCard({ data }: { data: any }) {
  if (!data.valid) {
    return <div className="bg-red-950 border border-red-800 p-8 rounded-3xl">Error: {data.error}</div>;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
      <div>
        <div className="text-4xl font-mono tracking-widest">{data.number}</div>
        <div className="text-emerald-400 text-sm mt-1">VALID • ACTIVE</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-zinc-500">Carrier:</span> <span className="font-medium">{data.carrier?.name || data.lineTypeIntelligence?.carrier_name}</span></div>
        <div><span className="text-zinc-500">Type:</span> <span>{data.lineTypeIntelligence?.type}</span></div>
        <div><span className="text-zinc-500">Caller Name:</span> <span>{data.callerName?.name || 'N/A'}</span></div>
        <div><span className="text-zinc-500">Location:</span> <span>{data.location}</span></div>
      </div>
    </div>
  );
}
