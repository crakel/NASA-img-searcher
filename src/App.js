import { useState, useEffect } from "react";
import axios from "axios";
import Picture from "./components/Picture"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
	const [loading, setLoading] = useState(false);
	const [pictures, setPictures] = useState([]);
	const [filter, setFilter] = useState("");
	const [query, setQuery] = useState("");
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	
	
	useEffect(() => {
		const getPictures = async () => {
			try {
				console.log("run");
				setError(null);
				setPictures([]);
				setLoading(true);
				const res = await axios.get("https://images-api.nasa.gov/search?q=" + search);
				setPictures(res.data.collection.items);
			} catch (e) {
				setError(e);
				console.log(error);
			}
			setLoading(false);
		};
		getPictures();
	}, [search]);

	
	const onChange = (event) => {	
		setQuery(event.target.value);
	};
	
	const onClick = () => {
		if(query === "") return;
		setSearch(query);
		console.log(search);
		setQuery("");
	};
	
	console.log(query);
	console.log(pictures);
	console.log("set loading : ", loading);
	
	return (
    	<div>
			<h1>NASA-PICTURE SEARCH APP</h1>
			<input onChange={onChange} value={query} type="text" placeholder="Search" />
			<button type="button" onClick={onClick}>Search</button>
				<div>
					{pictures.filter((picture) => (picture.data && picture.links)).map((picture) => (
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
