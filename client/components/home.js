import React from 'react'
import {
  Image,
  Segment,
  List,
  Header,
  Button,
  Container
} from 'semantic-ui-react'

const Home = () => {
  return (
    <div>
      <Segment padded="very">
        <div>
          <Image centered size="medium" src="homepage1.png" />
          <Segment>
            <Image centered size="massive" src="aboutus2.png" />
          </Segment>
        </div>
      </Segment>
      <div className="footer">
        <Container textAlign="center" style={{color: 'black'}}>
          <Header as="h4" style={{color: '#FFFFFF'}}>
            UFO Tofu
          </Header>
          <List horizontal relaxed>
            <List.Item>
              <Button circular color="linkedin" icon="linkedin" />
              <List.Content>
                <List.Header style={{color: '#FFFFFF'}}>
                  Kirstie Rodriguez
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Button circular color="linkedin" icon="linkedin" />
              <List.Content>
                <List.Header style={{color: '#FFFFFF'}}>
                  Goncagul Ay
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Button circular color="linkedin" icon="linkedin" />
              <List.Content>
                <List.Header style={{color: '#FFFFFF'}}>
                  Veronica Tomchak
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Button circular color="linkedin" icon="linkedin" />
              <List.Content>
                <List.Header style={{color: '#FFFFFF'}}>
                  Teofilo Callanaupa
                </List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Container>
      </div>
    </div>
  )
}

export default Home
