import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import axios from "axios";
import moment from "moment";
class Home extends Component {
  state = {
    articles: [],
    title: "",
    url: "",
    date: "",
    snippet: "",
    queryTerm: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    
  }

  saveArticle = id => {
    API.saveArticle(id) 
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.queryNYT()
    .then(data => {console.log(data);
    this.setState({ articles: data });
    console.log(this.state.articles);
    }
    )};

  queryNYT = () => {
    let query = this.state.queryTerm.trim();
    let start = this.state.startYear.trim() + "0101";
    let end = this.state.endYear.trim() + "1231";
    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': "c876dbe19d0f4ebd9da7a7d8709cb049",
          'q': query,
          'begin_date': start,
          'end_date': end
      }
    })
    .then(function(results){
      console.log(results);
      return results.data.response.docs;
    });
   }


 //https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c876dbe19d0f4ebd9da7a7d8709cb049&q=toes&begin_date=1999&end_date=2000
//
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search the historic NYT for any topic back to 1850</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.queryTerm}
                onChange={this.handleInputChange}
                name="queryTerm"
                placeholder="Search any topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="YYYY (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="YYYY (required)"
              />
              <FormBtn
                disabled={!(this.state.queryTerm && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Submit Query
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.headline.main} from {moment(article.pub_date).format("YYYY")}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
