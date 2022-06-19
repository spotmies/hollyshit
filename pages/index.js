import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomePage from "./home";
import ReactGA from "react-ga";
const TRACKING_ID = "UA-230631230-2"; // OUR_TRACKING_ID

ReactGA.initialize(TRACKING_ID);
export default function Home() {
  return <HomePage />;
}
