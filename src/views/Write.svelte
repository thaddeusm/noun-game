<script>
	import socket from './../api.js';
	import { playerNickname } from './../stores.js';

	let prompt = '';
	let category = '';
	let loaded = false;

	let response;
	let responseSent = false;

	let nickname;

	const unsubscribeNickname = playerNickname.subscribe(value => {
		nickname = value;
	});

	socket.on('promptIncoming', (data) => {
		prompt = data.prompt;
		category = data.category;
		loaded = true;

		console.log(data);
	});

	function sendResponse() {
		socket.emit('sendResponse', {text: response, nickname: nickname})
		responseSent = true;
	}
</script>

<h1>Write</h1>
{#if loaded}
	<h2>{prompt}</h2>
	{#if !responseSent}
		<input type="text" bind:value={response}>
		<button on:click={sendResponse}>Send</button>
	{:else}
		<h2>Waiting for judge...</h2>
	{/if}
{/if}