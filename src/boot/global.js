import { boot } from 'quasar/wrappers';
import * as VueGoogleMap from 'vue3-google-map';

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(VueGoogleMap);
});
