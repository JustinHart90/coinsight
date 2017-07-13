
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          article_count: 5,
          date: "2017-07-13",
          event_id: "eng-3280651",
          img: "https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/0_l4g14wtq.jpg",
          score: "0",
          summary: "American Airlines Inc (AAL) has heated up its war of words against Qatar Airways in a regulatory filing that hits back at the Gulf carrier's plans to buy shares in the biggest U.S. airline. American said Qatar Airways had revised its antitrust filing with U.S. regulators seeking clearance to buy up to a 10% stake in the carrier, but said no further details of the changes to the filing were given. American reiterated that the proposed investment was not solicited by American Airlines and would in",
          title: "It's Getting Tense Between American Airlines and Qatar Airways"
        },
        {
          article_count: 11,
          date: "2017-07-12",
          event_id: "eng-3278229",
          img: "https://s3.reutersmedia.net/resources/r/?m=02&d=20170712&t=2&i=1192696416&w=&fh=545px&fw=&ll=&pl=&sq=&r=LYNXMPED6B1CK",
          score: "86.2",
          summary: "By Brenna Hughes Neghaiwi ZURICH, July 12 (Reuters) - Wealthy clients of Swiss private bank Falcon will be able to store and trade bitcoins via their cash holdings with the bank from Wednesday, a move that signals the traction the virtual currency is gaining even in slow-changing asset management. The group's new blockchain asset management service is being offered in partnership with cryptocurrency broker Bitcoin Suisse. 'We are proud to be the first-mover in the Swiss private banking area to...'",
          title: "Swiss private bank Falcon introduces bitcoin asset management"
        },
        {
          article_count: 23,
          date: "2017-07-12",
          event_id: "eng-3278248",
          img: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ipUj65CUwh14/v1/1200x800.jpg",
          score: "142.8",
          summary: "The 20th anniversary of the reunification of Hong Kong with the mainland. [Xinhua] The 20th anniversary of the reunification of Hong Kong with the mainland has come and gone. It was as much the grand affair it was planned to be. However, as July 1 approached, the Western press went into overdrive to make it appear as an event not worthy of memory or celebration. Some big networks outdid each other, looking and sounding as if they were competing for best portrayal of the July 1, 1997 British 'ha'",
          title: "HKSAR: Stolen jewel back in China's crown!"
        },
        {
          article_count: 13,
          date: "2017-07-12",
          event_id: "eng-3278313",
          img: "http://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBxk42d.img?h=100&amp;w=100&amp;m=6&amp;q=60&amp;o=f&amp;l=f&amp;x=503&amp;y=111",
          score: "25.6",
          summary: "A former aerospace engineer of NASA was arrested on Wednesday along with a businessman by the Telangana excise authorities for their alleged involvement in a high-end narcotics racket busted here last week. With the two new arrests, the total number of persons held in the racket has gone up to 12. Aerospace engineer, Dundu Anish, a US citizen, was allegedly found in possession of 16 units of LSD, a high-end drug, said the prohibition and excise department officials. Anish had studied at Doon S",
          title: "Ex-NASA scientist held in Hyderabad drug racket"
        },
        {
          article_count: 7,
          date: "2017-07-12",
          event_id: "eng-3278347",
          img: "http://img.etimg.com/thumb/msid-59566274,width-672,resizemode-4/bitcoin_getty.jpg",
          score: "11.9",
          summary: "NEW DELHI: The Reserve Bank is keeping a close watch on transactions involving cryptocurrencies, Governor Urjit Patel is understood to have told the members of the Parliamentary panel on finance today. During the more than three-hour long meeting of the Standing Committee on Finance here, the members raised concerns about rising number of transactions in various cryptocurrencies such as Bitcoin, Ethereum, Zcash, litecoin and NEM. They also wanted to know from the governor whether the use of cry",
          title: "RBI keeping a close watch on cryptocurrencies",
        },
        {
          article_count: 16,
          date: "2017-07-12",
          event_id: "eng-3281307",
          img: "https://verifiedinvesting.com/uploads/files/DE07.10.2017.PNG",
          score: "0.4",
          summary: "You will receive a download link right in your email inbox for each of the free reports that you choose. This article is published in collaboration with Scutify, where you can find real-time markets and stock commentary from Robert Marcin, Cody Willard and others. Download the Scutify iOS App, the Scutify Android App or visit Scutify.com. After Nevada voters approved a measure to legalize recreational marijuana in November 2016, the state will be the fifth state with an operational recreationa",
          title: "Nevada Declares A State Of Emergency"
        },
        {
          article_count: 9,
          date: "2017-07-12",
          event_id: "eng-3278365",
          img: "https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/0_044ulx6e.jpg",
          score: "0",
          summary: "Amid reports of glitches with the upcoming Apple (AAPL) iPhone 8, TheStreet's Action Alerts PLUS Portfolio Manager Jim Cramer said Apple won't release a product unless it's perfect. More of What's Trending on TheStreet: This Is Facebook's Next Major Catalyst Walmart Could Collapse Soon Bitcoin Has Crashed Into a Bear Market -- What You Need to Know Stocks Higher as Yellen Backs Gradual Rate Increases, Balance Sheet Unwind in 2017 Why Further Bruising Downside in General Electric Looks Highly Un",
          title: "Apple Won't Release a Product Unless It's Perfect, Jim Cramer Says"
        },
        {
          article_count: 46,
          date: "2017-07-11",
          event_id: "fra-274432",
          img: "http://img.lemde.fr/2017/07/11/229/0/2415/1207/644/322/60/0/14e8a12_GGGTOK500_JAPAN-BITCOIN-MTGOX_0711_11.JPG",
          score: "116.2",
          summary: "Bitcoin's price could be in for a big drop, and that's because the cryptocurrency is facing a potentially contentious upgrade to its core software in August. If you haven't heard about the impending deadline for a 'user-activated soft fork', here's the story: For close to six years, the Bitcoin community has struggled to arrive at a consensus on how to scale the 1MB block size to meet growing popularity and adoption. A proposed user-activated soft fork (UASF) is an attempt to nudge the Bitcoin n",
          title: "Why Bitcoin's value could get even more volatile"
        },
        {
          article_count: 6,
          date: "2017-07-11",
          event_id: "eng-3279385",
          img: "https://www.incimages.com/uploaded_files/image/1940x900/getty_698073368_251211.jpg",
          score: "157.8",
          summary: "BlackRock, the $5 trillion asset manager, has not traditionally paid much attention to cryptocurrencies such as Bitcoin and Ethereum. Now that the prices of those blockchain-based currencies have risen exponentially in recent months, however, even BlackRock's top economists are watching closely -- and with some concern. Asked by Fortune to address cryptocurrency at a press briefing Tuesday, Richard Turnill, BlackRock's global chief investment strategist, waded into what he called 'dangerous terr'",
          title: "BlackRock's Top Economist Thinks Bitcoin and Ethereum Look Like a Bubble"
        },
        {
          article_count: 17,
          date: "2017-07-11",
          event_id: "eng-3280542",
          img: "https://i.guim.co.uk/img/media/26e3a105a3d82ed04187023e9b05aee8e50e213b/87_0_2826_1696/master/2826.jpg",
          score: "151.1",
          summary: "Blockchain-enabled energy trading could help lower carbon emissions but efficiency and privacy issues must first be overcome the blockchain. It is the much-hyped, virtually foolproof digital ledger that allows cryptocurrencies such as bitcoin to flourish without the need for banks and governments, and promises to enable everything from the creation of ethical supply chains, to the ensuring of instantaneous payment on delivery of goods and services agreed to in immutable smart contracts.",
          title: "Could a blockchain-based electricity network change the energy market?"
        },
        {
          article_count: 5,
          date: "2017-07-11",
          event_id: "eng-3280543",
          img: "https://techcentral.co.za/wp-content/uploads/2017/07/blockchain-2156-1120.jpg",
          score: "48.9",
          summary: "South Africa's largest and notoriously competitive financial services firms have come together to set up a national blockchain. The South African Financial Blockchain Consortium (SAFBC), comprising 22 industry heavyweights, the South African Reserve Bank and the Financial Services Board as observers, is currently exploring the technology powering the US$41bn bitcoin market. Blockchain technology is widely expected to up-end the global economy by revolutionising the way in which companies and co",
          title: "SA banks to set up national blockchain - TechCentral"
        },
        {
          article_count: 10,
          date: "2017-07-11",
          event_id: "eng-3276721",
          img: "https://s4.reutersmedia.net/resources/r/?m=02&d=20170711&t=2&i=1192562937&w=&fh=545px&fw=&ll=&pl=&sq=&r=LYNXMPED6A1M8",
          score: "36.4",
          summary: "But the risk to the broader financial system if Bitcoin crashes appears limited Markets Insider NEW YORK, July 11 (Reuters) - BlackRock Inc's global chief investment strategist on Tuesday suggested that loose monetary policy may have aided speculation in digital currencies like bitcoin, but he said the risk to the broader financial system appears limited. The strategist, Richard Turnill, said it might be possible to view price movements in blockchain-based cryptocurrencies as influenced by the ",
          title: "BLACKROCK: The bitcoin chart looks 'pretty scary'"
        },
        {
          article_count: 10,
          date: "2017-07-11",
          event_id: "eng-3276531",
          img: "http://static4.businessinsider.com/image/5964897cd62e70311e09827c-1190-625/cryptocurrency-ethereum-is-crashing.jpg",
          score: "237.1",
          summary: "This Was Always Going To Happen For the last six weeks, cryptocurrency has been all over the place like an infection... currency markets, GPU mining, global GPU shortages, and more. It's a volatile market as it's open 24/7 and doesn't close like regular FIAT-based trading markets. The latest trend is Ethereum mining (for the most part, anyway) and the global GPU shortage of the last 5-6 weeks. Ethereum mining and its impending DAG increase (the difficulty in which Ethereum mining is set at) beg",
          title: "Ethereum Mining is Dead: Price Drops, Difficulty Booms"
        },
        {
          article_count: 17,
          date: "2017-07-11",
          event_id: "eng-3276157",
          img: "http://i.dailymail.co.uk/i/pix/2017/07/12/18/42434C2800000578-0-image-a-7_1499881211200.jpg",
          score: "325.3",
          summary: "The Series B round brings the company's total investments up to $83 million Fintech app Revolut has raised $66 million in a venture capital investment in order to expand its operations further across Asia and North America. The London-based business, which offers foreign currency to consumers abroad at the interbank rate available on the financial markets, raised the money in a Series B venture capital, bringing its total investments up to $83 million. 'Asia and North America are far from immu'",
          title: "Revolut raises $66 million in venture capital investment; eyes expansion in Asia, US"
        },
        {
          article_count: 27,
          date: "2017-07-11",
          event_id: "eng-3274734",
          img: "https://i.amz.mshcdn.com/DFokRZnIK2qoqRWY9Oy9G16b9wM=/640x360/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F51290%2F2d0625cb-d4ff-4eab-8de8-eeda7522a01c.jpg",
          score: "404",
          summary: "Alternative cryptocurrencies and the price of ether continue to bleed this week, as traders position themselves for what could be the biggest event trade in cryptocurrency history: a change in the Bitcoin software. On July 21, a new type of software called SegWit2x will be rolled out and depending on which Bitcoin miners - those with the computing power to verify the legitimacy of the blockchain - accept it, Bitcoin could be in for some serious price adjustments. Bitcoin slumped 4.5 per cent to",
          title: "Bitcoin poised for 'civil war' over software changes"
        },
        {
          article_count: 9,
          date: "2017-07-11",
          event_id: "eng-3275065",
          img: "https://tctechcrunch2011.files.wordpress.com/2016/12/blockchain.png?w=764&h=400&crop=1",
          score: "132.3",
          summary: "By Anna Irrera NEW YORK, July 11 (Reuters) - The Hyperledger Project, a group led by the Linux Foundation, has released its first blockchain code that can be used by large businesses to build software. The group, whose more than 120 members include International Business Machines Corp, Cisco Systems Inc, the Bank of England and JPMorgan Chase &amp; Co, said on Tuesday that it had released the first version of Hyperledger Fabric, a type of distributed ledger code. The developers involved in the",
          title: "Hyperledger releases its first production ready blockchain"
        },
        {
          article_count: 7,
          date: "2017-07-10",
          event_id: "eng-3278397",
          img: "http://static1.businessinsider.com/image/596657edabc1c884058b4bff-1190-625/silicon-valley-is-hot-on-a-new-kind-of-cryptocurrency-that-could-become-100x-its-current-value.jpg",
          score: "463.2",
          summary: "An anonymous cryptocurrency trader who goes by the username of 0x00A651D43B6e209F5Ada45A35F92EFC0De3A5184 just flipped $55 million of paper money into $283 million in a little over a month of online trading. Due to the secretive nature of the cryptocurrency world, the internet only found out about this incredible fact because the user bragged about their 413 percent profit on a June 11 Instagram in Indonesian. As Bloomberg reports, the now-deleted Instagram post was of a series of photos that...",
          title: "An Anonymous Trader Just Made More Than $230 Million in a Month"
        },
        {
          article_count: 6,
          date: "2017-07-10",
          event_id: "eng-3278998",
          img: "https://venturebeat.com/wp-content/uploads/2017/07/ukraine-atm-petya-ransomware-e1498578179223.jpg?fit=1600%2C900&strip=all&w=640",
          score: "44.3",
          summary: "The Petya hack may not have turned out to be the global phenomenon many feared, but the ransomware attack still has Ukraine reeling. Nick Bilogorskiy, a Ukrainian cybersecurity expert and cofounder of San Jose-based Cyphort, said in a recent email interview that his native country is still trying to fully recover from an attack that hit companies, bank machines, and its infrastructure. The country was forced to extend its tax deadline to July 15, he noted, due to the attack. Indeed, many have n",
          title: "While world moves on from Petya hack, Ukraine still suffering after shocks"
        },
        {
          article_count: 19,
          date: "2017-07-10",
          event_id: "eng-3273174",
          img: "https://techspot-static-xjzaqowzxaoif5.stackpathdns.com/images2/downloads/topdownload/2014/06/amd.png",
          score: "84.5",
          summary: "AMD's upcoming Radeon RX Vega is so close I can almost smell the PCB, and now we have news of 3 versions of Radeon RX Vega that gamers will have to choose from, something that we've heard previously. The names being used from 3DCenter are: Vega XTX, Vega XT, and Vega XL. The cut-down Radeon RX Vega XL product reportedly has 3584 stream processors and a 285W TDP, with what I'm sure will be 8GB of HBM2, and I'm going out on a limb by saying this will be the GTX 1070 competitor. I'm hoping that AMD",
          title: "AMD Radeon RX Vega: XTX, Vega XT, and Vega XL teased"
        },
        {
          article_count: 10,
          date: "2017-07-10",
          event_id: "eng-3278398",
          img: "https://techspot-static-xjzaqowzxaoif5.stackpathdns.com/images2/downloads/topdownload/2014/06/amd.png",
          score: "617.8",
          summary: "After Dread Pirate Roberts, mystery still dogs transactions An unknown cryptocurrency trader turned $55 million of paper wealth into $283 million in just over a month. The only clue about this person or persons, beyond a virtual wallet with the identification code",
          title: "Secret Millions for 0x00A651D43B6e209F5Ada45A35F92EFC0De3A5184"
        }
      ]);
    });
};
