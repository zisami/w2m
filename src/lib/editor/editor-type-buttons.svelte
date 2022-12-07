<script>
	import headIconPath from '$lib/assets/icons/head.svg';
	import bodyIconPath from '$lib/assets/icons/body.svg';
	import skeletonIconPath from '$lib/assets/icons/skeleton.svg';
</script>

<div
	class="container flex flex-col justify-center absolute -right-6 top-1/2  -translate-y-1/2 w-12"
>
	<div class="editor-type-btn ">
		<img src={bodyIconPath} alt="Edit Body" />
	</div>
	<div class="editor-type-btn">
		<img src={headIconPath} alt="Edit Head" />
	</div>
	<div class="editor-type-btn">
		<img src={skeletonIconPath} alt="edit Skeleton" />
	</div>
</div>

<style>
	.editor-type-btn {
		@apply w-12  h-12 my-2 bg-sky-600 rounded-full p-2;
	}
</style>
