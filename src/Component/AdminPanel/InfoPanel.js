import React, { useEffect } from 'react'
import Users from './Users'
import Blogs from './Blogs'
import ContectMessage from './ContectMessage'

export default function InfoPanel({info}) {



  return (
    <div>
      {info===undefined ? <Users info={info} /> : null}
      {info === 'Users' ? <Users info={info} /> : null}
      {info === 'Blogs' ? <Blogs/> : null}
      {info === 'Messages' ? <ContectMessage/> : null}
    </div>
  )
}
