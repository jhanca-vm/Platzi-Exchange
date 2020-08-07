<script lang="ts">
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';

  let coins = [];
  let loading: boolean = true;
  let text: string = '';
  $: data = coins;

  onMount(async () => {
    const response = await fetch('https://api.coincap.io/v2/assets?limit=20');
    const results = await response.json();

    coins = results.data;
    loading = false;
  });

  function handleSearch(): void {
    data = coins.filter(coin => coin.name.toLowerCase().includes(text.toLowerCase()));
  }
</script>

<style>
  @media screen and (max-width: 639px) {
    th,
    td {
      @apply px-1;
      @apply py-2;
    }
  }

  @media screen and (min-width: 640px) {
    tbody td {
      @apply my-5;
    }
  }
</style>

{#if loading}
  <Loading />
{:else}
  <table
    class="mx-auto w-full max-w-2xl text-center text-xs text-gray-900 sm:text-sm lg:max-w-4xl"
  >
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400 font-semibold">
        <th />
        <th>
          <span class="underline cursor-pointer">Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Variación 24hs</th>
        <td class="hidden p-3 sm:block">
          <input
            bind:value={text}
            on:keyup={handleSearch}
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-1 px-3 block
            w-full appearance-none leading-normal"
            placeholder="Buscar..."
            type="text"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      {#each data as { id, symbol, name, rank, priceUsd, marketCapUsd, changePercent24Hr }}
        <tr class="border-b border-gray-200 hover:bg-gray-100">
          <td>
            <img
              class="w-6 h-6 sm:w-8 sm:h-8"
              src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
              alt={name}
            />
          </td>
          <td>
            <b class="font-semibold"># {rank}</b>
          </td>
          <td>
            <a class="hover:underline text-green-600" href="coin/{id}">{name}</a>
            <small class="ml-1 text-gray-500">{symbol}</small>
          </td>
          <td>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(priceUsd)}
          </td>
          <td class={changePercent24Hr < 0 ? 'text-red-600' : 'text-green-600'}>
            {parseFloat(changePercent24Hr).toFixed(2)}%
          </td>
          <td class="hidden sm:block">
            <a
              class="font-semibold border border-green-400 py-2 px-6 rounded-md text-green-500
              hover:bg-green-400 hover:text-white"
              href="coin/{id}"
            >
              Detalle
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
