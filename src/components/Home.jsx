import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './Footer';

const Home = () => {

    let API_KEY = import.meta.env.VITE_API_KEY;

    const [ApiData, SetApiData] = useState([]);
    const [category, SetCategory] = useState('');

    const [searchText, setSearchText] = useState("");

    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [loading, setLoading] = useState(false);

    // set category function 
    const handleCategoryChange = (newCategory) => {
        setSearchText('');
        SetCategory(newCategory);
    }

    const query = searchText || category || `mumbai`;
    // fetch api 

    // Yesterday date
    let today = new Date();
    today.setDate(today.getDate() - 1)

    let Yesterday = today.toISOString().split('T')[0];

    useEffect(() => {
        setLoading(true); // Start loading
        fetch(`https://newsapi.org/v2/everything?q=${query}&from=${Yesterday}&sortBy=publishedAt&apiKey=${API_KEY}`).
            then((response) => {
                return response.json();
            }).then((data) => {
                if (data && Array.isArray(data.articles)) {
                    const validArticles = data.articles.filter(
                        (article) =>
                            article.urlToImage &&
                            article.urlToImage.startsWith('https') &&
                            /\.(jpg|jpeg|png)$/i.test(article.urlToImage) // Ensure image URL ends with .jpg, .jpeg, or .png
                    );
                    SetApiData(validArticles);
                } else {
                    SetApiData([]);
                }
                setLoading(false); // End loading
            }).catch((error) => {
                console.log(error.message);
                SetApiData([]); 
                setLoading(false); // end loading 
            })
    }, [category, searchText]);


    // set limit description 
    let description_limit = (description, max_length = 80) => {
        if (description && description.length > max_length) {
            return description.substring(0, max_length) + "...";
        }
        return description;
    }

    //set limit in title
    let title_limit = (title, max_length = 60) => {
        if (title && title.length > max_length) {
            return title.substring(onabort, max_length) + "...";
        }
    }


    // search data
    const handleSearch = (data) => {
        setSearchText(data)
        console.log(searchText)
    }



    // scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Show/Hide the scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <div>
            <Navbar onSearchData={handleSearch} />
            <div className="container mt-4">
                <div className="d-flex justify-content-center mb-4">
                    <div className="btn-group flex-wrap" role="group">
                        <button
                            className="btn btn-primary mx-2 my-2"
                            onClick={() => handleCategoryChange('sport')}
                            data-bs-toggle="tooltip" title="Sports news and updates"
                        >
                            Sport
                        </button>
                        <button
                            className="btn btn-primary mx-2 my-2"
                            onClick={() => handleCategoryChange('technology')}
                            data-bs-toggle="tooltip" title="Latest technology news"
                        >
                            Technology
                        </button>
                        <button
                            className="btn btn-primary mx-2 my-2"
                            onClick={() => handleCategoryChange('business')}
                            data-bs-toggle="tooltip" title="Business and finance updates"
                        >
                            Business
                        </button>
                        <button
                            className="btn btn-primary mx-2 my-2"
                            onClick={() => handleCategoryChange('health')}
                            data-bs-toggle="tooltip" title="Health and wellness news"
                        >
                            Health
                        </button>
                        <button
                            className="btn btn-primary mx-2 my-2"
                            onClick={() => handleCategoryChange('entertainment')}
                            data-bs-toggle="tooltip" title="Entertainment and celebrity news"
                        >
                            Entertainment
                        </button>
                    </div>
                </div>
            </div>


            <div className="container">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
                        <img src="https://i.gifer.com/YCZH.gif" alt="Loading..." /> {/* Replace with your loader image URL */}
                    </div>
                ) : (
                    <div className="row my-5" >

                        {ApiData.map((data) => {
                            // const imageUrl = data.urlToImage && data.urlToImage.startsWith('http') ? data.urlToImage : 'https://via.placeholder.com/150';

                            return (

                                <div id='news_container' className="d-flex col-12 col-md-6 col-xl-3 my-4 justify-content-center">
                                    <div className="card" style={{ width: '18rem', height: "450px" }}>
                                        {data.urlToImage && /\.(jpg|jpeg|png)$/i.test(data.urlToImage) ? (
                                            <img src={data.urlToImage} className="card-img-top img-fluid img-height" alt={data.source.name} />
                                        ) : (
                                            <img src="https://via.placeholder.com/150" className="card-img-top img-fluid img-height" alt="placeholder" />
                                        )}



                                        {/* <img src={data.urlToImage} className="card-img-top img-fluid img-height" alt={data.source.name} /> */}
                                        <div className="card-body">
                                            <a href={data.url} className="card-title">{title_limit(data.title)}</a>
                                            <p className="card-text">{description_limit(data.description)}</p>
                                            <a id='view_news' href={data.url} className="btn btn-primary btn-sm" target='_blank'><FontAwesomeIcon icon="fa-regular fa-eye" /> View</a>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                )}
            </div>

            <Footer />
            <button
                className="btn btn-primary scroll-to-top"
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    borderRadius: '50%',
                    zIndex: 1000,
                    display: showScrollToTop ? 'block' : 'none'
                }}
            >
                ↑
            </button>
        </div>
    )
}

export default Home
