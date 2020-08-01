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
  srm = Math.round(srm - 1);
  const beerColor = colorMap[srm]
  return (
    <svg
      className={classes}
      role={props.role || 'presentation'}
      aria-label='[title]'
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox="0 0 65 95"
    >
      <g>
        <title>{props.title}</title>
        <path fill={"#" + beerColor} stroke="#fff" strokeWidth="1.5" d="M44.917 89.858l.324-45.436c-.175-5.65-5.21-8.904-5.385-12.464l-1.722-23.49c2.045-.904.472-3.975.135-4.992 1.228-1.808-.135-1.973-.405-2.257-3.68-.337-5.403-.283-9.435 0 0 0-1.535 1.255 0 2.157.35.621-2.628 3.945 0 5.074l-1.82 23.714c-.526 4.013-4.72 6.189-5.128 11.387l.337 46.307c.01 1.254.525 2.46.788 3.69h21.51c.266-1.228.793-2.432.8-3.69z"/>
      </g>
    </svg>
  )
}

export default Icon
