export default function AiSupportPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="glass-overlay max-w-md p-8 text-center">
        <div className="mb-4 text-4xl">🤖</div>
        <h2 className="text-lg font-bold text-nolla-text">
          AI療育サポート
        </h2>
        <p className="mt-3 text-sm" style={{ color: "var(--color-parent-tab-inactive)" }}>
          お子さまの成長データに基づいた、個別最適化された療育アドバイスを
          AIがご提案します。
        </p>
        <div
          className="mt-6 inline-block rounded-full px-6 py-2 text-sm font-medium"
          style={{
            background: "var(--color-parent-analysis-badge)",
            color: "var(--color-nolla-primary)",
          }}
        >
          まもなく登場
        </div>
      </div>
    </div>
  );
}
