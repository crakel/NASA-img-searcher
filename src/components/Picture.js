import PropTypes from "prop-types"

const Picture = ({ image, center, title, date_created, description, keywords }) => {
	return (
		<div>
			<img src={image} alt={title} />
			<h2>{title}</h2>
			<h3>{date_created}</h3>
			<p>{description}</p>
			<h3>keywords</h3>
		</div>
	);
}

Picture.propTypes = {
	image: PropTypes.string.isRequired,
	center: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date_created: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.arrayOf(PropTypes.string),
}

export default Picture;
