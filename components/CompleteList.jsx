import Card from "@/components/Card";
import { colors } from "../utils/colors";

function CompleteList(props) {
  return (
    <section className="my-20 font-rest">
      <h2 className="text-center mb-10 font-bold text-6xl text-gray-400">
        All Trips
      </h2>
      {props.trips === "No results" && (
        <div className="text-center">
          <p className="text-4xl text-gray-400">No results</p>
        </div>
      )}
      {props.trips !== "No results" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-10 mb-10">
          {props.trips.map((location, i) => (
            <Card
              key={i}
              theme={location.theme}
              image={location.imageCover}
              icon={props.icons[location.icon]}
              title={location.title}
              descOne={location.descOne}
              descTwo={location.descTwo}
              rating={location.ratingsAverage}
              price={location.price}
              desc={location.desc}
              id={location.id}
            ></Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default CompleteList;
