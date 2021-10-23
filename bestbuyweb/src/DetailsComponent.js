import './App.css';
import React, { useState, useEffect } from 'react';


function DetailsComponent(props) {
	const [img = props.img, setImg] = useState('');
	const [description = props.description, setDescription] = useState('');
	const [name = props.name, setName] = useState('');
	const [sku = props.sku, setsku] = useState('');
	const [price = props.price, setPrice] = useState(props.price);
	useEffect(() => {
		setPrice(props.price);
		setName(props.name);
		setDescription(props.setDescription);
		setImg(props.img);
	}, [props]);
	function saveToLocalStorage() {

		var modifiedItems = [];
		modifiedItems = JSON.parse(localStorage.getItem('modifiedItems'));
		console.log(modifiedItems)
		if (modifiedItems == null) {
			modifiedItems = [];
		}
		var found = false;
		var obj = null;
		if (modifiedItems.length > 0) {
			obj = modifiedItems.find((o, i) => {
				if (o.sku === props.sku) {
					modifiedItems[i] = {
						name: name,
						description: description,
						img: img,
						price: price,
						sku: props.sku
					};
					found = true;
					return true; // stop searching
				}
			});
		}

		if (obj == null || obj === undefined) {
			modifiedItems.push({
				name: name,
				description: description,
				img: img,
				price: price,
				sku: props.sku
			})
		}

		localStorage.setItem('modifiedItems', JSON.stringify(modifiedItems));
		//handleFetch();
		document.getElementById(props.sku).getElementsByClassName("cardNameInner")[0].innerText = name;
		document.getElementById(props.sku).getElementsByClassName("cardDescriptionInner")[0].innerText = description;
		document.getElementById(props.sku).getElementsByClassName("cardImgInner")[0].src = props.img;
		document.getElementById(props.sku).getElementsByClassName("cardPriceInner")[0].innerText = price;
		document.getElementById(props.sku).getElementsByClassName("cardImgInner")[0].src=img;
	}
	function ToggleDisplay(target) {
		var x = document.getElementById("imgDisplay");
		if (x.style.display === "none") {
			x.style.display = "unset";
		} else {
			x.style.display = "none";
		}
	}
	return (

		<div className="DetailsDiv">
			<div style={{ padding: '20', }}>
				<div className="right_Item_Img">
					<img loading="lazy" src={img} alt="" onClick={(event) => ToggleDisplay(event.target)}></img>
				</div>
				<div id="imgDisplay" className="inputHelper">
					<input type="text" id="imgCardData" onChange={(event) => setImg(event.target.value)} value={img} /><br />
				</div>
				<label>Name:</label>
				<br />
				<div className="inputHelper">
					<input type="text" id="NameCardData" onChange={(event) => setName(event.target.value)} value={name} /><br />
				</div>
				<label>Description:</label>
				<br />
				<div className="textarea_container">
					<textarea type="text" id="DescriptionCardData" rows="8" onChange={(event) => setDescription(event.target.value)} value={description}></textarea>
				</div>
				<label>Price:</label>
				<br />
				<input type="number" id="PriceCardData" onChange={(event) => setPrice(event.target.value)} value={price} />$<br />

				<div className="cardbutton">
					<button className="saveItem" onClick={saveToLocalStorage}>save</button>
				</div>
				<div className="skuCardData" style={{ display: 'none' }}>{props.sku}</div>
			</div>
		</div>
	);
}

export default DetailsComponent;
