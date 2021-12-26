import "./Picture.css"

// { image, center, title, date_created, description }
const Picture = ({ pictures, loading }) => {
	if (loading) {
    	return (
			<div class="fa-2x">
  				<i class="fa fa-spinner fa-spin" style={{float: "left", marginRight: "10px"}}></i>
				<h3>Loading...</h3>
			</div>
		);
  	}
	
	/* with no pictures */ 
	if (pictures.length < 1) {
		return (
			<h2>No Results For Search.</h2>
		)
	};
	
	return (
		pictures.filter((picture) => (picture.data && picture.links)).map((picture, i) => (
			<div className="col-12 col-md-6 col-lg-4 mb-4 mleft" style={{width: "500px"}} key={picture.data[0].nasa_id}>
				<div className="card">
					<img className="card-img-top" src={picture.links[0].href} alt={picture.data[0].title} />
					<div className="card-body">
						<h3 className="card-title">{picture.data[0].title}</h3>
						<p className="card-text">{picture.data[0].description}</p>
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">date : {picture.data[0].date_created.split('T')[0]}</li>
						<li className="list-group-item">center : {picture.data[0].center}</li>
					</ul>
				</div>
			</div>
		))
	);
};

export default Picture;
