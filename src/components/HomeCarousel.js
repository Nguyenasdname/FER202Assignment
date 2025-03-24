import { Carousel } from "react-bootstrap"

function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel1.jpg"
          alt="Premium Guitars"
        />
        <Carousel.Caption>
          <h3>Premium Guitars</h3>
          <p>Discover our collection of high-quality guitars from top brands.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel2.jpg"
          alt="Professional Keyboards"
        />
        <Carousel.Caption>
          <h3>Professional Keyboards</h3>
          <p>Find the perfect keyboard for your musical journey.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel3.jpg"
          alt="Drum Sets"
        />
        <Carousel.Caption>
          <h3>Drum Sets</h3>
          <p>Complete drum sets for beginners and professionals.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCarousel;

