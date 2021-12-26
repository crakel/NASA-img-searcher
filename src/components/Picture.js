import PropTypes from "prop-types"
import "./Picture.css"

const Picture = ({ image, center, title, date_created, description, keywords }) => {
	return (
			<div className="col-12 col-md-6 col-lg-4 mb-4" key={title}>
				<div className="card">
					<img className="card-img-top" src={image} alt={title} />
					<div className="card-body">
						<h3 className="card-title">{title}</h3>
						<p className="card-text">{description}</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">date : {date_created}</li>
						<li class="list-group-item">center : {center}</li>
					</ul>
				</div>
			</div>
	);
};

Picture.propTypes = {
	image: PropTypes.string.isRequired,
	center: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date_created: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.arrayOf(PropTypes.string),
}

export default Picture;
