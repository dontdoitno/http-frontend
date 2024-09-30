import './ticket.css';

export default class Ticket {
  constructor(name, created, status = false, description = '', id = null) {
    this.name = name;
    this.created = created;
    this.status = status;
    this.description = description;
    this.id = id;

    this.createTicketElement();
  }

  createTicketElement() {
    this.ticketElement = document.createElement('li');
    this.ticketElement.classList.add('tickets__item', 'ticket');

    if (this.id) {
      this.ticketElement.dataset.id = this.id;
    }

    this.createTicketContent();
    this.createTicketDescription();

    this.ticketElement.append(this.ticketContent, this.ticketDescription);
  }

  createTicketContent() {
    this.ticketContent = document.createElement('div');
    this.ticketContent.classList.add('ticket__content');

    this.createTicketStatus();
    this.createTicketName();
    this.createTicketCreated();
    this.createTicketUpdate();
    this.createTicketDelete();
  }

  createTicketStatus() {
    this.ticketStatus = document.createElement('div');
    this.ticketStatus.classList.add('ticket__btn', 'ticket__btn_status');

    if (this.status) {
      this.ticketStatus.classList.add('done');
    }

    this.ticketContent.append(this.ticketStatus);
  }

  createTicketName() {
    this.ticketName = document.createElement('p');
    this.ticketName.classList.add('ticket__short-description');
    this.ticketName.textContent = this.name;

    this.ticketContent.append(this.ticketName);
  }

  createTicketCreated() {
    this.ticketCreated = document.createElement('time');
    this.ticketCreated.classList.add('ticket__date');

    const date = this.created ? new Date(this.created) : Date.now();
    const dateAttr = date.toLocaleString('ru-Ru', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const dateText = date.toLocaleString('ru-Ru', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.ticketCreated.dateTime = dateAttr.split('.').reverse().join('-');
    this.ticketCreated.textContent = dateText.replace(',', '');

    this.ticketContent.append(this.ticketCreated);
  }

  createTicketUpdate() {
    this.ticketUpdate = document.createElement('div');
    this.ticketUpdate.classList.add('ticket__btn', 'ticket__btn_update');

    this.ticketContent.append(this.ticketUpdate);
  }

  createTicketDelete() {
    this.ticketDelete = document.createElement('div');
    this.ticketDelete.classList.add('ticket__btn', 'ticket__btn_delete');

    this.ticketContent.append(this.ticketDelete);
  }

  createTicketDescription() {
    this.ticketDescription = document.createElement('p');
    this.ticketDescription.classList.add('ticket__full-description', 'hidden');
    this.ticketDescription.textContent = this.description;
  }

  render(container) {
    container.append(this.ticketElement);
  }

  getTicketElement() {
    return this.ticketElement;
  }
}
