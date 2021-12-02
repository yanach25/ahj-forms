export default class Popover {
  static registeredPopovers = new Map();

  static call(event) {
    const el = event.target;
    if (this.registeredPopovers.has(el)) {
      this.removePopover(el);
    } else {
      this.addPopover(el);
    }
  }

  static removePopover(el) {
    const popover = this.registeredPopovers.get(el);
    popover.remove();
    this.registeredPopovers.delete(el);
  }

  static addPopover(el) {
    const popover = document.createElement('div');
    popover.style.position = 'absolute';
    let { position, title, content } = el.dataset;

    if (!(content && title)) {
      throw new Error('There should be title and content for Popover');
    }

    if (!position) {
      position = 'top';
    }

    popover.classList.add('popover');
    popover.innerHTML = `${title ? `<div class="popover-title">${title}</div>` : ''}<div class="popover-content">${content}</div>`;
    document.body.appendChild(popover);
    popover.style.opacity = '0';
    popover.setAttribute('data-position', position);

    setTimeout(() => {
      this.setPosition(el, popover, position);
      popover.style.opacity = '1';
    });

    this.registeredPopovers.set(el, popover);
  }

  static setPosition(el, popover, position) {
    const elBoundingClientRect = el.getBoundingClientRect();
    const popoverBoundingClientRect = popover.getBoundingClientRect();
    const offset = 10;
    switch (position) {
      case 'left':
        popover.style.top = `${elBoundingClientRect.y + (elBoundingClientRect.height - popoverBoundingClientRect.height) / 2}px`;
        popover.style.left = `${(elBoundingClientRect.x - popoverBoundingClientRect.width) - offset}px`;
        break;
      case 'right':
        popover.style.top = `${elBoundingClientRect.y + (elBoundingClientRect.height - popoverBoundingClientRect.height) / 2}px`;
        popover.style.left = `${(elBoundingClientRect.x + elBoundingClientRect.width) + offset}px`;
        break;
      case 'bottom':
        popover.style.top = `${elBoundingClientRect.y + elBoundingClientRect.height + offset}px`;
        popover.style.left = `${elBoundingClientRect.x + (elBoundingClientRect.width - popoverBoundingClientRect.width) / 2}px`;
        break;
      default:
        popover.style.top = `${elBoundingClientRect.y - popoverBoundingClientRect.height - offset}px`;
        popover.style.left = `${elBoundingClientRect.x + (elBoundingClientRect.width - popoverBoundingClientRect.width) / 2}px`;
        break;
    }
  }
}
