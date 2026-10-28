import { notFound } from "next/navigation";
import { getPack } from "@/lib/content/pack";
import { ConcernCheckFlow } from "./ConcernCheckFlow";

export async function generateStaticParams() {
  const pack = await getPack();
  const visible = pack.navigator.publiclyVisible ?? [];
  return pack.navigator.situations.filter((s) => visible.includes(s)).map((situation) => ({ situation }));
}

export default async function CheckPage({ params }: { params: Promise<{ situation: string }> }) {
  const { situation: situationId } = await params;
  const pack = await getPack();

  // publiclyVisible is the launch gate — enforced here too (not just on the
  // homepage grid) so an unreviewed pathway can't be reached by a direct URL
  // guess. A missing list fails closed: nothing is served.
  const visible = pack.navigator.publiclyVisible ?? [];
  if (!visible.includes(situationId)) notFound();

  const situation = pack.situations.find((s) => s.id === situationId);
  if (!situation) notFound();

  const questions = situation.questions
    .map((qid) => pack.concernCheck.questions.find((q) => q.id === qid))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return <ConcernCheckFlow situation={situation} questions={questions} />;
}
