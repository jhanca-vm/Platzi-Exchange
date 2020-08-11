<script lang="ts">
  import { getCoinData } from '../../utils/coinData';
  import { getCoinHistory } from '../../utils/coinHistory';
  import Loading from '../../components/Loading.svelte';
  import CoinDetail from '../../components/coinDetail.svelte';
  import Chart from 'svelte-frappe-charts';

  export let id: string;

  let data;
  let coin;
  let min: number;
  let max: number;
  let avg: number;
  let colors: string[] = ['#48bb78'];

  let promise: Promise<void> = Promise.all([getCoinData(id), getCoinHistory(id)]).then(
    ([coinDetail, coinHistory]) => {
      coin = coinDetail;
      min = Math.min(...coinHistory.map(coin => parseFloat(coin.priceUsd)));
      max = Math.max(...coinHistory.map(coin => parseFloat(coin.priceUsd)));
      avg = Math.abs(...coinHistory.map(coin => parseFloat(coin.priceUsd)));

      data = {
        labels: [
          ...coinHistory.map(coin =>
            new Date(coin.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          ),
        ],
        datasets: [
          {
            name: 'USD',
            values: [...coinHistory.map(coin => parseFloat(coin.priceUsd).toFixed(2))],
          },
        ],
      };
    }
  );
</script>

{#await promise}
  <Loading />
{:then history}
  <a
    href="/"
    class="font-semibold border border-green-400 py-1 px-5 rounded-md text-green-500
    hover:bg-green-400 hover:text-white"
  >
    <i class="fas fa-long-arrow-alt-left" />
  </a>
  <CoinDetail {coin} {min} {max} {avg} />
  <h3 class="font-semibold text-gray-800 pl-2 mt-6">Variación del precio ultimas 6Hs</h3>
  <Chart {data} dotSize="5" {colors} />
{:catch error}
  <h5 class="text-center text-red-600 text-lg mt-6">
    Ha ocurrido un error, por favor intente con otra criptomenda.
  </h5>
{/await}
