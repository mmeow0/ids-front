<script lang="ts">
	import { session } from "$lib/stores/session";
	import {
		faBars,
		faChartLine,
		faCog,
		faHeart,
		faRocket,
		faSignIn,
		faSignOut,
	} from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import "../app.postcss";

	$: menu_items = $session?.user
		? [
				{
					href: "/dashboard",
					icon: faChartLine,
					label: "Главная",
				},
				{
					href: "/settings",
					icon: faCog,
					label: "Settings",
				},
				{
					href: "/logout",
					icon: faSignOut,
					label: "Log Out",
					reload: true,
				},
		  ]
		: [
				{
					href: "/login",
					icon: faSignIn,
					label: "Залогиниться",
				},
				{
					href: "/signup",
					icon: faHeart,
					label: "Регистрация",
				},
		  ];
</script>

<header class="bg-base-200 px-6">
	<div class="max-w-screen-md mx-auto flex items-center py-2">
		<h1>
			<a href="/" class="btn btn-ghost gap-3">
				<Fa icon={faRocket} />
				IDS
			</a>
		</h1>

		<nav class="dropdown dropdown-end ml-auto">
			<label tabindex="0" class="btn btn-ghost gap-3">
				<Fa icon={faBars} />
				Меню
			</label>
			<ul
				tabindex="0"
				class="dropdown-content menu p-2 shadow-md bg-base-200 rounded-box w-52 "
			>
				{#each menu_items as item}
					<li>
						<a
							href={item.href}
							data-sveltekit-reload={item.reload ? "" : "off"}
						>
							<Fa icon={item.icon} />
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>
