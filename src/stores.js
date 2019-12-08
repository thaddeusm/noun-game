import { writable } from 'svelte/store';

export const gameState = writable();

export const gameRoom = writable();

export const initiator = writable(false);

export const playerNickname = writable();