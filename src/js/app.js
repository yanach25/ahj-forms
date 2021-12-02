import Popover from './popover';

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    Popover.call(event);
  });
});
