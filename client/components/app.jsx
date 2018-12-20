import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
      hasMore: true,
			isLoading: false,
      data: [],
		};
    this.loadData = this.loadData.bind(this);
		window.onscroll = () => {
			const {
        loadData,
        state: {
          error,
          hasMore,
          isLoading,
        }    
			} = this;

			if (error || isLoading || !hasMore) return;
      				console.log(window.innerHeight + document.documentElement.scrollTop, '1')
              console.log(document.documentElement.offsetHeight - 200, '2');
			if (
				window.innerHeight + document.documentElement.scrollTop >
				document.documentElement.offsetHeight - 200
			) {
				console.log('in')
				loadData();
			}
		};

	}

  componentDidMount() {
  	this.loadData();
  }

  loadData() {
    this.setState({isLoading: true}, () => {
    	fetch('/data')
    	  .then((result) => result.json())
    	  .then((result) => {
          const newData = result.map(data => ({
            name: 'test',
            id: '1',
            sex: 'M'
          }));

          this.setState({
          	hasMore: true,
            isLoading: false,
            data: [
              ...this.state.data,
              ...newData,
            ],
          });
    	  })
    	  .catch((err) => {
    	  	this.setState({
    	  		error: err.message,
    	  		isLoading: false,
    	  	});
    	  })
    });
  }

  render() {
  	const {
  		error,
  		hasMore,
  		isLoading,
  		data,
  	} = this.state;
	  return (
	    <div>
	      <p>Welcome to Infinite Scroll!</p>
		    {data.map(ele => (
		      <React.Fragment>
		        <hr />
		        <div style={{display: 'flex'}}> 
	            {ele.name} has a gender of {ele.sex}
	          </div>
		      </React.Fragment>	
		    ))}
		    <hr />
		    {error && 
		    	<div style={{color: 'red'}}>
	          {error}
		    	</div>
		    }
		    {isLoading &&
	        <div style={{color: 'blue'}}>
	          I'm currently loading...
		    	</div>
		    }
		    {!hasMore &&
	        <div style={{color: 'orange'}}>
	          You've reached the end!
		    	</div>
		    }
	    </div>
	  );
  }
}

export default App;