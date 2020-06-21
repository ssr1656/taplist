import React from 'react'

const Icon = props => {
  const classes = ['icon', props.className].join(' ')
  return (
    <svg
      className={classes}
      role={props.role || 'presentation'}
      aria-label='[title]'
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 65 95'
    >
      <g>
        <title>{props.title}</title>
        <linearGradient id={"hop-cover" + props.index} x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopOpacity="1" stopColor="#19ea19"/>
            <stop offset={(props.bitterness || 0) + "%"} stopOpacity="1" stopColor="#19ea19" id="F1gst1"/>
            <stop offset={(props.bitterness || 0) + "%"} stopOpacity="0" stopColor="#19ea19" id="F1gst1"/>
            <stop offset="100%" stopOpacity="0" stopColor="#19ea19"/>
        </linearGradient>
        <path fill={"url(#hop-cover" + props.index + ")"} strokeWidth="2" stroke="#fff" d="M36.504 4.773l-6.054.044.044 3.712S9.899 9.37 4.773 36.77l3.536.708S4.243 44.547 7.07 60.81l6.187-2.121v0S12.125 70 14.625 76l7-3.5s4.125 16.25 11 18.125c0 0 9.375-5 13.125-16.875L51.5 76s3.875-6.25 2.75-16.5l5.125 2.75s2.25-10.875-2.625-23.875l3.5-.25s-.319-6.723-3.594-13.832C53.443 17.323 47.387 9.983 36 8.25z"/>
        <path fill="none" strokeWidth="2" stroke="#fff" d="M36.504 4.773l-6.054.044.044 3.712S9.899 9.37 4.773 36.77l3.536.708S4.243 44.547 7.07 60.81l6.187-2.121v0S12.125 70 14.625 76l7-3.5s4.125 16.25 11 18.125c0 0 9.375-5 13.125-16.875L51.5 76s3.875-6.25 2.75-16.5l5.125 2.75s2.25-10.875-2.625-23.875l3.5-.25s-.319-6.723-3.594-13.832C53.443 17.323 47.387 9.983 36 8.25z"/>
        <g fill="none" stroke="#fff" strokeWidth="2"><path d="M6.926 34.135s2.826.943 15.82-3.52c0 0 .525 4.2 6.562 13.257 0 0-5.643 6.825-9.975 8.925l-7.21 3.612"/><path d="M29.308 43.872l3.413 3.937 4.462-4.068s4.857-7.613 6.432-12.994c0 0 4.856 3.019 14.175 4.331M37.183 43.74s3.282 10.37 17.982 13.52"/><path d="M19.202 52.928s1.969 12.075 12.994 21.525c0 0 8.4-5.381 13.781-20.606M25.765 67.497l-4.857 3.412M40.07 66.184l6.17 6.038"/></g>
      </g>
    </svg>
  )
}

export default Icon
