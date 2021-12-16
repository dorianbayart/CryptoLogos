'use strict'

import cheerio from 'cheerio'
import { curly } from 'node-libcurl'
import fetch from 'node-fetch'
import fs from 'fs'
import makeDir from 'make-dir'
import os from 'os'

const SUBFOLDER = 'dist'
const INTERVAL = 1000

const CHAINS = {
  ETHEREUM: {
    path: 'ethereum',
    explorer: 'https://etherscan.io',
    list: 'https://api.dexpairs.xyz/list'
  },
  POLYGON: {
    path: 'polygon',
    explorer: 'https://polygonscan.com',
    list: 'https://api.dexpairs.xyz/quickswap/list'
  },
  BSC: {
    path: 'bsc',
    explorer: 'https://bscscan.com',
    list: 'https://api.dexpairs.xyz/pancake/list'
  },
  FANTOM: {
    path: 'fantom',
    explorer: 'https://ftmscan.com',
    list: 'https://api.dexpairs.xyz/spiritswap/list'
  }
}


const args = process.argv.slice(2)
const chain = CHAINS[Object.keys(CHAINS).find(chain => CHAINS[chain].path === args[0])]

let total = 0
let imgDownloaded = 0
let errors = 0
let alreadyExists = 0
let timer = 0

fetch(chain.list)
  .then(res => res.json())
  .then(async (json) => {
    const path = await makeDir(SUBFOLDER + '/' + chain.path)

    if(Object.keys(json).length > 0) {
      fs.writeFile(path + '/map.json', JSON.stringify(json), () =>
        {}
      )
    } else {
      json = JSON.parse(fs.readFileSync(path + '/map.json'))
    }

    total = Object.keys(json).length
    Object.keys(json).forEach(async (tokenAddress, i) => {
      tokenAddress = tokenAddress.toLowerCase()
      if (!fs.existsSync(path + '/' + tokenAddress + '.png')) {
        timer += 1
        setTimeout(async function() {
          // console.log(tokenAddress)
          await curly.get(chain.explorer + '/token/' + tokenAddress)
            .then(({ statusCode, data }) => data)
            .then(async (html) => {
              const $ = cheerio.load(html)
              if($('img.u-sm-avatar').length === 0) {
                console.log('No picture found in the page for: ' + tokenAddress)
                return
              }
              const imgSrc = $('img.u-sm-avatar')[0].attribs.src
              // console.log(imgSrc)

              await curly.get(chain.explorer + imgSrc)
                .then(({ statusCode, data }) => data)
                .then(async (buffer) => {

                  // console.log(path + '/' + tokenAddress + '.png')
                  fs.writeFile(path + '/' + tokenAddress + '.png', buffer, () => {
                    imgDownloaded += 1
                    logStatus()
                  }
                  )
                })
            })
            .catch(error => {
              console.log(tokenAddress, error)
              errors += 1
              logStatus()
            })
        }, timer * 1250)

      } else {
        // already exists
        alreadyExists += 1
        logStatus()
      }
    })

  })

function logStatus() {
  console.log('Total: ' + total + ' | Already exists: ' + alreadyExists + ' | Downloaded: ' + imgDownloaded + ' | Errors: ' + errors)
}
