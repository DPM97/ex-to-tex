const readline = require('readline')

const parse = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = []

  console.log('Copy ya cells (press enter 2x):')
  rl.prompt();
  console.log('\n')

  return new Promise(resolve => {
    rl.on('line', function (cmd) {
      if (cmd === '') {
        resolve(input.map(a => a.split('\t')))
      } else {
        input.push(cmd)
      }
    })
  })
}

const genTabular = (length) => (`\\begin{tabular}{${(() => {
  let str = ''
  for (let i = 0; i < length; i += 1) {
    str += i > 0 ? 'c|' : '|'
  }
  return str
})()}}`)

const genHeader = (row) => `${row.map((v, i) => {
  let str = ''
  if (i !== 0) str += '& '
  str += `\\textbf{${v}}`
  return str
}).join(' ')} \\\\`

const genRow = (row) => `${row.map((v, i) => {
  let str = ''
  if (i !== 0) str += '& '
  str += v
  return str
}).join(' ')} \\\\`

const format = (data) => {
  const output = [genTabular(data.length), '\\hline', genHeader(data[0]), '\\hline']

  for (let i = 1; i < data.length; i += 1) {
    output.push(genRow(data[i]))
  }
  output.push('\\hline\n\\end{tabular}')

  return output.join('\n')
}

(async () => {
  const data = await parse()

  console.log('\n\n')
  console.log(format(data))
  console.log('\n\n')

  process.exit(0)
})()