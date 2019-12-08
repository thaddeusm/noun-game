<script>
	import socket from './../api.js';
	import { onMount } from 'svelte';

	import Loader from './../components/Loader.svelte';

	let gameData;
	let loaded = false;
	let roundStarted = false;
	let evaluationStarted = false;
	let choice;
	let category = '';
	let responses = [];

	onMount(() => {
		socket.emit('requestGameData');
	})

	socket.on('gameDataIncoming', (data) => {
		gameData = data;
		loaded = true;
	})

	socket.on('promptIncoming', () => {
		roundStarted = true;
	})

	function markChoice() {
		socket.emit('endRound', {winner: choice})
	}

	socket.on('responseIncoming', (data) => {
		console.log('new response: ', data)
		responses = [data, ...responses]
	})
</script>

<h1>Judge</h1>
{#if loaded}
	{#if !roundStarted}
		<button on:click={() => socket.emit('startRound', {category: 'people'})}>
			people
		</button>
		<button on:click={() => socket.emit('startRound', {category: 'places'})}>
			places
		</button>
		<button on:click={() => socket.emit('startRound', {category: 'things'})}>
			things
		</button>
		<button on:click={() => socket.emit('startRound', {category: 'activities'})}>
			activities
		</button>
		<button on:click={() => socket.emit('startRound', {category: 'ideas'})}>
			ideas
		</button>
	{:else}
		<h2>{category}</h2>
		{#if !evaluationStarted}
			<ul>
				{#each responses as response, index}
					<li>{response.text}</li>
				{/each}
			</ul>
			<button on:click={() => evaluationStarted = true}>Evaluate</button>
		{:else}
			<select bind:value={choice}>
				{#each responses as response, index}
					<option value={response.nickname}>{response.text}</option>
				{/each}
			</select>
			<button on:click={markChoice}>Choose</button>
		{/if}
	{/if}
{:else}
	<Loader />
{/if}