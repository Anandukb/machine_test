import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getData } from "../redux/ApiCalls/actions";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

import "../assets/css/common.css";
import Header from "../components/Header";

const Home = ({ getData, response: { data, loading } }) => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user-details");
        navigate("/authentication");
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setDatas(data);
  }, [data]);

  useEffect(() => {
    let allData = data;

    var foundValue =
      allData &&
      allData?.filter(
        (obj) =>
          obj.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          obj.region.toLowerCase().includes(searchKey.toLowerCase())
      );
    setDatas(foundValue);
  }, [searchKey]);
  return (
    <>
      <Segment>
        <Dimmer active={loading ? true : false} inverted>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
        <Header logoutHandler={logoutHandler} setSearchKey={setSearchKey} />
        <div class="container-fluid country-cards mt-5">
          <div class="container">
            <div class="card-deck row">
              {datas &&
                datas.length > 0 &&
                datas.map((item, index) => (
                  <div class="col-xs-12  mb-4 col-sm-6 col-md-4 col-lg-3" key={index}>
                    <div class="card">
                      <div class="view overlay flag-img">
                        <img
                          class="card-img-top"
                          src={item.flag}
                          alt="Card image cap"
                        />
                        <a href="#!">
                          <div class="mask rgba-white-slight"></div>
                        </a>
                      </div>

                      <div class="card-body">
                        <h3 class="card-title">{item.name}</h3>{" "}
                        <h5>{"Region: " + item.region}</h5>
                        <p className="csr-ptr text-primary" onClick={()=> window.open("https://en.wikipedia.org/wiki/"+(item.name))}>More Details...</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => ({
  response: state.Reducer,
});

export default connect(mapStateToProps, {
  getData,
})(Home);
