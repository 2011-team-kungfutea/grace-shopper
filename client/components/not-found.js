import React from 'react'
import {Image, Header} from 'semantic-ui-react'

export const NotFound = props => {
  return (
    <div id="not-found-page">
      <Image
        className="not-found-image"
        id="not-found-image"
        size="massive"
        src="/ufo-146541_1280.png"
      />
      <div id="not-found-text">
        <Header as="h1">Page Not Found</Header>
        <Header as="h3">... we better get out of here ...</Header>
      </div>
    </div>
  )
}
