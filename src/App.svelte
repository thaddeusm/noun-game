<script>
	import socket from './api.js';
	import { gameState } from './stores.js';

	import Start from './views/Start.svelte';

	import Loader from './components/Loader.svelte';

	let loaded = false;

	socket.on('connected', () => {
		console.log('connected to server');

		gameState.set('start')

		loaded = true;
	});
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
			<Start />
		{/if}
	{:else}
		<Loader />
	{/if}
</main>