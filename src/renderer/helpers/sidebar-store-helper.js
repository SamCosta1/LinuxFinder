const path = require('path');
const SIDEBAR_CONF_KEY = 'sidebarConfig';

export function getConfig() {
   if (!localStorage.hasOwnProperty(SIDEBAR_CONF_KEY)) {
      localStorage.setItem(SIDEBAR_CONF_KEY, JSON.stringify(defaultConfig));
   }

   return parseConfig(localStorage.getItem(SIDEBAR_CONF_KEY));
};

function parseConfig(confString) {
   var rawConfig = JSON.parse(confString);

   for (var dir of rawConfig) {
      if (!dir.hasOwnProperty('string')) {
         dir.string = path.basename(dir.path);
      }
   }

   return rawConfig;
}

// If string is omitted then last part of path is used
const defaultConfig = [
   {
      string: 'Home',
      path: '/home/sam'
   },

   {
      path: '/home/sam/Documents'
   },

   {
      path: '/home/sam/Pictures'
   }
];
