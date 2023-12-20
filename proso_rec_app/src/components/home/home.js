import React from "react";
import "./home.css";
import SearchElement from "../../elements/searchElement/searchElement";
import Table from "../../elements/table/table";
import Logo from "../../elements/logo/logo";
import Settings from "../../elements/settings/settings";
import AdminControlSet from "../../elements/adminControlSet/adminControlSet";
import Signature from "../../elements/signature/signature";
import Languages from "../../elements/languages/languages";
import BubbleBackground from "../bubbleBackground/bubbleBackground";

function Home() {

    AdminControlSet();
  
  return (
    <div className="page-container d-flex flex-column">
      <Logo />
      <Languages />
      <Settings />
      <SearchElement />
      <Table />
      <Signature />
      <BubbleBackground />
    </div>
  );
}

export default Home;
