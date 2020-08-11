<script lang="ts">
  export let coin;
  export let min;
  export let max;
  export let avg;

  let usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let details = [
    ['Ranking', `#${coin.rank}`],
    ['Precio actual', usd.format(coin.priceUsd)],
    ['Precio más bajo', usd.format(min)],
    ['Precio más alto', usd.format(max)],
    ['Precio promedio', usd.format(avg)],
    ['Variación 24hs', `${parseFloat(coin.changePercent24Hr).toFixed(2)}%`],
  ];
</script>

<section class="text-gray-800 my-4 sm:mt-0 sm:flex sm:items-center">
  <div class="flex flex-col items-center sm:w-1/2">
    <img
      class="w-20 h-20"
      src="https://static.coincap.io/assets/icons/{coin.symbol.toLowerCase()}@2x.png"
      alt="Logo"
    />
    <h1 class="text-4xl font-semibold">
      {coin.name}
      <small class="text-gray-500">{coin.symbol}</small>
    </h1>
  </div>
  <ul class="px-6 my-8 sm:w-1/2 sm:max-w-md">
    {#each details as [title, value]}
      <li class="flex justify-between">
        <b class="uppercase text-gray-600">{title}</b>
        <span>{value}</span>
      </li>
    {/each}
  </ul>
</section>
