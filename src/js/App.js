import AddButton from '../components/addButton/AddButton';
import Form from '../components/form/Form';
import Service from '../libs/Service';
import ServerConnection from '../components/serverConnection/ServerConnection';
import Ticket from '../components/ticket/Ticket';
import TicketsContainer from '../components/ticketContainer/TicketsContainer';

export default class App {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }

    this.container = container;
    this.addBtn = new AddButton();
    this.ticketsContainerFactory = new TicketsContainer();
    this.ticketsContainer = this.ticketsContainerFactory.getTicketsContainerElement();
  }

  async init() {
    const server = await Service.pingServer();

    if (server.status === 520) {
      this.serverConnection = new ServerConnection();
      this.serverConnection.render(this.container);
      return;
    }

    this.render();
    this.setEvents();
  }

  render() {
    this.addBtn.render(this.container);
    this.ticketsContainerFactory.render(this.container);
    this.renderTickets();
  }

  async renderTickets() {
    const allTickets = await Service.getTickets();

    if (!allTickets.error) {
      allTickets.forEach((obj) => {
        const {
          id, name, description, status, created,
        } = obj;

        const ticket = new Ticket(name, created, status, description, id);
        ticket.render(this.ticketsContainer);
      });
    }
  }

  setEvents() {
    this.addBtn.setClickEvent(this.onAddBtnClick.bind(this));
    this.ticketsContainerFactory.setClickEvent(this.onTicketClick.bind(this));
  }

  onAddBtnClick() {
    this.form = new Form();
    this.form.createTicketForm();

    this.onAddTicket = this.onAddTicket.bind(this);
    this.form.setSubmitEvent(this.onAddTicket);
  }

  async onAddTicket(event) {
    event.preventDefault();

    const name = this.form.getTicketName();
    const description = this.form.getTicketDescription();

    if (!name) {
      return;
    }

    const ticketObjInfo = await Service.createTicket(name, description);

    if (!ticketObjInfo.error) {
      const { id, created, status } = ticketObjInfo;
      const ticket = new Ticket(name, created, status, description, id);
      ticket.render(this.ticketsContainer);
    }

    this.form.onFormClose();
  }

  async onTicketClick(event) {
    const { target } = event;

    this.clickedTicket = target.closest('.ticket');
    this.id = this.clickedTicket.dataset.id;

    if (target.classList.contains('ticket__btn_status')) {
      const clickedTicketData = await Service.getTicketById(this.id);
      if (!clickedTicketData.error) {
        const { status } = clickedTicketData;
        const data = await Service.updateStatusById(this.id, status);
        if (!data.error) {
          target.classList.toggle('done');
        }
      }
    } else if (target.classList.contains('ticket__btn_update')) {
      const clickedTicketData = await Service.getTicketById(this.id);
      if (!clickedTicketData.error) {
        const { name, description } = clickedTicketData;
        this.form = new Form();
        this.form.changeTicketForm(name, description);
        this.onUpdateTicket = this.onUpdateTicket.bind(this);
        this.form.setSubmitEvent(this.onUpdateTicket);
      }
    } else if (target.classList.contains('ticket__btn_delete')) {
      this.form = new Form();
      this.form.removeTicketForm();
      this.onDeleteTicket = this.onDeleteTicket.bind(this);
      this.form.setSubmitEvent(this.onDeleteTicket);
    } else {
      this.clickedTicket.querySelector('.ticket__full-description').classList.toggle('hidden');
    }
  }

  async onUpdateTicket(event) {
    event.preventDefault();

    const name = this.form.getTicketName();
    const description = this.form.getTicketDescription();

    if (!name) {
      return;
    }

    const data = await Service.updateTextById(this.id, name, description);

    if (!data.error) {
      const newTicketData = await Service.getTicketById(this.id);

      if (!newTicketData.error) {
        const { created, status } = newTicketData;
        const newTicket = new Ticket(name, created, status, description, this.id);
        this.clickedTicket.after(newTicket.getTicketElement());
        this.clickedTicket.remove();
      }
    }

    this.form.onFormClose();
  }

  async onDeleteTicket(event) {
    event.preventDefault();

    const data = await Service.deleteTicketById(this.id);

    if (!data.error && data.status === 204) {
      this.clickedTicket.remove();
    }

    this.form.onFormClose();
  }
}
