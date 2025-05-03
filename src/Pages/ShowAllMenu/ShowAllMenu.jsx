import { Title } from "react-head";
import useMenu from "../../Hooks/useMenu";
import Cover from "../Shared/Cover/Cover";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import CategoryMenu from "../../Components/CategoryMenu/CategoryMenu";

// Banner Images
import mainBanner from "../../assets/menu/banner3.jpg";
import dessertBanner from "../../assets/menu/dessert-bg.jpeg";
import pizzaBanner from "../../assets/menu/pizza-bg.jpg";
import saladBanner from "../../assets/menu/salad-bg.jpg";
import soupBanner from "../../assets/menu/soup-bg.jpg";
import drinksBanner from "../../assets/menu/drinks-bg.jpg";

const ShowAllMenu = () => {
  const [menu] = useMenu();

  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  // Shared section cover config
  const sectionProps = {
    containerClass: "my-16 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]",
    middleContentClass: "flex items-center justify-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[520px] xl:min-h-[670px]",
    overlayClass: "px-32 py-16 md:px-56 md:py-28",
    titleClass: "text-3xl md:text-5xl",
    subtitleClass: "text-[12px] md:text-[16px] tracking-wide",
    strength: 600,
    blur: { min: -15, max: 15 },
  };

  return (
    <section className="w-full font-quicksand">
      <Title>Bistro Boss | Menu</Title>

      {/* Main Cover (different from section covers in this component) */}
      <Cover
        image={mainBanner}
        title="OUR MENU"
        subtitle="Would you like to try a dish?"
        containerClass="mb-32 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[620px]"
        middleContentClass="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[620px] xl:min-h-[670px]"
        overlayClass="px-40 py-20 md:px-64 md:py-32"
        titleClass="text-4xl md:text-6xl"
        subtitleClass="text-sm md:text-lg tracking-wide"
        strength={600}
        blur={{ min: -20, max: 20 }}
      />

      <SectionTitle
      subheading={"Select Items From Our"}
      heading={"Categories"}
      >
      </SectionTitle>

      {/* Salad Section */}
      <div className="mb-24">
        <Cover
          image={saladBanner}
          title="SALADS"
          subtitle="Crisp, colorful and full of flavor"
          {...sectionProps}
          containerClass="my-0"
        />
        <div className="max-w-screen-xl mx-auto px-4">
          <CategoryMenu items={salad} category={"salad"} />
        </div>

      </div>

      {/* Pizza Section */}
      <div className="mb-24">
        <Cover
          image={pizzaBanner}
          title="PIZZA"
          subtitle="Cheesy delight baked to perfection"
          {...sectionProps}
        />
        <div className="max-w-screen-xl mx-auto px-4">
          <CategoryMenu items={pizza} category={"pizza"} />
        </div>
      </div>

      {/* Soup Section */}
      <div className="mb-24">
        <Cover
          image={soupBanner}
          title="SOUPS"
          subtitle="Warm and comforting with every spoon"
          {...sectionProps}
        />
        <div className="max-w-screen-xl mx-auto px-4">
          <CategoryMenu items={soup} category={"soup"} />
        </div>
      </div>

      {/* Dessert Section */}
      <div className="mb-24">
        <Cover
          image={dessertBanner}
          title="DESSERTS"
          subtitle="Sweet endings you'll crave"
          {...sectionProps}
        />
        <div className="max-w-screen-xl mx-auto px-4">
          <CategoryMenu items={desserts} category={"dessert"} />
        </div>
      </div>

      {/* Drinks Section */}
      <div className="mb-32">
        <Cover
          image={drinksBanner}
          title="DRINKS"
          subtitle="Refresh your meal with something cool"
          {...sectionProps}
        />
        <div className="max-w-screen-xl mx-auto px-4 mb-24">
          <CategoryMenu items={drinks} category={"drinks"} />
        </div>
      </div>

    </section>
  );
};

export default ShowAllMenu;
