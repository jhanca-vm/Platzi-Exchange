<script>
  let coins = [
    {
      slug: 'bitcoin',
      symbol: 'BTC',
    },
    {
      slug: 'ethereum',
      symbol: 'ETH',
    },
    {
      slug: 'ripple',
      symbol: 'XRP',
    },
  ];
</script>

<header class="flex items-center px-3 h-16 bg-green-400 shadow sm:px-4 md:h-20 md:px-5">
  <a href="/">
    <figure class="flex items-center">
      <img src="logo.svg" alt="logo" />
      <figcaption class="text-white text-lg font-semibold ml-2 md:text-xl">
        Platzi Exchange
      </figcaption>
    </figure>
  </a>
  <nav>
    <ul class="flex ml-2 md:text-sm">
      {#each coins as { slug, symbol }}
        <li class="ml-3">
          <a class="text-teal-200 hover:text-white" href={slug}>{symbol}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>
