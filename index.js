
const Telegraf = require('telegraf')

const token = '1664736510:AAGOgYHsr8MyHzTUjgbgIOotPGvXliVJwYI';
const caches = {};
caches['telegram_rule_from_tomochain'] = 0;
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
        console.log('>>>', msg);
        caches[from.username] = new Date().getTime();
        ctx.reply('Exchange listings will never be disclosed, or discussed by any team member in this chat. Follow our blog, Telegram ANN, or signal channel to receive the latest update', {
          reply_to_message_id: ctx.update.message.message_id
        });
      }
      else {
        console.log('[x]', msg);
      }
    }
    else {
      console.log('>>>', msg);
      caches[from.username] = caches[from.username] || new Date().getTime();
      ctx.reply('Exchange listings will never be disclosed, or discussed by any team member in this chat. Follow our blog, Telegram ANN, or signal channel to receive the latest update', {
        reply_to_message_id: ctx.update.message.message_id
      });
    }
  }
  else if (new Date().getTime() - caches['telegram_rule_from_tomochain'] > 3 * 60 * 60 * 1000) {
/*    var msg = `🚩 TomoChain friendly reminder:
- No spamming, harassing, or inappropriate comments. Please respect all other members.
- Disagreements and constructive criticism are acceptable. No FUD/spreading of false information. No unauthorized bots.
- Keep the chat focused on TomoChain.
- No advertising of other projects, or links/referrals;
- No advertising masternodes for anyone in the main chat. Regarding the MasterNode owners & voters communication, please join @TomoChain_MN_Owners_Voters
- Although token price discussion is not banned explicitly, we encourage you to join TomoChain Price Talk @TomoChainTraders to discuss further.
- Please follow any other rules set by admins in each chat.

🔹 Channels are run by Tomo Team
- TomoChain Announcemnt @tomochainchannel
- TomoChain Global Chat @tomochain
- TomoChain Vietnam: @tomochainvietnam
- TomoChain Japan @tomochainjapan
- TomoChain Masternode Support: Private chat
🔹 Other channels are run by Tomo community
- MasterNode owners & voters communication: @TomoChain_MN_Owners_Voters
- TomoChain Price Talk @TomoChainTraders
- TomoChain Fr: @tomo_FR
- TomoChain Dutch: @tomochainNL
- TomoChain Spanish: @tomoesp
- TomoChain Turkey: @tomochainTurkiye` */
    var msg = `Welcome to Lition's official group!
[Lition.io](Lition.io) (LIT) is developing a public-private blockchain infrastructure with deletable data features to enable enterprises to bring legally compliant blockchain applications to the mass-market.
Token Information:
Symbol: LIT
Token Contract: 0x763Fa6806e1acf68130D2D0f0df754C93cC546B2
More token info: [Coingecko](https://www.coingecko.com/en/coins/lition)
Official Exchange Partners
[Uniswap](https://app.uniswap.org/#/swap?outputCurrency=0x763fa6806e1acf68130d2d0f0df754c93cc546b2), TomoDEX, Idex, Binance DEX, Bidesk, Bibox
Other useful Links:
[Token bridge](https://token-bridge.lition.io/) | [Whitepaper](https://lition.io/docs/Lition_Whitepaper.pdf) | [Technical Paper](https://lition.io/docs/Lition_TechnicalWhitePaper.pdf) | [Website](https://lition.io/)
Please note: DYOR! Lition.io was established in 2018. We are developing private side chains with deletable data features on top of the Ethereum Blockchain.`

    caches['telegram_rule_from_tomochain'] = new Date().getTime();
    ctx.reply(msg);
  }
});

console.log('Started')
bot.startPolling();
