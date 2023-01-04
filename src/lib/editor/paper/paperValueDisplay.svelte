<script>
	import { paperState } from './paper.store';
</script>

<div class="grid grid-cols-6 gap-1 absolute bg-slate-900 p-8 z-50">
	<div class="col-span-5">Distance:</div>
	<div class="text-right">{$paperState?.eventVektor?.distance?.toFixed(2) || '-'}</div>

	<div class="col-span-5">Angle:</div>
	<div class="text-right">{$paperState?.eventVektor?.angle?.toFixed(2) || '-'}</div>

	<div class="col-span-5">isValidAngle:</div>
	<div class="text-right">
		<input
			type="checkbox"
			checked={$paperState?.eventVektor?.isValidAngle}
			class="checkbox checkbox-primary"
			disabled
		/>
	</div>

	<div class="col-span-5">isValidDistance:</div>
	<div class="text-right">
		<input
			type="checkbox"
			checked={$paperState?.eventVektor?.isValidDistance}
			class="checkbox checkbox-primary"
			disabled
		/>
	</div>

	<hr class="col-span-6" />

	<div class="col-span-5">Render Skeleton Vectors</div>
	<div class="text-right">
		<input
			type="checkbox"
			bind:checked={$paperState.renderSkeletonVectors}
			class="checkbox checkbox-primary"
		/>
	</div>
    <div class="col-span-5">Event Vector Checker</div>
	<div class="text-right">
		<input
			type="checkbox"
			bind:checked={$paperState.renderEventVector}
			class="checkbox checkbox-primary"
		/>
	</div>
</div>
