<script lang="ts">
  import { getCoinData } from '../../utils/coinData';
  import { getCoinHistory } from '../../utils/coinHistory';
  import Loading from '../../components/Loading.svelte';
  import CoinDetail from '../../components/coinDetail.svelte';

  export let id: string;

  let coin;
  let history;
  let min: number;
  let max: number;
  let avg: number;

  let promise: Promise<void> = Promise.all([getCoinData(id), getCoinHistory(id)]).then(
    ([coinDetail, coinHistory]) => {
      coin = coinDetail;
      history = coinHistory;
      min = Math.min(...history.map(h => parseFloat(h.priceUsd)));
      max = Math.max(...history.map(h => parseFloat(h.priceUsd)));
      avg = Math.abs(...history.map(h => parseFloat(h.priceUsd)));
    }
  );
</script>

{#await promise}
  <Loading />
{:then value}
  <CoinDetail {coin} {min} {max} {avg} />
{:catch error}
  <h5 class="text-center text-red-600 text-lg mt-6">
    Ha ocurrido un error, por favor intente con otra criptomenda.
  </h5>
{/await}
