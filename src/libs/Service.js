import createRequest from './createRequest';

export default class Service {
  static async pingServer() {
    const options = {
      method: 'GET',
      url: 'method=checkServer',
    };

    const data = await createRequest(options);
    return data;
  }

  static async getTickets() {
    const options = {
      method: 'GET',
      url: 'method=allTickets',
    };

    const data = await createRequest(options);
    return data;
  }

  static async getTicketById(id) {
    const options = {
      method: 'GET',
      url: `method=ticketById&id=${id}`,
    };

    const data = await createRequest(options);
    return data;
  }

  static async createTicket(name = '', description = '') {
    const options = {
      method: 'POST',
      url: 'method=createTicket',
      body: {
        name,
        description,
        status: false,
      },
    };

    const data = await createRequest(options);
    return data;
  }

  static async updateStatusById(id, status) {
    const options = {
      method: 'POST',
      url: `method=updateById&id=${id}`,
      body: {
        status: !status,
      },
    };

    const data = await createRequest(options);
    return data;
  }

  static async updateTextById(id, name, description) {
    const options = {
      method: 'POST',
      url: `method=updateById&id=${id}`,
      body: {
        name,
        description,
      },
    };

    const data = await createRequest(options);
    return data;
  }

  static async deleteTicketById(id) {
    const options = {
      method: 'GET',
      url: `method=deleteById&id=${id}`,
    };

    const data = await createRequest(options);
    return data;
  }
}
