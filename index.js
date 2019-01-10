
const Telegraf = require('telegraf')

const token = '792844945:AAEQeknbg3f6ujQE8VQvQ5pOcnOczz30qC0';
const caches = {};
const ADMINS = [
  "alex_9121",
  "longvuong",
  "hoanghalc",
  "KrisP85",
  "vtproduction",
  "hothule",
  "tunght91",
  "bitsave",
  "Marweko1",
  "ngtuna",
  "thanhson1085",
  "anhntv",
  "nguyen5",
  "jkms3",
  "Victor_Ngn"];

const bot = new Telegraf(token);

function contain(msg, c, i) {
  if (i) {
    return msg.indexOf(c) === i
  }
  else {
    return msg.indexOf(c) >= 0;
  }
}

const banWords = [
  'exchange',
  'ex-change',
  'e-xchange',
  'ex change',
  'ex.change',
  'e-xchange',
  'exhcange',
  'e.x.c.h.a.n.g.e',
  'binance',
  'bittrex',
];

function checkMessage(msg) {
  console.log(msg);
  if (!msg) return null;

  msg = msg.toLowerCase();

  for (var i = 0; i < banWords.length; i++) {
    if (
      (contain(msg, banWords[i], 0) || contain(msg, ' ' + banWords[i])) &&
      (
        contain(msg, 'new') ||
        contain(msg, 'list') ||
        contain(msg, 'when') ||
        contain(msg, 'come') ||
        contain(msg, 'coming')
      )
    )
    {
      return banWords[i];
    }
  }

  return null;
}

bot.on('message', ctx => {
  var msg = ctx.update.message.text || '';
  var banWord = checkMessage(msg);
  if (banWord) {
    var from = ctx.update.message.from;
    if (ADMINS.indexOf(from.username) >= 0 || from.is_bot) {
      return;
    }
    if (caches[from.username]) {
      if (new Date().getTime() - caches[from.username] > 12 * 60 * 60 * 1000) {
        caches[from.username] = new Date().getTime();
        ctx.reply('Exchange listings will never be disclosed, or discussed by any team member in this chat. Follow our blog, Telegram ANN, or signal channel to receive the latest update', {
          reply_to_message_id: ctx.update.message.message_id
        });
      }
    }
    else {
      caches[from.username] = caches[from.username] || new Date().getTime();
      ctx.reply('Exchange listings will never be disclosed, or discussed by any team member in this chat. Follow our blog, Telegram ANN, or signal channel to receive the latest update', {
        reply_to_message_id: ctx.update.message.message_id
      });
    }
  }
});


bot.startPolling()