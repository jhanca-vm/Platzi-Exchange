<script>
  import { Router, prefetch } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';

  routes
    .map(route => route.api)
    .filter(node => node.meta.iWantTheseFetched) //optional filtering
    .forEach(node => prefetch(node.path));
</script>

<style global>
  @import 'tailwindcss/base';

  @import 'tailwindcss/components';

  @import 'tailwindcss/utilities';
</style>

<Router {routes} />
