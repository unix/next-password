import React from 'react'
import { Text } from '@geist-ui/core'

type ProvidedProps = {
  visible?: boolean
}

const Provided: React.FC<ProvidedProps> = ({ visible }) => {
  if (!visible) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '14px',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}>
      <Text small font="12px">
        Protected by{' '}
        <a href="">
          <code>next-password</code>
        </a>
      </Text>
    </div>
  )
}

export default Provided
