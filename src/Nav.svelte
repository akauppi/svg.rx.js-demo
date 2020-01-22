<script>
	import { isActive, url } from '@sveltech/routify'

	let links = [	// [ <relative-url>|null, <title> ]
			['.', 'home'],
			['circles', 'circles'],
			['transform', 'transform'],
			[null, 'triangles'],
			[null, 'petals']
	];
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	.dimmed {
		color: #888888;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-style: italic;
	}
</style>

<nav>
	<ul>
{#each links as [path, title]}
	{#if path !== null}
		<li><a href={$url(path)} class:selected='{$isActive(path)}'>{title}</a></li>
	{:else}
		<li class:dimmed={true}>{title}</li>
	{/if}
{/each}
	</ul>
</nav>
