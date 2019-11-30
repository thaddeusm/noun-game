<script>
	
</script>

<style>
	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}

	div {
		width: 100px;
		height: 100px;
		border-top: 2px solid black;
		border-right: 2px solid red;
		border-bottom: 2px solid red;
		border-left: 2px solid red;
		animation-name: spin;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		margin: 0 auto;
	}
</style>

<div></div>