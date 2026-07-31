import { listNavigators, loadNavigatorPack } from "../lib/content/loader";

/**
 * Validates every content pack under data/navigators against the schema and
 * cross-reference rules. Run with `npm run validate:content`. Exits non-zero on
 * any failure so it can gate CI / deploys.
 */
async function main(): Promise<void> {
  const navigators = await listNavigators();
  if (navigators.length === 0) {
    console.error("No navigators found under data/navigators.");
    process.exit(1);
  }

  let failed = false;
  for (const id of navigators) {
    try {
      const pack = await loadNavigatorPack(id);
      console.log(`✓ ${id}  (v${pack.navigator.version}, status=${pack.navigator.status})`);
      console.log(
        `    situations: ${pack.situations.length}, questions: ${pack.concernCheck.questions.length}, ` +
          `bands: ${pack.scoring.bands.length}, triggers: ${pack.emergencyTriggers.triggers.length}`,
      );
    } catch (e) {
      failed = true;
      console.error(`✗ ${id}\n${(e as Error).message}`);
    }
  }

  if (failed) {
    console.error("\nContent validation failed.");
    process.exit(1);
  }
  console.log("\nAll content packs valid.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
