import React from "react";
import { useState } from "react";
import { Modal} from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";

import "./style.css";

const Card = ({ pokemon, loading }) => {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pokeName, setPokeName] = useState("");
  const [pokeStat, setPokeStat] = useState("");
  const [pokeImg, setPokeImg] = useState();
  const [searchInput, setSearchInput] = useState("");

  const openPokeInfo = async (res) => {
    res.stats.forEach((element) => {
    //   console.log(element.stat.name);
      setPokeStat(element.stat.name);
 
    });
    res.types.forEach(item=>{
        console.log(item.type.name)
    })

    setPokeName(res.name);
    setPokeImg(res.sprites.front_default);
    handleShow();
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{pokeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="poke-content">
          <img
            src={pokeImg}
            class="img-fluid img-height"
            alt="Responsive img"
          ></img>
          <p>Stat: {pokeStat}</p>
        </Modal.Body>
      </Modal>

      <div class="form-group has-search">
        <span class="fa fa-search form-control-feedback">
          <RiSearch2Line className="search-icon" />
        </span>
        <input
          type="text"
          class="form-control"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          placeholder="Search"
        />
      </div>

      <div className="row card-row">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          pokemon
            .filter((item) => {
              if (searchInput === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, key) => {
              return (
                <div className="col-md-3">
                  <div
                    className="card poke-card"
                    key={item.id}
                    onClick={() => openPokeInfo(item)}
                  >
                    <img
                    key={item.id}
                      className="card-img-top card-img"
                      src={item.sprites.front_default}
                      alt="card"
                    />
                    <div className="card-body">
                      <h5 className="card-title poke-name">
                        Name: {item.name}
                      </h5>
                      <h5 className="card-title poke-name">Id: {item.id}</h5>
                      {
                        item.types.map(typeItem=>{
                            return(<h5 className="card-title poke-name">Type: {typeItem.type.name}</h5>
                            )
                        })
                      }
                    </div>
                  </div>
                  <br />
                </div>

              );
            })
        )}
      </div>
    </>
  );
};

export default Card;
