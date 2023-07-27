import BuildingContainer from './containers/BuildingContainer';
import ConfigContainer from './containers/ConfigContainer';
import { Heading, Container } from 'theme-ui'

function App() {

  return (
    <Container>
      <Heading>Creator panel</Heading>  
        <Container p={2} >
          <ConfigContainer />
        </Container>
        <Container p={2} m={0}>
          <BuildingContainer />
        </Container>
    </Container>
  )
}

export default App
