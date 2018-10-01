import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Saved from "../Saved";
import axios from "axios";
import moment from "moment";

class Home extends Component {
  state = {
    articles: [],
    id: "",
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

 

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.queryNYT()
    .then(data => {
    this.setState({ articles: data });
    console.log(this.state.articles);
    }
    )};

  handleClick = (event, i) => {
    console.log(i);
    API.saveArticle({
      id: this.state.articles[i]._id,
      title: this.state.articles[i].headline.main,
      url: this.state.articles[i].web_url,
      date: moment(this.state.articles[i].pub_date).format("MM/DD/YYYY"),
      snippet: this.state.articles[i].snippet
    })
    .then(
      res => {
        console.log(res);
        // this.loadArticles();
      })
    .catch(err => console.log(err));
  };

  // loadArticles = () => {
  //   API.getArticles()
  //     .then(res =>
  //       this.setState({ articles: res.data, title: "", url: "", date: ""})
  //     )
  //     .catch(err => console.log(err));
  // };

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

 

  render() {
    return (
      <Container>
        <Row>
          <Col>
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
          <Col>
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map((article, i) => (
                  <ListItem key={article._id}>
                     <em>{article.headline.main}</em>
                      <ul id="resultUl">
                        <li>{moment(article.pub_date).format("MMMM Do, YYYY")}</li>
                        <li>{article.snippet}</li>
                        <li><a href={article.web_url}>Read Full Article</a></li>
                      </ul>
                    <SaveBtn onClick={
                      (e)=>{this.handleClick(e, i)}
                      } />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Saved></Saved>
        </Row>
      </Container>

    );
  }
}

export default Home;
