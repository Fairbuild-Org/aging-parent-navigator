import { notFound } from "next/navigation";
import { getPack } from "@/lib/content/pack";
import { ConcernCheckFlow } from "./ConcernCheckFlow";

export async function generateStaticParams() {
  const pack = await getPack();
  return pack.navigator.situations.map((situation) => ({ situation }));
}

export default async function CheckPage({ params }: { params: Promise<{ situation: string }> }) {
  const { situation: situationId } = await params;
  const pack = await getPack();

  const situation = pack.situations.find((s) => s.id === situationId);
  if (!situation) notFound();

  const questions = situation.questions
    .map((qid) => pack.concernCheck.questions.find((q) => q.id === qid))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return <ConcernCheckFlow situation={situation} questions={questions} />;
}
