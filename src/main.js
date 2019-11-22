const TASK_COUNT = 3;

import {createBoardTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';


const createLoadMoreButton = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate());

new Array(TASK_COUNT)
  .fill(``)
  .forEach(() => render(taskListElement, createTaskTemplate())
  );

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButton());

