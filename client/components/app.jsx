import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      hasError: false,
      hasMore: true,
      isLoading: false,
      data: [],
      dataType: true,
      initialLoad: true,
    }
    window.onscroll = () => {
      const {
        loadData,
        state: {
          hasMore,
          isLoading,
          hasError
        }
      } = this;
      if (!hasMore || isLoading || hasError) return;
      // scrollTop = top of screen when scrolling. innerHeight = height of screen. offsetHeight = total height of content
      if (document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 200) {
        this.loadData();
      }
    }
	}

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({isLoading: true}, () => {
      // swap between male and female api
      const url = this.state.dataType ? '/male' : '/female';
      fetch(url)
        .then((res) => res.json())
        .then((newData) => {
          this.setState((prevState) => {
            // hasMoreContent check contingent on initial load where data is initialized at []
            let hasMoreContent = true;
            if (!prevState.initialLoad) {
              hasMoreContent = prevState.data.length < 100 ? false : true;
            }
            return {
              isLoading: false,
              hasMore: hasMoreContent,
              data: [
                ...prevState.data,
                ...newData
              ],
              dataType: !prevState.dataType,
              initialLoad: false
            }
          })  
        })
        .catch((err) => {
          this.setState({
            hasError: err
          });
        });
    });
  }

  render() {
    const {
      hasError,
      isLoading,
      hasMore,
      data
    } = this.state;
	  return (
	    <div>
	      <p>Welcome to Infinite Scroll!</p>
        {
          data.map(ele => {
            return (
              <div>
                <hr />
                <p>{ele.sex} is currently {ele.age}</p>
              </div>
            );
          })
        }
        <hr />
        {hasError && <div style={{color: 'red'}}>{hasError}</div>}
        {isLoading && <div style={{color: 'blue'}}>Please wait while we load the next batch of information</div>}
        {!hasMore && <div style={{color: 'orange'}}>You've reached the end!</div>}
	    </div>
	  );
  }
}

export default App;