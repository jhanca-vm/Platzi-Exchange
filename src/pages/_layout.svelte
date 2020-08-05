<script>
  import Header from '../components/Header.svelte';
</script>

<style>
  :global(*) {
    font-family: 'Heebo', sans-serif;
  }
</style>

<Header />
<main>
  <slot />
</main>
