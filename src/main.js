import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import connectToDatabase from './db.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faList, faTrash, faStickyNote, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faList)
library.add(faStickyNote)
library.add(faPlus)
library.add(faChevronLeft)
library.add(faChevronRight)

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    createApp(App)
      .component('font-awesome-icon', FontAwesomeIcon)
      .mount('#app');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

