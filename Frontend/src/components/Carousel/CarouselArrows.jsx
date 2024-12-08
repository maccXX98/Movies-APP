import PropTypes from "prop-types";

// Flecha Siguiente
export const SampleNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      backgroundColor: "#0072ff",
      borderRadius: "100%",
    }}
    onClick={onClick}
  >
    ›
  </div>
);

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

// Flecha Anterior
export const SamplePrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      backgroundColor: "#0072ff",
      borderRadius: "100%",
    }}
    onClick={onClick}
  ></div>
);

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
