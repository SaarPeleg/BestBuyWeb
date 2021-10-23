import './App.css';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const SingleCard = (props) => {
  //this function passes on the parameters to its parent that passes them on to DetailsComponent in order to change 
  function DeleteItem() {
    var removedItems = "";
    removedItems = localStorage.getItem('removedItems');
    if (props.sku != null || props.sku != "") {
      if (removedItems == null) {
        localStorage.setItem('removedItems', props.sku);
      } else {
        removedItems += "," + props.sku;
        localStorage.setItem('removedItems', removedItems);
      }
      document.getElementById(props.sku).getElementsByClassName("deleteItem")[0].disabled = true;
      props.handleFetch()
    }
  }
  function ClickOnCard() {
    console.log()
    props.setnameclick(document.getElementById(props.sku).getElementsByClassName("cardNameInner")[0].innerText);
    props.setdescriptionclick(document.getElementById(props.sku).getElementsByClassName("cardDescriptionInner")[0].innerText);
    props.setimgclick(document.getElementById(props.sku).getElementsByClassName("cardImgInner")[0].src);
    props.setpriceclick(document.getElementById(props.sku).getElementsByClassName("cardPriceInner")[0].innerText);
    props.setskuclick(document.getElementById(props.sku).getElementsByClassName("cardSkuInner")[0].innerText);
    //console.log(document.getElementById(props.sku).getElementsByClassName("cardSkuInner")[0].innerText)

  }
  return (
    <div className="card-item" style={{ padding: '20', }} id={props.sku} onClick={(event) => ClickOnCard()}>
      <img loading="lazy" className="cardImgInner" src={props.img == "" || props.img == null ? "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg" : props.img} alt="" ></img>

      <div className="cardDetails">
        <h4 className="cardNameInner" >{props.name}</h4>
        <div className="cardDescriptionInner" >{props.description}{props.plot}</div>
        <span className="cardPriceInner">{props.price}</span>
      </div>
      <div className="cardbutton">
        <button className="deleteItem" onClick={DeleteItem}>delete</button>
      </div>

      <label className="sku" className="cardSkuInner" style={{ display: 'none' }}>{props.id}</label>
    </div>
  );
};

function PaginationComponent(props) {
  //params used for loading pagination
  const [products, setProducts] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);
  const [txtSearch, setTxtSearch] = useState('');
  const [selectSort, setselectSort] = useState('name');
  //params to pass for loading details in another component
  const [nameclick, setnameclick] = useState('');
  const [descriptionclick, setdescriptionclick] = useState('');
  const [imgclick, setimgclick] = useState('');
  const [skuclick, setskuclick] = useState('');
  const [priceclick, setpriceclick] = useState(0);
  //call the api and load react paginate
  const handleFetch = () => {
    document.getElementById("loaderid").style.display = "unset";
    var removedItems = "";
    var lastsku = "";
    removedItems = localStorage.getItem('removedItems');
    if (removedItems == null || removedItems == "") {
      removedItems = "";
    }
    const URL = `https://localhost:44378/api/BestBuy?page=${currentPage + 1}&sort=${selectSort}&textsearch=${txtSearch}&deletelist=${removedItems}`;
    fetch(URL)
      .then(response => response.json())
      .then(body => {
        var modified = modifyProductsFromLocalStorage(body.products);
        modified.sort(function (a, b) {
          console.log(a,b)
          //if (a.name.includes("BZ")) {
            //debugger;
         // }
          if (selectSort == "name") {
            if (a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
          } else {
            if (a.startDate < b.startDate) { return -1; }
            if (a.startDate > b.startDate) { return 1; }
          }

          return 0;
        })
        setProducts([...modified]);
        setPageCount(body.totalPages);
        setisLoaded(true);
        document.getElementById("loaderid").style.display = "none";
        localStorage.setItem(URL, JSON.stringify(modified))//save results to local storage
      })
      .catch(error => console.error('Error', error));
  };
  const EnterDown = (event) => {
    if (event.key === 'Enter') {
      handleFetch();
    }
  }
  function modifyProductsFromLocalStorage(products) {
    var modifiedItems = [];
    modifiedItems = JSON.parse(localStorage.getItem('modifiedItems'));
    console.log(modifiedItems)
    if (modifiedItems == null) {
      modifiedItems = [];
    }
    var obj = null;
    if (modifiedItems.length > 0) {
      products.forEach(product => {
        modifiedItems.forEach(modprod => {
          if (modprod.sku == product.sku) {
            product.shortDescription = modprod.description;
            product.plot = "";
            product.name = modprod.name;
            product.price = modprod.price;
            product.images = [{ href: modprod.img }];
            product.image = modprod.img;

          }
        })
      });
    }
    return products;
  }
  //refresh on change of the fields, with the exception of text search
  useEffect(() => {
    handleFetch();
  }, [currentPage]);
  useEffect(() => {
    handleFetch();
  }, [selectSort]);
  useEffect(() => {
    props.setTname(nameclick)
  }, [nameclick])
  useEffect(() => {
    props.setTdescription(descriptionclick)
  }, [descriptionclick])
  useEffect(() => {
    props.setTprice(priceclick)
  }, [priceclick])
  useEffect(() => {
    props.setTimg(imgclick)
  }, [imgclick])
  useEffect(() => {
    props.setTsku(skuclick)
  }, [skuclick])
  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
  };

  return (
    <div>
      <div className="filter-bar" /*style={{ height: 5 + 'vh' }}*/>

        {/*<button>Add</button>*/}
        <div className="searchHelper">
          <input type="text" onChange={(event) => setTxtSearch(event.target.value)} onKeyDown={EnterDown} placeholder="search products" />
          <i className="fas fa-search" onClick={handleFetch}></i>
        </div>
        <label>Sort by </label>
        <div className="searchHelper">
          <select id="selectsort" onChange={(event) => setselectSort(document.getElementById("selectsort").value)}>
            <option value="name">Name</option>
            <option value="startDate">Recently Added</option>
          </select>
        </div>
      </div>
      <div id="loaderid" className="loadercontainer">
        <div className="loader">
          <div className="loader-wheel"></div>
          <div className="loader-text"></div>
        </div>
      </div>
      <div className="scroller">
        {isLoaded ? (
          products.map((item) => {
            //console.log(item)
            var imgurl = "";
            if (item.images.length > 0) {
              imgurl = item.images[0].href;
            } else {
              imgurl = item.image;
            }

            return (
              <SingleCard
                key={item.sku}
                id={item.sku}
                name={item.name}
                description={item.shortDescription}
                plot={item.plot}
                img={imgurl}
                sku={item.sku}
                price={item.salePrice}
                setnameclick={setnameclick}
                setdescriptionclick={setdescriptionclick}
                setimgclick={setimgclick}
                setskuclick={setskuclick}
                setpriceclick={setpriceclick}
                handleFetch={handleFetch}
              />
            );
          })
        ) : (
          <div></div>
        )};
      </div>
      {isLoaded ? (
        <ReactPaginate
          pageCount={pageCount}
          pageRange={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          initialPage={0}
          containerClassName={'container'}
          previousLinkClassName={'page'}
          breakClassName={'page'}
          nextLinkClassName={'page'}
          pageClassName={'page'}
          disabledClassNae={'disabled'}
          activeClassName={'active'}
        />
      ) : (
        <div>Nothing to display</div>
      )}
      
    </div>
  );
}

export default PaginationComponent;
