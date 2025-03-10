import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddPropertyPage = () => {
    const [property, setProperty] = useState({
        title: "",
        type: "",
        description: "",
        price: "",
        location: {
            address: "",
            city: "",
            state: "",
            zipCode: ""
        },
        squareFeet: "",
        yearBuilt: ""
    });

    const handleChange=(e)=>{
        const{name,value}=e.target;
        if(['address','city','state','zipCode'].includes(name)){
            setProperty((prev)=>({
                ...prev,
                location:{...prev.location,[name]:value}
            }));
        }else{
            setProperty((prev)=>({
                ...prev,
                [name]:value
            }));
        }
    };

    const addProperty = async (newProperty) => {
        try {
            console.log("Adding property:", newProperty);
            const res = await fetch("http://localhost:4000/api/properties", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newProperty),
            });
            if (!res.ok) {
                throw new Error("Failed to add property");
            }
            return true;
        } catch (error) {
            console.error("Error adding property:", error);
            return false;
        }
    }; 

    const submitForm = async(e) => {
        e.preventDefault();
        const success=await addProperty(property);
        if(success){
            console.log('Property added successfully');
            navigate('/');
        }else{
            console.error('Failed to add the property');
        }
    };

    return (
        <div className="create">
        <h2>Add a New Property</h2>
        <form onSubmit={submitForm}>
            <label>Property title:</label>
            <input
                type="text"
                name="title"
                value={property.title}
                onChange={handleChange}
                placeholder="Property Title"
                required
            />
            <label>Property type:</label>
            <select name="type" value={property.type} onChange={handleChange} required>
                <option value="Lorem">Lorem</option>
                <option value="ipsum">ipsum</option>
                <option value="dolor">dolor</option>
                <option value="sit">sit</option>
            </select>
            <label>Property Description:</label>
            <textarea
                type='text'
                name='description'
                value={property.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <label>Property Price:</label>
            <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <label>Property Address:</label>
            <input
                type="text"
                name="address"
                value={property.location.address}
                onChange={handleChange}
                placeholder="Address"
                required
            />
            <input
                type="text"
                name="city"
                value={property.location.city}
                onChange={handleChange}
                placeholder="City"
                required
            />
            <label>State:</label>
            <input
                type="text"
                name="state"
                value={property.location.state}
                onChange={handleChange}
                placeholder="State"
                required
            />
            <label>Zip Code:</label>
            <input
                type="text"
                name="zipCode"
                value={property.location.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                required
            />
            <label>Square Feet:</label>
            <input
                type="number"
                name="squareFeet"
                value={property.squareFeet}
                onChange={handleChange}
                placeholder="Square Feet"
                required
            />
            <label>Year Built:</label>
            <input
                type="number"
                name="yearBuilt"
                value={property.yearBuilt}
                onChange={handleChange}
                placeholder="Year Built"
                required
            />
            <button>Add Property</button>
        </form>
        </div>
    );
};

export default AddPropertyPage;
