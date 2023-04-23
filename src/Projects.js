import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {IoGrid} from "react-icons/io5"
import { CiViewTable } from "react-icons/ci";
import { Table } from 'react-bootstrap';
function Projects() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const inputRef = useRef(null);
  const [viewMode, setViewMode] = useState('grid');
  useEffect(() => {
    async function fetchPhotos() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setPhotos(response.data);
      setFilteredPhotos(response.data);
    }

    fetchPhotos();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const searchText = inputRef.current.value;
    const filteredPhotos = photos.filter(photo => photo.title.toLowerCase().includes(searchText.toLowerCase()));
    setPhotos(filteredPhotos);
  }
  function handleViewModeChange(mode) {
    setViewMode(mode);
  }

  return (
    <>
    <nav className="navbar navbar-light bg-light">
        <div className="container-fluid" style={{ justifyContent: "center" }}>
          <form className="d-flex" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={inputRef} />
            <button className="btn btn-outline-success" type="submit">Search</button>
            <div style={{display:"flex",position: "relative",left: "233px",height: "43px"}}>
              <input type="radio" className="btn-check" name="viewMode" id="gridView" value="grid" checked={viewMode === 'grid'} onChange={() => handleViewModeChange('grid')} />
              <label className="btn btn-outline-primary" htmlFor="gridView" style={{borderRadius: "10px 0px 0px 10px"}}><IoGrid style={{position: "relative",bottom: "4px"}}/></label>

              <input type="radio" className="btn-check" name="viewMode" id="tableView" value="table" checked={viewMode === 'table'} onChange={() => handleViewModeChange('table')} />
              <label className="btn btn-outline-primary" htmlFor="tableView" style={{borderRadius: "0px 10px 10px 0px"}}><CiViewTable style={{position: "relative",bottom: "4px"}}/> </label>
            </div>
          </form>
        </div>
      </nav>
      {viewMode === 'grid' && (
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
      )}
      {
        viewMode === 'table' && (
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {photos.map(photo => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>{photo.title}</td>
              <td>
                <img src={photo.url} alt={photo.title} style={{height:"50px",borderRadius:"50%"}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        )
      }
    </>
  );
}

export default Projects;
