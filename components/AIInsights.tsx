export default function AIInsights({ insights }: { insights: string[] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">🧠 AI Insights</h3>
      <ul className="space-y-4">
        {insights.map((insight, i) => (
          <li key={i} className="text-zinc-300 flex gap-3">
            <span className="text-emerald-400">→</span> {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}
