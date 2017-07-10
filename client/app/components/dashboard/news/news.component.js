'use strict'

import newsHtml from './news.html';
import NewsController from './news.controller.js';

let newsComponent = {
  template: newsHtml,
  controller: NewsController
}

export default newsComponent;
