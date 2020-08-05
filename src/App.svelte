<script>
  import { Router } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';
</script>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&display=swap');

  @import 'tailwindcss/base';

  @import 'tailwindcss/components';

  @import 'tailwindcss/utilities';
</style>

<Router {routes} />
