import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ShopPage = () => {
 const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0); 
    const initUrl = `https://dummyjson.com/products`;
    const [url, setUrl] = useState(initUrl);
    const [searchValue, setSearchValue] = useState("");
    if (searchValue !== "") {
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            .then((res) => res.json())
            .then(({ products }) => {
                console.log(limit,skip);
                console.log(products);
                setProducts(products);
                
            });
    }, [limit, skip]);

           useEffect(() => {
        if (searchValue.trim() === "") {
            fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
                .then((res) => res.json())
                .then(({ products, total }) => {
                    setProducts(products);
                    setTotalProducts(total);
                })
                .catch((error) => {
                    console.error("Không lấy được sản phẩm:", error);
                });
        } else {
            fetch(`https://dummyjson.com/products`)
                .then((res) => res.json())
                .then(({ products }) => {
                    const filtered = products.filter((item) =>
                        item.title.toLowerCase().includes(searchValue.toLowerCase())
                    );
                    setProducts(filtered);
                })
                .catch((error) => {
                    console.error("Không có sản phẩm ", error);
                });
        }
    }, [searchValue]);
	
    const handleSelectLimit = (e) => {
        const selectedLimit = e.target.value;
        console.log(selectedLimit);
        if (selectedLimit === "all") {
            setLimit(0);
            console.log("get All");
        } else {
            setLimit(selectedLimit);
        }
    };
    const handlePrev = () => {
    setPage((prev) => prev - 1);
    setSkip((prev) => prev - 10);
    };

    const handleNext = () => {
    setPage((prev) => prev + 1);
    setSkip((prev) => prev + 10);
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    function nextDisabled() {
    if (products.length === 0) {
        return true; 
    }
    return skip + 10 >= totalProducts; 
}
    const renderProducts = () => {
    if (products.length === 0) {
        return <p style={{ color: "red", fontSize: "20px" }}>Không có sản phẩm trong danh mục</p>;
    } else {
        return products.map((item) => (
            <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.id}</span>
                <h3>{item.title}</h3>
                <p>Giá: {item.price}</p>
                <a href="#" className="btn btn-danger">Xem chi tiết</a>
            </div>
        ));
    }
   };
    return (
        <div >
             <h2 style={{marginTop:"100px"}}>Danh Sách Sản Phẩm</h2>
            <select style={{marginBottom:"50px"}} onChange={(e) => handleSelectLimit(e)}>
                <option value={10}>Hiển thị 10 sản phẩm</option>
                <option value={20}>Hiển thị 20 sản phẩm</option>
                <option value={30}>Hiển thị 30 sản phẩm</option>
                <option value="all">Hiển thị tất cả sản phẩm</option>
            </select>        
                <span style={{margin:"0px 5px"}}>Tìm kiếm sản phẩm:</span>
                <input style={{width:"200px",padding:"3px 0px"}} type="text" onChange={(e) => handleSearch(e)} />
                
        <div className="productlist ">
        {renderProducts()}
        </div>

          <button  style={{marginTop:"50px"}} className="btn btn-primary" onClick={handlePrev}>
                Prev
            </button>
            <button style={{marginTop:"50px"}} className="btn btn-primary" onClick={handleNext} disabled={nextDisabled()}>Next</button>
         </div>
    );
};

export default ShopPage;