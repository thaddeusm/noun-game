<script>
	import socket from './api.js';

	import Loader from './components/Loader.svelte';

	let loaded = false;

	socket.on('connected', () => {
		console.log('connected to server');

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
	{#if !loaded}
		<Loader />
	{/if}
</main>