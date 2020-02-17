import {MONTH_NAMES} from '../const.js';
import {createElement, formatTime} from '../utils.js';

export default class Task {
  constructor(task) {
    this._task = task;

    this._element = null;

    this._isExpired = this._task.dueDate instanceof Date && this._task.dueDate < Date.now();
    this._isDateShowing = !!this._task.dueDate;

    this._date = this._isDateShowing ? `${this._task.dueDate.getDate()} ${MONTH_NAMES[this._task.dueDate.getMonth()]}` : ``;
    this._time = this._isDateShowing ? formatTime(this._task.dueDate) : ``;

    this._hashtags = this.createHashtagsMarkup(Array.from(this._task.tags));
    this._repeatClass = Object.values(this._task.repeatingDays).some(Boolean) ? `card--repeat` : ``;
    this._deadlineClass = this._isExpired ? `card--deadline` : ``;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  createHashtagsMarkup(hashtags) {
    return hashtags
      .map((hashtag) => {
        return (
          `<span class="card__hashtag-inner">
            <span class="card__hashtag-name">
              #${hashtag}
            </span>
          </span>`
        );
      })
      .join(`\n`);
  }

  getTemplate() {
    return (
      `<article class="card card--${this._task.color} ${this._repeatClass} ${this._deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${this._task.description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${this._date}</span>
                    <span class="card__time">${this._time}</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._hashtags}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
    );
  }
}
