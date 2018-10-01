import React, { Component } from "react";
import { Col, Row } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { List, ListItem } from "../../components/List";
import moment from "moment";

class Saved extends Component {
  state = {
    articles: [],
    title: "",
    url: "",
    date: ""
   };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", url: "", date: "", snippet: ""})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      
        <Row>
          <Col>
            <Jumbotron>
              <h1>
                Saved Articles
              </h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                 <ListItem key={article._id}>
                  <em>{article.title}</em>
                  <ul id="resultUl">
                    <li>{moment(article.date).format("MMMM Do, YYYY")}</li>
                    <li>{article.snippet}</li>
                    <li><a href={article.url}>Read Full Article</a></li>
                  </ul>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
       </Row>
      
    );
  }
}

export default Saved;




