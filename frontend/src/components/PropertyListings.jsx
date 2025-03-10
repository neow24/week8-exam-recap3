import{Link}from'react-router-dom';
const PropertyListings = ({properties}) => {
  return (
    <div className="property-list">
      {properties.map((property)=>(
        <div className='property-list'>
          <div className='property-preview' key={property.id}>
            <Link to={`/properties/${property.id}`}>
              <h2>{property.title}</h2>
            </Link>
            <p>Type: {property.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyListings;
