
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sentiment').del()
    .then(function () {
      // Inserts seed entries
      return knex('sentiment').insert([
        {
          score: 23,
          label: "negative",
          url: "https://www.bloomberg.com/news/articles/2017-07-10/secret-millions-for-0x00a651d43b6e209f5ada45a35f92efc0de3a5184",
        },
        {
          score: 13,
          label: "negative",
          url: "https://www.businessinsider.com/ethers-value-volatility-investors-staying-put-2017-7",
        },
        {
          score: 14,
          label: "negative",
          url: "https://www.bloomberg.com/news/articles/2017-07-10/bitcoin-risks-splintering-as-civil-war-enters-critical-month",
        },
        {
          score: 11,
          label: "positive",
          url: "https://motherboard.vice.com/en_us/article/nevzbz/this-dj-has-released-the-first-full-length-album-using-the-ethereum-blockchain",
        },
        {
          score: 50,
          label: "negative",
          url: "https://www.news.com.au/finance/economy/world-economy/its-too-late-seven-signs-australia-cant-avoid-economic-apocalypse/news-story/adb1b93996d48e875abd3877ddde5e24",
        },
        {
          score: 8,
          label: "positive",
          url: "https://www.businessinsider.com/bitcoin-ethereum-price-2017-7",
        },
        {
          score: 21,
          label: "positive",
          url: "https://www.complex.com/life/2017/07/anonymous-trader-made-more-than-230-million-in-a-month",
        },
        {
          score: 43,
          label: "negative",
          url: "https://www.businessinsider.com/ethereum-price-is-getting-crushed-2017-7",
        },
        {
          score: 21,
          label: "positive",
          url: "https://mashable.com/2017/07/07/most-promising-cryptocurrencies/",
        },
        {
          score: 6,
          label: "positive",
          url: "https://www.theglobeandmail.com/report-on-business/rob-commentary/poised-to-overtake-bitcoin-this-year-ethereum-is-changing-the-way-we-think-about-cryptocurrency/article35625190/",
        },
        {
          score: 26,
          label: "positive",
          url: "https://www.businessinsider.com/initial-coin-offerings-explained-icos-token-crowdsale-2017-7",
        },
        {
          score: 10,
          label: "positive",
          url: "https://www.cnbc.com/2017/07/11/cryptocurrencies-bitcoin-and-ethereum-as-an-asset-class.html",
        },
        {
          score: 42,
          label: "negative",
          url: "https://qz.com/1023501/ethereum-ico-people-invested-thousands-of-dollars-in-useless-ethereum-token-uet/",
        },
        {
          score: 43,
          label: "negative",
          url: "https://www.inc.com/business-insider/ether-ethereum-market-down.html",
        },
        {
          score: 33,
          label: "negative",
          url: "https://www.cnbc.com/2017/07/11/ethereum-price-crash-continues-bitcoin-moves-higher-cryptocurrency.html",
        },
        {
          score: 7,
          label: "negative",
          url: "https://www.inc.com/brian-d-evans/entrepreneurs-are-making-cryptocurrency-mainstream.html",
        },
        {
          score: 37,
          label: "positive",
          url: "https://www.businessinsider.com/ethereum-price-sends-marketcap-sky-high-vs-bitcoin-price-marketcap-2017-7",
        },
        {
          score: 25,
          label: "positive",
          url: "https://fieldguide.gizmodo.com/how-exactly-do-you-get-rich-of-the-hot-new-cryptocurren-1796758326",
        },
        {
          score: 7,
          label: "positive",
          url: "https://social.techcrunch.com/2017/07/12/behind-the-scenes-with-tezos-a-new-blockchain-upstart/",

        },
        {
          score: 49,
          label: "negative",
          url: "https://www.marketwatch.com/story/ethereum-has-lost-175-billion-in-market-value-in-4-weeks-2017-07-11",
        }
      ]);
    });
};
