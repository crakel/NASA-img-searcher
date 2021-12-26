import { useState, useEffect } from "react";
import axios from "axios";
import Picture from "./components/Picture";
import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 


function App() {
	const [loading, setLoading] = useState(false);
	const [pictures, setPictures] = useState([]);
	const [filter, setFilter] = useState("");
	const [query, setQuery] = useState("");
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [picsPerPage, setPicsPerPage] = useState(6);
	/* for pagination */
	const indexOfLast = currentPage * picsPerPage;
  	const indexOfFirst = indexOfLast - picsPerPage;
  	
	function currentPics(tmp) {
    	let currentPics = 0;
    	currentPics = tmp.slice(indexOfFirst, indexOfLast);
    	return currentPics;
  	}
	
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
			<section className={styles.main}>
			  <div className={styles.background__img}>
				<div className="mask d-flex align-items-center h-100" style={{backgroundColor: "rgba(0,0,0, 0.3)"}}>
				  <div className="container">
					<p className="h2 mb-4 text-white">Search Image <br /> On NASA</p>
					<div className="card">
					  <div className="card-body p-4">
						<div className="row">
						  <div className="col-12">
							<div className="input-group">
							  <div className="form-outline flex-fill">
								<input onChange={onChange} type="search" id="form1" className="form-control form-control-lg" />
							  </div>
							  <button onClick={onClick} type="button" className="btn btn-primary btn-lg">
								<i className="fa fa-search"></i>
							  </button>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</section>
			<br />
			<br />
			<hr />
				<div>
					<div className="row">
					{pictures.filter((picture) => (picture.data && picture.links)).map((picture, i) => (
						<Picture
							key={picture.data[0].nasa_id}
							image={picture.links[0].href}
							center={picture.data[0].center}
							title={picture.data[0].title}
							date_created={picture.data[0].date_created.split('T')[0]}
							description={picture.data[0].description}
							keywords={picture.data[0].keywords}/>
					))}
					</div>
				</div>
    	</div>
  	);
}

export default App;
