import { cache } from "react";
import { loadNavigatorPack } from "./loader";

/** The navigator this Phase 1 build serves. */
export const ACTIVE_NAVIGATOR = "aging-parent";

/** Cached per-request loader so a single render reads/validates content once. */
export const getPack = cache(() => loadNavigatorPack(ACTIVE_NAVIGATOR));
