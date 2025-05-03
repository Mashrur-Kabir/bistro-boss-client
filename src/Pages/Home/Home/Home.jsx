import { Title } from "react-head";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import Featured from "../Featured/Featured";
import OurMenu from "../OurMenu/OurMenu";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div className="mb-20">
            <Title>Bistro Boss | Home</Title>
            <Banner></Banner>
            <Categories></Categories>
            <OurMenu></OurMenu>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;