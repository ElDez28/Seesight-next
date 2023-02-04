import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Review from "./Review";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};
function Reviews(props) {
  return (
    <div className="px-6 mb-4 mt-2">
      <Carousel
        additionalTransfrom={0}
        arrows
        ssr
        deviceType={props.deviceType}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 640,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 640,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {props.reviews.map((review, i) => {
          let source;
          if (review.user[0].image.includes("https")) {
            source = review.user[0].image;
          } else {
            source = `${process.env.NEXT_PUBLIC_BACKEND_SHORT}/images/users/${review.user[0].image}`;
          }
          return (
            <Review
              key={i}
              image={source}
              text={review.text}
              username={review.user[0].username}
              rating={review.rating}
            ></Review>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Reviews;
