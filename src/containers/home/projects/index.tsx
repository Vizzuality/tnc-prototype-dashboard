import { MouseEventHandler } from 'react';

import Slider from 'react-slick';

import Image from 'next/image';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import Wrapper from 'containers/wrapper';

import { PROJECTS } from './constants';

const HomeProjects = (): JSX.Element => {
  const SampleNextArrow = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
      <button
        className="absolute right-0 z-10 flex h-16 w-8 cursor-pointer items-center bg-spring"
        onClick={onClick}
      >
        <HiChevronRight color="white" size={40} />
      </button>
    );
  };

  const SamplePrevArrow = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
      <button
        className="absolute left-0 z-10 flex h-16 w-8 cursor-pointer items-center bg-spring"
        onClick={onClick}
      >
        <HiChevronLeft color="white" size={40} />
      </button>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Wrapper>
      <section className="flex flex-col space-y-12 py-14">
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-4xl font-semibold text-indigo">
            NCS Prototyping Projects
          </h4>
          <p className="pt-2 text-lg leading-6 text-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="">
          <Slider {...settings}>
            {PROJECTS.map((project) => (
              <div key={project.id} className="relative">
                <Image alt="Brasil Agroforestry" src={project.image} width={333} height={200} />
                <div className="absolute top-0 flex flex-col !items-start space-y-2 px-8 py-4 text-white">
                  <h3 className="font-serif text-xs font-bold uppercase">{project.title}</h3>
                  <p className="font-sans text-lg font-light leading-6">{project.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </Wrapper>
  );
};

export default HomeProjects;