<script>
	import { url, isActive } from "@sveltech/routify";
	const _links = [
		['./index', 'home'],
		['./circles', 'circles'],
		['./transform', 'transform'],
		[null, 'triangles'],
		[null, 'petals']
	];
</script>

<style>
	.nav {
		margin: 16px;
		padding: 16px;
		border-radius: 4px;
		background: white;
		box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
		display: inline-block;
	}
	.backlink {
		position: absolute;
		left: 16px;
		color: white;
		font-weight: bold;
	}
	.active {
		position: relative;
		font-weight: bold;
	}

	/* added AK230120 */
	.dimmed {
		color: #888888;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-style: italic;
	}
</style>

<div class="nav">
	<a class="backlink" href={$url('/')}>&#8656; BACK TO APP</a>
{#each _links as [path, title]}
	{#if path !== null}
		<a href={$url(path)} class:active={$isActive(path)} >{title}</a>
	{:else}
		<li class:dimmed={true}>{title}</li>
	{/if}
{/each}
</div>
