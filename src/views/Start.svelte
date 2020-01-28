<script>
	import socket from './../api.js';

	import { gameRoom, initiator, playerNickname } from './../stores.js';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let gameID = '';
	let nicknameAccepted = false;

	let gameToJoin = '';

	let nickname = '';
	let feedback = '';

	let players = [];

	function createGame() {
		socket.emit('createRoom');
		initiator.set(true);
	}

	socket.on('gameRoomEstablished', (id) => {
		gameID = id;
	});

	function joinGame() {
		socket.emit('joinGameRoom', gameToJoin);
	}

	socket.on('roomJoined', (id, currentPlayers) => {
		feedback = '';
		gameID = id;
		gameRoom.set(id);
		players = currentPlayers;
	});

	socket.on('roomJoinRejected', () => {
		feedback = "The game does not exist.  Please try again.";
	});

	function checkNickname() {
		socket.emit('checkNickname', nickname);
	}

	socket.on('nicknameAccepted', () => {
		feedback = 'The nickname was accepted.';
		nicknameAccepted = true;
		playerNickname.set(nickname)
	});

	socket.on('nicknameRejected', () => {
		feedback = 'The nickname was rejected.';
	});

	socket.on('newUserConnected', (nickname) => {
		console.log(nickname);
		players = [nickname, ...players];
		console.log('players: ', players);
	})

	function startGame() {
		dispatch('readyToPlay');
	}

	socket.on('allowGameStart', () => {
		if (gameID !== '' && nicknameAccepted) {
			dispatch('readyToPlay');
		}
	})
</script>

<style type="text/css">
	h2 {
		color: #37C7E2;
	}
</style>

<h1>Start</h1>
{#if gameID !== ''}
	{#if nicknameAccepted}
		<h2>The following players are connected:</h2>
		<ul>
			{#each players as player}
				<li>{player}</li>
			{/each}
		</ul>
		<h2>Invite others to join with this code: {gameID}</h2>
		{#if $initiator}
			<button on:click={startGame}>Start</button>
		{/if}
	{:else}
		<h2>{feedback}</h2>
		<input type="text" bind:value={nickname} placeholder="Nickname">
		<button on:click={checkNickname}>Check</button>
	{/if}
{:else}
	<h2>{feedback}</h2>
	<input type="text" bind:value={gameToJoin} placeholder="Enter the game code">
	<button on:click={joinGame} disabled={gameToJoin == ''}>Join Game</button>
	<h2>or</h2>
	<button on:click={createGame}>New Game</button>
{/if}