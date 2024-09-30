export default class TicketsContainer {
  constructor() {
    this.ticketsContainer = document.createElement('ul');
    this.ticketsContainer.classList.add('tickets');
    this.ticketsContainer.addEventListener('mousedown', (event) => event.preventDefault());
  }

  getTicketsContainerElement() {
    return this.ticketsContainer;
  }

  render(container) {
    container.append(this.ticketsContainer);
  }

  setClickEvent(handler) {
    this.handler = handler;
    this.ticketsContainer.addEventListener('click', this.handler);
  }
}
