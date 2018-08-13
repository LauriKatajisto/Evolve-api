const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });


module.exports = {
  friendlyName: 'Send email',
  inputs: {
    body: {
      type: 'string',
      required: true,
      description: 'Email body',
    },
    title: {
      type: 'string',
      required: true,
      description: 'Email title',
    },
    receivers: {
      type: 'string',
      required: true,
      description: 'Email receivers',
    },
  },
  exits: {
    sendError: {
      description: 'Unable to send.',
    },
  },

  fn: (inputs, exits) => {
    const data = {
      from: 'Evolve-API Mailer <noreply@evolveapp.io>',
      to: inputs.receivers,
      subject: inputs.title,
      text: inputs.body,
    };

    mailgun.messages().send(data, (error, body) => {
      if (error) {
        return exits.sendError(error);
      }
      return exits.success(body);
    });
  },
};
