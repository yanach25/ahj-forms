export default class Popover {
  static registeredPopovers = new Map();

  static registeredResizeEvents = new Map();

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
    const listener = this.registeredResizeEvents.get(el);
    window.removeEventListener('resize', listener);
    this.registeredResizeEvents.delete(el);
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
      const { top, left } = this.getPopoverPosition(el, popover, position);
      popover.style.top = top;
      popover.style.left = left;
      popover.style.opacity = '1';
    });

    this.registeredPopovers.set(el, popover);
    this.registerOnResizeListener(el, popover, position);
  }

  static registerOnResizeListener(el, popover, position) {
    const listener = () => {
      const { top, left } = this.getPopoverPosition(el, popover, position);
      popover.style.top = top;
      popover.style.left = left;
      popover.style.opacity = '1';
    };

    window.addEventListener('resize', listener);
    this.registeredResizeEvents.set(el, listener);
  }

  static getPopoverPosition(el, popover, position) {
    const elBoundingClientRect = el.getBoundingClientRect();
    const popoverBoundingClientRect = popover.getBoundingClientRect();
    const offset = 10;
    let top;
    let left;
    switch (position) {
      case 'left':
        top = `${elBoundingClientRect.y + (elBoundingClientRect.height - popoverBoundingClientRect.height) / 2}px`;
        left = `${(elBoundingClientRect.x - popoverBoundingClientRect.width) - offset}px`;
        break;
      case 'right':
        top = `${elBoundingClientRect.y + (elBoundingClientRect.height - popoverBoundingClientRect.height) / 2}px`;
        left = `${(elBoundingClientRect.x + elBoundingClientRect.width) + offset}px`;
        break;
      case 'bottom':
        top = `${elBoundingClientRect.y + elBoundingClientRect.height + offset}px`;
        left = `${elBoundingClientRect.x + (elBoundingClientRect.width - popoverBoundingClientRect.width) / 2}px`;
        break;
      default:
        top = `${elBoundingClientRect.y - popoverBoundingClientRect.height - offset}px`;
        left = `${elBoundingClientRect.x + (elBoundingClientRect.width - popoverBoundingClientRect.width) / 2}px`;
        break;
    }

    return { top, left };
  }
}
