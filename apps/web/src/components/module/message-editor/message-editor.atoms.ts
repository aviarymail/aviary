import { createSignal } from 'solid-js';

export const [blocks, setBlocks] = createSignal<{ name: string; template: string }[]>([]);
