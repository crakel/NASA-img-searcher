import { useState, useEffect } from "react";
import Picture from "./components/Picture"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [loading, setLoading] = useState(true);
	const [pictures, setPictures] = useState([]);
	const [keyword, setKeyword] = useState("");
		
	const getPictures = async () => {
		const json = await (await fetch("https://images-api.nasa.gov/search?q=" + keyword)).json();
		setPictures(json.collection.items);
		setLoading(false);
	};
	
	const onChange = (event) => {	
		setKeyword(event.target.value);
	};
	
	const onSubmit = (event) => {
		event.preventDefault();
		if (keyword === "") return;
		getPictures();
		setKeyword("");
	};
	
	console.log(pictures);
	
	return (
    	<div>
			<h1>NASA-PICTURE SEARCH APP</h1>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={keyword} type="text" placeholder="Search" />
				<button>Search</button>
			</form>
			<div>
				{pictures.map((picture) => (
					<Picture
						key={picture.data[0].nasa_id}
						image={picture.links[0].href}
						center={picture.data[0].center}
						title={picture.data[0].title}
						date_created={picture.data[0].date_created}
						description={picture.data[0].description}
						keywords={picture.data[0].keywords}/>
				))}
			</div>
			<hr />
    	</div>
  	);
}

export default App;
