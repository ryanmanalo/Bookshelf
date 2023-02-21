import { useState, useEffect } from "react";
import notFound from "./assets/notfound.png";
import "./App.css";

function App() {
	const [data, setData] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const url = "https://web-production-4d0e.up.railway.app/api/books/";

	const colors = ["blue", "green", "yellow", "brown", "purple", "orange"];

	function getRandomColor() {
		return Math.floor(Math.random() * (colors.length - 1 - 0 + 1)) + 0;
	}

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	const onSearch = (e) => {
		if (e.keyCode === 13) {
			let formatedString = searchValue.replace(" ", "+");
			let urlSearch = `${url}?search=${formatedString}`;

			fetch(urlSearch)
				.then((res) => res.json())
				.then((data) => {
					setData(data);
					setSearchValue("");
				})
				.catch((err) => console.log(err));
		}
	};
	function sortInDecending() {
		let urlDecend = `${url}?ordering=-id`;

		fetch(urlDecend)
			.then((res) => res.json())
			.then((data) => setData(data));
	}

	function filterByLanguage(language) {
		let urlLan = `${url}?language=${language}`;
		fetch(urlLan)
			.then((res) => res.json())
			.then((data) => setData(data));
	}

	function onReset() {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setData(data));
	}

	if (data.length === 0) {
		return (
			<div className="App p-4">
				<div className="notFound">
					<div>
						<h1 className="text-white">NOT FOUND</h1>
						<img
							src={notFound}
							style={{ width: "400px", height: "400px", borderRadius: "10px" }}
							alt="Not Found"
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="App p-4">
				<div className="container">
					<h2 className="text-white main-h2 py-4">Available Books</h2>
					<div className="btns row">
						<div className="col-md-3">
							<input
								className="form-control "
								type="search"
								value={searchValue}
								onKeyDown={onSearch}
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder="search"
							/>
						</div>
						<div className="col-md-6">
							<button
								className="btn btn-warning btn-sm me-3"
								onClick={sortInDecending}
							>
								Sort in Descending
							</button>
							<button
								className="btn btn-info btn-sm me-3"
								onClick={() => filterByLanguage("en")}
							>
								filter by
								<span style={{ color: "white" }}>[English]</span>
							</button>
							<button
								className="btn btn-info btn-sm me-3"
								onClick={() => filterByLanguage("tl")}
							>
								filter by
								<span style={{ color: "white" }}>[Tagalog]</span>
							</button>
							<button
								className="btn btn-danger btn-sm me-3"
								onClick={() => onReset()}
							>
								reset
							</button>
						</div>
					</div>
				</div>
				<div className="books-container">
					<div className="container bootstrap snippets bootdeys">
						<div className="row">
							{data.map((book, i) => (
								<div
									className="col-md-4 col-sm-6 col-md-6 col-lg-4 content-card"
									key={i}
								>
									<div className="card-big-shadow">
										<div
											className="card card-just-text"
											data-background="color"
											data-color={colors[getRandomColor()]}
											data-radius="none"
										>
											<div className="content">
												<h6 className="category">Book</h6>
												<h4 className="title">
													<a>{book.title}</a>
												</h4>
												<p className="description">
													<span>by : {book.author}</span> <br />
													<span>language - {book.language}</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
