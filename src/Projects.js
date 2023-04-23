import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Projects() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchPhotos() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setPhotos(response.data);
      setFilteredPhotos(response.data);
    }

    fetchPhotos();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    const searchValue = inputRef.current.value.toLowerCase();
    const filtered = photos.filter(photo => photo.title.toLowerCase().includes(searchValue));
    setFilteredPhotos(filtered);
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid" style={{ justifyContent: "center" }}>
          <form className="d-flex" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={inputRef} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          {filteredPhotos.map(photo => (
            <div className="col-sm-4" key={photo.id}>
              <div className="card" style={{ width: "18rem" }}>
                <img src={photo.url} className="card-img-top" alt={photo.title} style={{ height: "161px", width: "359px" }} />
                <div className="card-body">
                  <h5 className="card-title">{photo.title}</h5>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Projects;
