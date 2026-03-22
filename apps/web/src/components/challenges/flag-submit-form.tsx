"use client";

import { useState } from "react";
import { submitFlag } from "@/lib/api/submission";

type FlagSubmitFormProps = {
  slug: string;
  isActive: boolean;
  user: any;
};

export default function FlagSubmitForm({
  slug,
  isActive,
}: FlagSubmitFormProps) {
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setCorrect(null);

    try {
      const result = await submitFlag(slug, flag);
      setMessage(result.message);
      setCorrect(result.correct);
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit flag.");
      setCorrect(false);
    } finally {
      setLoading(false);
    }
  }

  if (!isActive) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/10 p-6">
        <h2 className="text-lg font-semibold text-primary">Flag Submission</h2>
        <p className="mt-2 text-sm text-foreground">
          This challenge is currently locked.
        </p>
      </div>
    );
  }
  

  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-6">
      <h2 className="text-lg font-semibold text-primary">Submit Flag</h2>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="flag{...}"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
        />

        <button
          type="submit"
          disabled={loading || !flag.trim()}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Flag"}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            correct ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}