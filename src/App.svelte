<script>
	import socket from './api.js';
	import { gameState, initiator } from './stores.js';

	import Start from './views/Start.svelte';
	import Play from './views/Play.svelte';
	import End from './views/End.svelte';

	import Loader from './components/Loader.svelte';

	let loaded = false;

	socket.on('connected', () => {
		console.log('connected to server');

		gameState.set('start');

		loaded = true;
	});

	function playGame() {
		gameState.set('play');
		if (initiator) {
			socket.emit('sendStartSignal');
		}
	}
</script>

<style>
	main {
		display: grid;
		height: 100%;
		align-items: center;
	}
</style>

<main>
	{#if loaded}
		{#if $gameState == 'start'}
			<Start on:readyToPlay={playGame} />
		{:else if $gameState == 'play'}
			<Play />
		{:else}
			<End />
		{/if}
	{:else}
		<Loader />
	{/if}
</main>