import { useState, useEffect } from "react";
import axios from "axios";
import Picture from "./components/Picture";
import Pagination from "./components/Pagination";
import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 


function App() {
	const [loading, setLoading] = useState(false);
	const [firstpage, setFirstpage] = useState(true);
	const [defaults, setDefaults] = useState([]);
	const [pictures, setPictures] = useState([]);
	const [filter, setFilter] = useState("1");
	const [query, setQuery] = useState("");
	const [search, setSearch] = useState("");
	const [error, setError] = useState(null);
	
	/* for pagination */
	const [currentPage, setCurrentPage] = useState(1);
	const [picsPerPage, setPicsPerPage] = useState(6);
	const indexOfLast = currentPage * picsPerPage;
  	const indexOfFirst = indexOfLast - picsPerPage;
  	
	function currentPics(tmp) {
    	let currentPics = 0;
    	currentPics = tmp.slice(indexOfFirst, indexOfLast);
    	return currentPics;
  	}
	/* ************** */
	
	/* initialize default pictures */
	useEffect(() => {
		const getDefaults = async () => {
			try {
				setError(null);
				setDefaults([]);
				setLoading(true);
				const res = await axios.get("https://images-api.nasa.gov/search?year_start=2021");
				setDefaults(res.data.collection.items);
				console.log("defaults");
			} catch (e) {
				setError(e);
				console.log(error);
			}
			setLoading(false);
		};
		getDefaults();
	}, []);
	
	
	useEffect(() => {
		if (firstpage === true) {
			return;
		}
		
		let currentFilter;
		if (filter === "1") {
			currentFilter = "q";
		} else if (filter === "2") {
			currentFilter = "center";
		} else if (filter === "3") {
			currentFilter = "title";
		} else if (filter === "4") {
			currentFilter = "year_start";
		} else if (filter === "5") {
			currentFilter = "description";
		};
		
		const getPictures = async () => {
			try {
				setError(null);
				setPictures([]);
				setLoading(true);
				const res = await axios.get("https://images-api.nasa.gov/search?" + currentFilter + "=" + search);
				setPictures(res.data.collection.items);
			} catch (e) {
				if (e.response.status === 400) {
					setError("The request was unacceptable, often due to missing a required parameter.");
				} else if (e.response.status === 404) {
					setError("The requested resource doesn’t exist.");
				} else {
					setError("Something went wrong on the API’s end.");
				}
			}
			setLoading(false);
		};
		getPictures();
	}, [search]);
	


	
	const onChange = (event) => {	
		setQuery(event.target.value);
	};
	
	const onSelect = (event) => {	
		setFilter(event.target.value);
	};
	
	const onClick = () => {
		if(query === "") return;
		setSearch(query);
		setFirstpage(false);
		setQuery("");
	};
	
	console.log(query);
	console.log(pictures);
	console.log("set loading : ", loading);
	console.log(filter);
	
	return (
    	<div>
			<section className={styles.main}>
			  <div className={styles.background__img}>
				<div className="mask d-flex align-items-center h-100" style={{backgroundColor: "rgba(0,0,0, 0.3)"}}>
				  <div className="container">
					<p className="h2 mb-4 text-white">Search Image<br />On NASA</p>
					<div className="card">
					  <div className="card-body p-4">
						<div className="row">
						  <div className="col-12">
							<div className="input-group">
							  <select className="form-select" onChange={onSelect}>
							  	<option value="1">All</option>
							  	<option value="2">Center</option>
							  	<option value="3">Title</option>
								<option value="4">Start Year</option>
								<option value="5">Description</option>
							  </select>
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
			<hr />
			<div>
				{error ? 
					<div>
					 	<h2>{error}</h2>
						<h2>Search Error Occurred. Please Search Again.</h2>
					</div>
						: 
					null
				}
				{firstpage ?
					<div>
					 	<h2 mb-4>Check 2021 YEAR images On NASA !</h2>
					 	<br />
						<div className="row">
							<Picture pictures={currentPics(defaults)} loading={loading}></Picture>
						</div>
						<Pagination picsPerPage={picsPerPage} totalPics={defaults.length} paginate={setCurrentPage} />
					</div>
					: 				
					<div>
						<div className="row">
							<Picture pictures={currentPics(pictures)} loading={loading}></Picture>
						</div>
						<Pagination picsPerPage={picsPerPage} totalPics={pictures.length} paginate={setCurrentPage} />
					</div>
				}
			</div>
    	</div>
  	);
}

export default App;
