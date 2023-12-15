<script lang="ts">
	import { session } from "$lib/stores/session";
</script>

<div class="prose">
	<h1>Фронт для IDS на SvelteKit</h1>
	<p>
		Отображает данные о пакетах и сигнатуры которыми они совпали
	</p>
	<p>
		Зарегестрируйтесь или залогиньтесь чтобы просмотреть инфу
	</p>
	<p class="flex items-center gap-4 mt-12">
		{#if $session?.user}
			<a href="/dashboard" class="btn btn-primary">Dashboard</a>
			<a href="/settings" class="btn">Settings</a>
		{:else}
			<a href="/signup" class="btn btn-primary">Sign Up</a>
			<a href="/login" class="btn">Log In</a>
		{/if}
	</p>
</div>
