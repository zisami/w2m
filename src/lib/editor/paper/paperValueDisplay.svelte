<script>
	import { paperState } from './paper.store';
</script>

<div class="grid grid-cols-6 gap-1 absolute bg-slate-900 p-8 z-50">
	<div class="col-span-5">clicked Joint:</div>
	<div class="col-span-6">{$paperState?.eventVector?.limbChain || '-'}</div>

	<div class="col-span-5">clicked Joint:</div>
	<div class="text-right">{$paperState?.eventVector?.itemName || '-'}</div>

	<div class="col-span-5">rotates Around:</div>
	<div class="text-right">{$paperState?.eventVector?.jointName || '-'}</div>

	<div class="col-span-5">Distance:</div>
	<div class="text-right">{$paperState?.eventVector?.distance?.toFixed(2) || '-'}</div>

	<div class="col-span-5">Angle:</div>
	<div class="text-right">{$paperState?.eventVector?.angle?.toFixed(2) || '-'}</div>

	<div class="col-span-5">Angle combined:</div>
	<div class="text-right">{$paperState?.eventVector?.angleCombined?.toFixed(2) || '-'}</div>

	<div class="col-span-5">Angle total:</div>
	<div class="text-right">{$paperState?.eventVector?.angleTotal?.toFixed(2) || '-'}</div>

	<hr class="col-span-6" />

	<div class="col-span-5">Render Skeleton Vectors</div>
	<div class="text-right">
		<input
			type="checkbox"
			bind:checked={$paperState.renderSkeletonVectors}
			class="checkbox checkbox-primary"
		/>
	</div>
	{#if $paperState.renderSkeletonVectors}
		<div class="col-span-6 grid grid-cols-6 gap-1">
			<div class="col-span-5">Show Vectors</div>
			<div class="text-right">
				<input
					type="checkbox"
					bind:checked={$paperState.skeletonRenderOptions.showLength}
					class="checkbox checkbox-primary"
				/>
			</div>
		</div>
	{/if}
	<div class="col-span-5">Event Vector Checker</div>
	<div class="text-right">
		<input
			type="checkbox"
			bind:checked={$paperState.renderEventVector}
			class="checkbox checkbox-primary"
		/>
	</div>
</div>
