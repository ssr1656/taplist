import React from 'react'

const Icon = props => {
  const classes = ['icon', props.className].join(' ')
  // TO-DO : find a better way to change color
  const colorMap = [
    'f7f4b5',
    'f2df74',
    'e9cd5b',
    'e5be47',
    'ddab34',
    'd39b2e',
    'cb8e2a',
    'c17f2a',
    'bb732a',
    'a75925',
    'ad6227',
    'b46b28',
    'a8592d',
    '964520',
    '984921',
    '964620',
    '903f1e',
    '8d3d1e',
    '89391e',
    '84351c',
    '7f2f1c',
    '7b2b1d',
    '762b1d',
    '71261b',
    '6c2519',
    '672517',
    '632214',
    '611e14',
    '5c1d15',
    '5c1d15',
    '571715',
    '531613',
    '501413',
    '4d1114',
    '632214',
    '421213',
    '401615',
    '3a1416',
    '341415',
    '241313'
  ]
  let srm = Number(props.srm)
  if(srm < 1) {
    srm = 1;
  } else if (srm > 40) {
    srm = 40;
  }
  const beerColor = colorMap[srm]
  return (
    <svg
      className={classes}
      role={props.role || 'presentation'}
      aria-label='[title]'
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox="0 0 43.656 78.052"
    >
      <g>
        <title>{props.title}</title>
        <path fill={"#" + beerColor} stroke="#fff" strokeWidth="1.5" d="M40.562 4.633l-1.8 11.086c3.552 8.997-.473 15.626-.473 15.626l-2.96 41.434c-4.735 1.42-27.464 0-27.464 0L4.787 30.753a15.233 15.233 0 01-1.134-3.208c-1.391-6.007 1.283-11.037.779-11.945C3.84 14.535 2.815 4.633 2.815 4.633s11.727-.905 37.747 0z"/>
      </g>
    </svg>
  )
}

export default Icon
