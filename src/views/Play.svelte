<script>
	import socket from './../api.js';
	import {gameState, gameRoom, initiator, playerNickname} from './../stores.js';
	import { onMount } from 'svelte';

	import Judge from './Judge.svelte';
	import Write from './Write.svelte';

	let isJudge = false;
	let isInitiator;
	let categories;
	let nickname;

	const unsubscribe = initiator.subscribe(value => {
		isInitiator = value;
	});

	const unsubscribeNickname = playerNickname.subscribe(value => {
		nickname = value;
	});

	onMount(() => {
		if (isInitiator == true) {
			isJudge = true;
		}
	})

	socket.on('changeRounds', (gameData) => {
		console.log('Time to change rounds: ', gameData)
		if (gameData.players[gameData.judge].nickname == nickname) {
			isJudge = true;
		} else {
			isJudge = false;
		}
	})
</script>

<h1>Play</h1>
{#if isJudge}
	<Judge />
{:else}
	<Write />
{/if}