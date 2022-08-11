import { Component } from "react";
import { Container, Content } from "./styles";
import GlobalStyle from "./styles/global";

class App extends Component {
    render() {
        return (
            <Container>
                <Content>Teste</Content>
                <GlobalStyle />
            </Container>
        );
    }
}

export default App;
