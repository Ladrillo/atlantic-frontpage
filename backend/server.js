const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 9009

const server = express()

server.use(express.json())

server.use(express.static(path.join(__dirname, '../dist')))

server.use(cors())

server.use('/api/frontpage', (req, res) => {
  res.json({
    "header": {
      "menu": ["Popular", "Latest", "Newsletters"],
      "logo": "The Atlantic",
      "userOptions": ["Saved Stories", "My Account", "Give a Gift"]
    },
    "mainArticles": [
      {
        "title": "I Wrote George W. Bush's Cheat Sheets. Here's What I Learned.",
        "author": "DAVID FRUM",
        "imageCredit": "Illustration by Matteo Giuseppe Pani"
      },
      {
        "title": "A Baffling Academic Feud Over Income Inequality",
        "subtitle": "Has the rise of the one percent really been debunked?",
        "author": "ROBOT KARMA",
        "imageCredit": "Illustration by Matteo Giuseppe Pani. Source: Getty."
      },
      {
        "title": "Something Went Terribly Wrong With Online Ads",
        "author": "KATE LINDSAY",
        "imageCredit": "Illustration by Matteo Giuseppe Pani"
      },
      {
        "title": "The Right Has Fallen Into Its Own Steele-Dossier-Like Trap",
        "subtitle": "Conservatives were right to warn about dodgy rumors. If only they'd taken their own advice.",
        "author": "DAVID A. GRAHAM",
        "imageCredit": "Illustration by The Atlantic. Source: Pix."
      }
    ],
    "secondaryArticles": [
      {
        "title": "Is Kara Swisher Tearing Down Tech Billionaires—Or Burnishing Their Legends?",
        "subtitle": "She has long sought to be the best-connected of the tough reporters and the toughest of the insiders. Balancing those goals isn't always easy.",
        "author": "HELEN LEWIS",
        "imageCredit": "Photo-Illustration by Cari Vander Yacht"
      },
      {
        "title": "Dear Therapist: I Miss Having Sex",
        "subtitle": "I'm a 70-year-old widow, and I don't know how to get my needs met.",
        "author": "LORI GOTTLIEB",
        "imageCredit": "Bianca Bagnarelli"
      },
      {
        "title": "I Was a Heretic at The New York Times",
        "subtitle": "I did what I was hired to do, and I paid for it.",
        "author": "ADAM RUBENSTEIN",
        "imageCredit": "Illustration by The Atlantic. Source: Getty."
      }
    ],
    "asideArticles": [
      {
        "title": "Defense Contractors Are Bilking the American People",
        "author": "BERNIE SANDERS"
      },
      {
        "title": "The Fairy-Tale Promises of Montessori Parenting",
        "author": "KATE CRAY"
      },
      {
        "title": "A Wild and Dangerous 2024 Experiment",
        "author": "JOHN HENDRICKSON"
      },
      {
        "title": "How Donald Trump Became Unbeatable",
        "author": "SARAH LONGWELL"
      }
    ]
  })
})

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.path} does not exist`,
  })
})

server.use((err, req, res, next) => {
  const message = err.message || 'Unknown error happened'
  const status = err.status || 500
  const reason = err.reason
  const payload = { message }
  if (reason) payload.reason = reason
  res.status(status).json(payload)
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
