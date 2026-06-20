import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }

 static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string
};
capitalizerFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizerFirstLetter(this.props.category)}-NewsHub`;
  }
 async updateNews(page = 1) {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ee87e79e6dc43a6863fbc35f57890d8&page=${page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    if (parsedData.status === "error") {
      console.log(parsedData.message);
      this.setState({ loading: false });
      return;
    }

    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false,
      page: page
    });

  } catch (error) {
    console.log(error);
    this.setState({ loading: false });
  }
}
  async componentDidMount() {
    this.updateNews();
  }
fetchMoreData = async () => {
  if (this.state.loading) return;

  const nextPage = this.state.page + 1;

  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ee87e79e6dc43a6863fbc35f57890d8&page=${nextPage}&pageSize=${this.props.pageSize}`;

  try {
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    if (parsedData.status === "error") {
      console.log(parsedData.message);
      this.setState({ loading: false });
      return;
    }

    this.setState({
      articles: this.state.articles.concat(parsedData.articles || []),
      page: nextPage,
      totalResults: parsedData.totalResults || this.state.totalResults,
      loading: false
    });

  } catch (error) {
    console.log(error);
    this.setState({ loading: false });
  }
};

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsHub - Top Headlines on {this.capitalizerFirstLetter(this.props.category)} category</h1>
        {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
  dataLength={this.state.articles.length}
  next={this.fetchMoreData}
  hasMore={this.state.articles.length < this.state.totalResults}
  loader={<Spinner />}
>
            <div className= "container">
          <div className="row">
         {this.state.articles
  .filter((element) => element && element.title)
  .map((element) => {
    return (
      <div className="col-md-4" key={element.url}>
        <NewsItems
          title={element.title ? element.title : ""}
          description={element.description ? element.description : ""}
          imageUrl={element.urlToImage}
          newsurl={element.url}
          author={element.author}
          date={element.publishedAt}
          source={element.source ? element.source.name : ""}
        />
      </div>
    );
  })}
        </div>
        </div>
        </InfiniteScroll>

        <div className="container">
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            > &larr; Previous
            </button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>

          </div>
        </div>

      </div>
    );
  }
}

export default News;