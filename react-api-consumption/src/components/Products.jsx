import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

const Products = () => {
    const [products, setProducts] = useState("");
    const [formProduct, setFormProduct] = useState({
        name: "",
        price: "",
        description: "",
        slug: "",
    })
    

    const getProducts = () => {
        axios({
          method: "GET",
          url: "http://localhost:8000/api/products",
        }).then((response) => {
          const data = response.data
          setProducts(data)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
    }
     
    useEffect(() => {
    getProducts();
    }, []);
    
    const createProduct = (event) => {
        event.preventDefault()
        axios({
          method: "POST",
          url: "http://localhost:8000/api/products",
          data: {
            name: formProduct.name,
            price: formProduct.price,
            description: formProduct.description,
            slug: formProduct.slug,
          }
        }).then((response) => {
          getProducts()
        })
    
        setFormProduct({
          name: "",
          price: "",
          description: "",
          slug: "",
        })
    }

    const deleteProduct = (id) => {
        axios({
          method: "DELETE",
          url: `http://localhost:8000/api/products/${id}`,
        }).then((response) => {
          getProducts()
        })
    }

    const handleChange = (event) => {
        const {value, name} = event.target
        setFormProduct(prevProduct => ({
          ...prevProduct, [name]: value})
        );
    }

    return (
        <div className=''>
            
            <form className="create-product">
                <input onChange={handleChange} text={formProduct.name} name="name" placeholder="Name" value={formProduct.name} />
                <input onChange={handleChange} text={formProduct.price} name="price" placeholder="Price" value={formProduct.price} />
                <input onChange={handleChange} text={formProduct.description} name="description" placeholder="Description" value={formProduct.description} />
                <input onChange={handleChange} text={formProduct.slug} name="slug" placeholder="Slug" value={formProduct.slug} />
                <button onClick={createProduct}>Create Product</button>
            </form>

            { products && products.map(product =>
                <List
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                slug={product.slug}
                deletion={deleteProduct}
                />
            )}
        </div>
    )
}

export default Products