import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // 
  // queryNYT: function(query, start, end) {
  //   let query = query.trim();
  //   let start = start.trim() + "0101";
  //   let end = end.trim() + "1231";
  //   return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
  //     params: {
  //         'api-key': "c876dbe19d0f4ebd9da7a7d8709cb049",
  //         'q': query,
  //         'begin_date': start,
  //         'end_date': end
  //     }
  //   })
  //   .then(function(results){
  //     return results.data.response;
  //   });
  //  }

  }